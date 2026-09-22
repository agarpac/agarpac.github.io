"use client";

/*
 * Adapted from Canvas UI's Dithered Object (React + vanilla implementations).
 * Copyright (c) 2026 David Haz. MIT + Commons Clause License Condition v1.0.
 * Full notice: /public/models/ATTRIBUTION.md
 * Source: https://canvasui.dev/docs/components/dithered-object
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

type DitheredObjectProps = {
  src: string;
  className?: string;
  gridSize?: number;
  scale?: number;
  floatIntensity?: number;
  rotationIntensity?: number;
  floatSpeed?: number;
  autoRotationSpeed?: number;
  orbit?: boolean;
  zoom?: boolean;
  highlightCssVariable?: string;
  mutedCssVariable?: string;
  onLoad?: () => void;
  onError?: (error: unknown) => void;
};

type PaintableAncestorCanvas = HTMLCanvasElement & {
  requestPaint?: () => void;
};

const POST_VERTEX_SHADER = `
  varying vec2 vUv;

  void main() {
    vUv = position.xy * 0.5 + 0.5;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const BAYER_FRAGMENT_SHADER = `
  precision highp float;

  varying vec2 vUv;
  uniform sampler2D tDiffuse;
  uniform vec2 uResolution;
  uniform float uGridSize;
  uniform vec3 uHighlight;
  uniform vec3 uMuted;

  float bayerThreshold(vec2 cell) {
    vec2 p = mod(floor(cell), 4.0);
    float index = p.x + p.y * 4.0;
    if (index < 0.5) return 0.0 / 16.0;
    if (index < 1.5) return 8.0 / 16.0;
    if (index < 2.5) return 2.0 / 16.0;
    if (index < 3.5) return 10.0 / 16.0;
    if (index < 4.5) return 12.0 / 16.0;
    if (index < 5.5) return 4.0 / 16.0;
    if (index < 6.5) return 14.0 / 16.0;
    if (index < 7.5) return 6.0 / 16.0;
    if (index < 8.5) return 3.0 / 16.0;
    if (index < 9.5) return 11.0 / 16.0;
    if (index < 10.5) return 1.0 / 16.0;
    if (index < 11.5) return 9.0 / 16.0;
    if (index < 12.5) return 15.0 / 16.0;
    if (index < 13.5) return 7.0 / 16.0;
    if (index < 14.5) return 13.0 / 16.0;
    return 5.0 / 16.0;
  }

  void main() {
    vec2 pixel = floor(vUv * uResolution / uGridSize) * uGridSize;
    vec2 uv = (pixel + uGridSize * 0.5) / uResolution;
    vec4 source = texture2D(tDiffuse, uv);

    if (source.a < 0.02) discard;

    float luminance = dot(source.rgb, vec3(0.2126, 0.7152, 0.0722));
    float threshold = bayerThreshold(pixel / uGridSize);
    if (luminance < threshold * 0.92) discard;

    float warmth = smoothstep(0.55, 1.0, luminance);
    vec3 ink = mix(uMuted, uHighlight, warmth);
    gl_FragColor = vec4(ink, source.a);
  }
`;

function disposeObject(root: THREE.Object3D) {
  root.traverse((node) => {
    const mesh = node as THREE.Mesh;
    mesh.geometry?.dispose();
    const materials = Array.isArray(mesh.material)
      ? mesh.material
      : mesh.material
        ? [mesh.material]
        : [];

    for (const material of materials) {
      for (const value of Object.values(material)) {
        if (value instanceof THREE.Texture) value.dispose();
      }
      material.dispose();
    }
  });
}

function readToken(element: HTMLElement, variable: string, fallback: string) {
  const value = getComputedStyle(element).getPropertyValue(variable).trim();
  const color = value || fallback;
  const scratch = document.createElement("canvas");
  scratch.width = 1;
  scratch.height = 1;
  const context = scratch.getContext("2d");
  if (!context) return fallback;
  context.fillStyle = "#010203";
  context.fillStyle = color;
  if (context.fillStyle === "#010203") context.fillStyle = fallback;
  context.fillRect(0, 0, 1, 1);
  const [red, green, blue] = context.getImageData(0, 0, 1, 1).data;
  return `rgb(${red}, ${green}, ${blue})`;
}

export default function DitheredObject({
  src,
  className,
  gridSize = 4,
  scale = 3.2,
  floatIntensity = 0.45,
  rotationIntensity = 0.42,
  floatSpeed = 0.45,
  autoRotationSpeed = -0.09,
  orbit = true,
  zoom = false,
  highlightCssVariable = "--color-signal-accent",
  mutedCssVariable = "--color-signal-ink-muted",
  onLoad,
  onError,
}: DitheredObjectProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snapshotRef = useRef<HTMLCanvasElement>(null);
  const onLoadRef = useRef(onLoad);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onLoadRef.current = onLoad;
    onErrorRef.current = onError;
  }, [onError, onLoad]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    const snapshot = snapshotRef.current;
    if (!wrapper || !canvas || !snapshot) return;
    const paintableAncestor = canvas.closest(
      'canvas[content="drawable"], canvas[layoutsubtree]',
    ) as PaintableAncestorCanvas | null;
    const snapshotContext = paintableAncestor
      ? snapshot.getContext("2d")
      : null;

    const abortController = new AbortController();
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarseQuery = window.matchMedia("(pointer: coarse)");
    let disposed = false;
    let inView = true;
    let animationFrame = 0;
    let lastTime = 0;
    let elapsed = 0;
    let isInteracting = false;
    let autoRotationBlend = 1;
    let model: THREE.Object3D | null = null;
    const initialYaw = -Math.PI * 0.09;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
      });
    } catch (error) {
      onErrorRef.current?.(error);
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.set(0, 0.25, 4.6);

    const floatGroup = new THREE.Group();
    const fitGroup = new THREE.Group();
    fitGroup.rotation.y = initialYaw;
    floatGroup.add(fitGroup);
    scene.add(floatGroup);

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI * 0.28;
    controls.maxPolarAngle = Math.PI * 0.72;
    controls.minAzimuthAngle = -Math.PI * 0.42;
    controls.maxAzimuthAngle = Math.PI * 0.42;

    scene.add(new THREE.HemisphereLight(0xffffff, 0x12151a, 2.8));
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.2);
    keyLight.position.set(-3, 5, 4);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xffb34d, 32, 16, 1.8);
    rimLight.position.set(3.5, 2.5, 2.5);
    scene.add(rimLight);

    const renderTarget = new THREE.WebGLRenderTarget(1, 1, {
      depthBuffer: true,
      stencilBuffer: false,
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
    });

    const postMaterial = new THREE.ShaderMaterial({
      vertexShader: POST_VERTEX_SHADER,
      fragmentShader: BAYER_FRAGMENT_SHADER,
      uniforms: {
        tDiffuse: { value: renderTarget.texture },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uGridSize: { value: gridSize },
        uHighlight: { value: new THREE.Color() },
        uMuted: { value: new THREE.Color() },
      },
      depthTest: false,
      depthWrite: false,
      transparent: true,
    });
    const postGeometry = new THREE.PlaneGeometry(2, 2);
    const postScene = new THREE.Scene();
    postScene.add(new THREE.Mesh(postGeometry, postMaterial));
    const postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const updateColors = () => {
      postMaterial.uniforms.uHighlight.value.set(
        readToken(wrapper, highlightCssVariable, "#d9a441"),
      );
      postMaterial.uniforms.uMuted.value.set(
        readToken(wrapper, mutedCssVariable, "#9aa0a6"),
      );
    };

    const updateInteraction = () => {
      const coarse = coarseQuery.matches;
      controls.enabled = orbit && !coarse;
      controls.enableRotate = orbit && !coarse;
      controls.enableZoom = zoom && !coarse;
      canvas.style.pointerEvents = coarse ? "none" : "auto";
      canvas.style.touchAction = coarse ? "pan-y" : "none";
    };

    const resize = () => {
      const width = Math.max(wrapper.clientWidth, 1);
      const height = Math.max(wrapper.clientHeight, 1);
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height, false);
      renderTarget.setSize(
        Math.max(1, Math.round(width * dpr)),
        Math.max(1, Math.round(height * dpr)),
      );
      postMaterial.uniforms.uResolution.value.set(width * dpr, height * dpr);
      postMaterial.uniforms.uGridSize.value = Math.max(gridSize * dpr, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      render();
    };

    const render = () => {
      if (disposed || document.hidden || !inView) return;
      renderer.setRenderTarget(renderTarget);
      renderer.clear();
      renderer.render(scene, camera);
      renderer.setRenderTarget(null);
      renderer.clear();
      renderer.render(postScene, postCamera);
      if (snapshotContext) {
        if (snapshot.width !== canvas.width) snapshot.width = canvas.width;
        if (snapshot.height !== canvas.height) snapshot.height = canvas.height;
        snapshotContext.clearRect(0, 0, snapshot.width, snapshot.height);
        snapshotContext.drawImage(canvas, 0, 0);
      }
      paintableAncestor?.requestPaint?.();
    };

    const stopLoop = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      lastTime = 0;
    };

    const tick = (time: number) => {
      if (
        disposed ||
        document.hidden ||
        !inView ||
        motionQuery.matches
      ) {
        stopLoop();
        render();
        return;
      }

      const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.1) : 0;
      lastTime = time;
      elapsed += delta * floatSpeed;
      floatGroup.position.y = Math.sin(elapsed * 1.25) * 0.08 * floatIntensity;
      floatGroup.rotation.x =
        Math.cos(elapsed * 0.72) * 0.045 * rotationIntensity;
      floatGroup.rotation.y =
        Math.sin(elapsed * 0.58) * 0.16 * rotationIntensity;
      autoRotationBlend = THREE.MathUtils.clamp(
        autoRotationBlend + (isInteracting ? -delta * 4 : delta / 1.4),
        0,
        1,
      );
      fitGroup.rotation.y += delta * autoRotationSpeed * autoRotationBlend;
      controls.update();
      render();
      animationFrame = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (
        animationFrame ||
        disposed ||
        document.hidden ||
        !inView ||
        motionQuery.matches
      ) {
        render();
        return;
      }
      animationFrame = requestAnimationFrame(tick);
    };

    const handleVisibility = () => {
      if (document.hidden) stopLoop();
      else startLoop();
    };
    const handleMotion = () => {
      if (motionQuery.matches) {
        stopLoop();
        floatGroup.position.y = 0;
        floatGroup.rotation.set(0, 0, 0);
        fitGroup.rotation.y = initialYaw;
        autoRotationBlend = 0;
        render();
      } else {
        autoRotationBlend = 1;
        startLoop();
      }
    };
    const handleInteractionStart = () => {
      isInteracting = true;
    };
    const handleInteractionEnd = () => {
      isInteracting = false;
    };
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      stopLoop();
      onErrorRef.current?.(new Error("WebGL context lost"));
    };

    const resizeObserver = new ResizeObserver(resize);
    const viewObserver = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? true;
      if (inView) startLoop();
      else stopLoop();
    });

    resizeObserver.observe(wrapper);
    viewObserver.observe(wrapper);
    controls.addEventListener("change", render);
    controls.addEventListener("start", handleInteractionStart);
    controls.addEventListener("end", handleInteractionEnd);
    document.addEventListener("visibilitychange", handleVisibility);
    motionQuery.addEventListener("change", handleMotion);
    coarseQuery.addEventListener("change", updateInteraction);
    canvas.addEventListener("webglcontextlost", handleContextLost);
    updateColors();
    updateInteraction();
    resize();

    const loader = new GLTFLoader();
    void fetch(src, { signal: abortController.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Model request failed: ${response.status}`);
        return response.arrayBuffer();
      })
      .then((buffer) => loader.parseAsync(buffer, src.slice(0, src.lastIndexOf("/") + 1)))
      .then((gltf) => {
        if (disposed) {
          disposeObject(gltf.scene);
          return;
        }

        model = gltf.scene;
        const bounds = new THREE.Box3().setFromObject(model);
        const center = bounds.getCenter(new THREE.Vector3());
        const size = bounds.getSize(new THREE.Vector3());
        const maxDimension = Math.max(size.x, size.y, size.z, 0.001);
        model.position.sub(center);
        fitGroup.scale.setScalar(scale / maxDimension);
        fitGroup.add(model);
        render();
        startLoop();
        onLoadRef.current?.();
      })
      .catch((error) => {
        if (!disposed && !(error instanceof DOMException && error.name === "AbortError")) {
          onErrorRef.current?.(error);
        }
      });

    startLoop();

    return () => {
      disposed = true;
      abortController.abort();
      stopLoop();
      resizeObserver.disconnect();
      viewObserver.disconnect();
      controls.removeEventListener("change", render);
      controls.removeEventListener("start", handleInteractionStart);
      controls.removeEventListener("end", handleInteractionEnd);
      document.removeEventListener("visibilitychange", handleVisibility);
      motionQuery.removeEventListener("change", handleMotion);
      coarseQuery.removeEventListener("change", updateInteraction);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      controls.dispose();
      if (model) disposeObject(model);
      renderTarget.dispose();
      postGeometry.dispose();
      postMaterial.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, [
    autoRotationSpeed,
    floatIntensity,
    floatSpeed,
    gridSize,
    highlightCssVariable,
    mutedCssVariable,
    orbit,
    rotationIntensity,
    scale,
    src,
    zoom,
  ]);

  return (
    <div ref={wrapperRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} />
      <canvas ref={snapshotRef} style={{ pointerEvents: "none" }} />
    </div>
  );
}
