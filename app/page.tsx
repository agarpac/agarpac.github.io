const linkedInUrl = "https://www.linkedin.com/in/agarrido91/";
const githubUrl = "https://github.com/agarpac";

const capabilities = [
  {
    number: "01",
    title: "Liderazgo de calidad",
    text: "Estrategia, acompañamiento de equipos y una visión transversal de la calidad durante todo el ciclo de entrega.",
    tags: ["QA strategy", "Mentoría", "Procesos", "Riesgo"],
  },
  {
    number: "02",
    title: "Automatización y APIs",
    text: "Sistemas de pruebas mantenibles para web, móvil y servicios, diseñados para aportar señal útil al equipo.",
    tags: ["Cypress", "Selenium", "Appium", "Postman"],
  },
  {
    number: "03",
    title: "Entrega continua",
    text: "Calidad integrada en pipelines y flujos de desarrollo para detectar problemas antes y entregar con confianza.",
    tags: ["Jenkins", "CI/CD", "Git", "Observabilidad"],
  },
  {
    number: "04",
    title: "Ingeniería de producto",
    text: "Construcción de herramientas y productos completos, desde la idea y la interfaz hasta los datos y el despliegue.",
    tags: ["TypeScript", "Next.js", "Node.js", "Supabase"],
  },
];

const projects = [
  {
    index: "P—01",
    name: "VITALIS",
    label: "Producto de nutrición",
    description:
      "Producto personal de nutrición asistida por IA. Une experiencia de usuario, lógica de producto, autenticación y datos en una aplicación web completa.",
    stack: "Next.js · Supabase · IA aplicada",
    accent: "teal",
  },
  {
    index: "P—02",
    name: "MCP Core",
    label: "Tooling para agentes",
    description:
      "Infraestructura y herramientas para mejorar cómo trabajan los agentes de desarrollo: contexto, capacidades y flujos más fiables.",
    stack: "TypeScript · Node.js · MCP",
    accent: "violet",
  },
  {
    index: "P—03",
    name: "Litra Native",
    label: "Utilidad nativa para macOS",
    description:
      "Una aplicación de escritorio centrada en una experiencia directa y nativa, creada para resolver una necesidad concreta sin complejidad innecesaria.",
    stack: "macOS · Aplicación nativa",
    accent: "white",
  },
];

export default function Home() {
  return (
    <main>
      <section className="cover" id="inicio" aria-labelledby="cover-title">
        <header className="cover-nav">
          <a className="wordmark" href="#inicio" aria-label="AGARPAC, inicio">
            AGARPAC<span aria-hidden="true">/</span>
          </a>
          <div className="status" aria-label="Disponible en Sevilla y remoto">
            <span className="status-dot" aria-hidden="true" />
            Sevilla · Remoto
          </div>
        </header>

        <div className="cover-grid">
          <div className="cover-copy">
            <p className="eyebrow">Alberto Garrido Pacheco · QA Lead</p>
            <h1 id="cover-title">
              Calidad para comprender sistemas.
              <span> Ingeniería para mejorarlos.</span>
            </h1>
            <p className="cover-summary">
              Lidero calidad, automatizo la entrega y construyo productos.
              Conecto personas, procesos y tecnología para convertir sistemas
              complejos en software más fiable.
            </p>
            <div className="cover-actions">
              <a className="primary-action" href="#trayectoria">
                Ver trayectoria <span aria-hidden="true">↓</span>
              </a>
              <a
                className="text-link"
                href={linkedInUrl}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="system" aria-label="Mapa de áreas profesionales">
            <span className="system-kicker">Sistema profesional / 2026</span>
            <div className="orbit orbit-one" aria-hidden="true" />
            <div className="orbit orbit-two" aria-hidden="true" />
            <span className="flow flow-a" aria-hidden="true" />
            <span className="flow flow-b" aria-hidden="true" />
            <span className="flow flow-c" aria-hidden="true" />

            <div className="system-core">
              <span>AG</span>
              <small>visión integral</small>
            </div>

            <article className="system-node node-quality">
              <span className="node-index">01</span>
              <h2>Quality<br />Leadership</h2>
              <p>Estrategia · Equipos · Riesgo</p>
            </article>
            <article className="system-node node-automation">
              <span className="node-index">02</span>
              <h2>Automation<br />&amp; Delivery</h2>
              <p>Testing · APIs · CI/CD</p>
            </article>
            <article className="system-node node-product">
              <span className="node-index">03</span>
              <h2>Product<br />Engineering</h2>
              <p>Producto · Código · IA</p>
            </article>

            <span className="satellite satellite-vitalis">Vitalis</span>
            <span className="satellite satellite-mcp">MCP Core</span>
            <span className="satellite satellite-litra">Litra Native</span>
          </div>
        </div>

        <div className="cover-footer" aria-hidden="true">
          <span>QA · AUTOMATION · PRODUCT</span>
          <span className="coordinate">37.3891° N / 5.9845° W</span>
        </div>
      </section>

      <div className="portfolio" id="trayectoria">
        <nav className="portfolio-nav" aria-label="Navegación del CV">
          <a className="wordmark dark" href="#inicio">
            AGARPAC<span aria-hidden="true">/</span>
          </a>
          <div className="nav-links">
            <a href="#perfil">Perfil</a>
            <a href="#experiencia">Trayectoria</a>
            <a href="#capacidades">Capacidades</a>
            <a href="#proyectos">Proyectos</a>
            <a href="#contacto">Contacto</a>
          </div>
          <a className="back-link" href="#inicio">
            Volver al sistema <span aria-hidden="true">↑</span>
          </a>
        </nav>

        <section className="profile section-shell" id="perfil">
          <div className="section-label">
            <span>00</span>
            <p>Perfil</p>
          </div>
          <div className="profile-content">
            <p className="display-statement">
              La calidad no es una fase final. Es la forma de{" "}
              <em>entender el sistema</em> antes de cambiarlo.
            </p>
            <div className="profile-columns">
              <p>
                Soy QA Lead en eºmergya. Mi trayectoria empezó en desarrollo
                Drupal y evolucionó desde QA Assistant hasta liderar la calidad:
                una perspectiva que combina código, producto y necesidades de
                equipo.
              </p>
              <p>
                Diseño estrategias de prueba, automatización y entrega continua.
                Fuera del trabajo, construyo productos propios para seguir
                aprendiendo desde el otro lado de la mesa.
              </p>
            </div>
          </div>
        </section>

        <section className="career section-shell" id="experiencia">
          <div className="section-label">
            <span>01</span>
            <p>Trayectoria</p>
          </div>
          <div className="career-content">
            <header className="section-heading">
              <p className="eyebrow dark-eyebrow">Evolución profesional</p>
              <h2>De construir software a liderar cómo se asegura.</h2>
            </header>
            <ol className="career-line">
              <li>
                <span className="career-marker">01</span>
                <div>
                  <p className="career-role">Desarrollo Drupal</p>
                  <p className="career-note">
                    Fundamentos técnicos y comprensión del ciclo de desarrollo.
                  </p>
                </div>
              </li>
              <li>
                <span className="career-marker">02</span>
                <div>
                  <p className="career-role">QA Assistant</p>
                  <p className="career-note">
                    Entrada en calidad desde una base técnica.
                  </p>
                </div>
              </li>
              <li>
                <span className="career-marker">03</span>
                <div>
                  <p className="career-role">Junior QA</p>
                  <p className="career-note">
                    Pruebas funcionales, automatización y trabajo con producto.
                  </p>
                </div>
              </li>
              <li>
                <span className="career-marker">04</span>
                <div>
                  <p className="career-role">Senior QA</p>
                  <p className="career-note">
                    Estrategia, arquitectura de pruebas y mejora de la entrega.
                  </p>
                </div>
              </li>
              <li className="current">
                <span className="career-marker">05</span>
                <div>
                  <p className="career-role">QA Lead · eºmergya</p>
                  <p className="career-note">
                    Liderazgo, visión transversal y calidad como capacidad de
                    equipo.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        <section className="capabilities section-shell" id="capacidades">
          <div className="section-label">
            <span>02</span>
            <p>Capacidades</p>
          </div>
          <div className="capability-grid">
            {capabilities.map((capability) => (
              <article className="capability" key={capability.number}>
                <span className="capability-number">{capability.number}</span>
                <h2>{capability.title}</h2>
                <p>{capability.text}</p>
                <ul aria-label={`Tecnologías de ${capability.title}`}>
                  {capability.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="projects section-shell" id="proyectos">
          <div className="section-label">
            <span>03</span>
            <p>Proyectos</p>
          </div>
          <div className="projects-content">
            <header className="section-heading project-heading">
              <p className="eyebrow dark-eyebrow">Laboratorio personal</p>
              <h2>Aprender construyendo.</h2>
              <p>
                Productos propios donde exploro nuevas interfaces, herramientas
                para agentes y formas de aplicar IA con criterio.
              </p>
            </header>
            <div className="project-list">
              {projects.map((project) => (
                <article
                  className={`project project-${project.accent}`}
                  key={project.name}
                >
                  <span className="project-index">{project.index}</span>
                  <div className="project-title">
                    <p>{project.label}</p>
                    <h3>{project.name}</h3>
                  </div>
                  <p className="project-description">{project.description}</p>
                  <p className="project-stack">{project.stack}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="education section-shell" id="formacion">
          <div className="section-label">
            <span>04</span>
            <p>Formación</p>
          </div>
          <div className="education-list">
            <article>
              <span>2012—2018</span>
              <div>
                <h2>Ingeniería Informática en Sistemas de Información</h2>
                <p>Universidad Pablo de Olavide</p>
              </div>
            </article>
            <article>
              <span>2010—2012</span>
              <div>
                <h2>
                  Técnico Superior en Desarrollo de Aplicaciones Informáticas
                </h2>
                <p>Formación Profesional de Grado Superior</p>
              </div>
            </article>
          </div>
        </section>

        <footer className="contact section-shell" id="contacto">
          <div className="section-label">
            <span>05</span>
            <p>Contacto</p>
          </div>
          <div className="contact-content">
            <p className="eyebrow">Conectemos</p>
            <h2>¿Hablamos de calidad, producto o sistemas?</h2>
            <p>
              Puedes encontrar mi experiencia completa en LinkedIn y el trabajo
              que comparto públicamente en GitHub.
            </p>
            <div className="contact-links">
              <a href={linkedInUrl} target="_blank" rel="noreferrer">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
              <a href={githubUrl} target="_blank" rel="noreferrer">
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="contact-meta">
              <span>Alberto Garrido Pacheco</span>
              <span>Sevilla · Remoto</span>
              <a href="#inicio">Volver arriba ↑</a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
