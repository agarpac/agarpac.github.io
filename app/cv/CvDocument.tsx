import CvGithubLink from "./CvGithubLink";
import CvNavigation, { CompanyTenure } from "./CvNavigation";
import styles from "./cv.module.css";

const linkedInUrl = "https://www.linkedin.com/in/agarpac/";
const githubUrl = "https://github.com/agarpac";

const career = [
  {
    role: "QA Lead",
    company: "eºmergya",
    period: "ene. 2022–actualidad · 4 años 7 meses",
    location: "Remoto",
  },
  {
    role: "Senior QA Engineer",
    company: "eºmergya",
    period: "ene. 2020–feb. 2023 · 3 años 2 meses",
  },
  {
    role: "Junior QA Engineer",
    company: "eºmergya",
    period: "abr. 2019–ene. 2020 · 10 meses",
    location: "Sevilla y alrededores",
    details: {
      projects: "UEFA NTCM como QA Lead, easyJet y Deplace.",
      work:
        "Scrum; Appium, Cypress y Botium; Postman; Jenkins y CI/CD; planes de pruebas manuales; Redmine y Jira; colaboración y documentación.",
      technologies:
        "Appium · Cypress · Botium · Postman · Jenkins · Redmine · Jira",
    },
  },
  {
    role: "QA Assistant",
    company: "eºmergya",
    period: "feb. 2018–mar. 2019 · 1 año 2 meses",
    location: "Sevilla y alrededores",
    details: {
      projects: "Ebanq, Fisc Online, EmergyaDigital.com y Eurostar.",
      work:
        "Scrum; Java y Selenium; Postman; requisitos, planes de prueba e incidencias; Jenkins.",
      technologies: "Java · Selenium · Postman · Jenkins",
    },
  },
  {
    role: "Drupal 7 developer",
    company: "eºmergya",
    period: "oct. 2017–ene. 2018 · 4 meses",
    location: "Sevilla",
  },
];

const capabilities = [
  {
    title: "Liderazgo de calidad",
    description: "Estrategia de QA, mentoría, procesos y gestión del riesgo.",
    tools: "QA strategy · Mentoría · Procesos · Riesgo",
  },
  {
    title: "Automatización y APIs",
    description: "Pruebas mantenibles para web, móvil y servicios.",
    tools: "Cypress · Selenium · Appium · Postman",
  },
  {
    title: "Entrega continua",
    description: "Calidad integrada en el flujo de desarrollo y despliegue.",
    tools: "Jenkins · CI/CD · Git · Observabilidad",
  },
  {
    title: "Ingeniería de producto",
    description: "Construcción de herramientas desde la interfaz hasta los datos.",
    tools: "TypeScript · Next.js · Node.js · Supabase",
  },
];

const projects = [
  {
    name: "Vitalis",
    type: "Producto de nutrición",
    description:
      "Producto personal de nutrición asistida por IA con experiencia de usuario, autenticación, lógica de producto y datos.",
    stack: "Next.js · Supabase · IA aplicada",
    status: "Privado",
  },
  {
    name: "mcp-core",
    type: "Herramientas para agentes",
    description:
      "Infraestructura para mejorar el contexto, las capacidades y los flujos de trabajo de agentes de desarrollo.",
    stack: "TypeScript · Node.js · MCP",
    url: "https://github.com/agarpac/mcp-core",
    npmUrl: "https://www.npmjs.com/package/@agarpac/mcp-core",
  },
  {
    name: "Litra Native",
    type: "Utilidad para macOS",
    description:
      "Utilidad para la barra de menús de macOS que enciende una Logitech Litra Beam cuando detecta una cámara física activa y la apaga al terminar la sesión.",
    stack: "macOS · Aplicación nativa",
    url: "https://github.com/agarpac/litra-native-mac",
  },
];

export default function CvDocument() {
  return (
    <main className={styles.page} id="cv">
      <header className={styles.topbar}>
        <a className={styles.wordmark} href="#inicio" aria-label="Volver a la portada">
          AGARPAC<span aria-hidden="true">/</span>
        </a>
        <CvNavigation />
        <p className={styles.location}>Sevilla · Remoto</p>
      </header>

      <article className={styles.document}>
        <header className={styles.identity}>
          <div className={styles.identityMain}>
            <p className={styles.role}>QA Lead · eºmergya</p>
            <h1 tabIndex={-1}>Alberto Garrido Pacheco</h1>
          </div>
          <div className={styles.identityAside}>
            <p className={styles.intro}>
              Calidad, automatización e ingeniería de producto desde una
              perspectiva que combina código, equipos y entrega.
            </p>
            <div className={styles.profileLinks} aria-label="Perfiles profesionales">
              <a href={linkedInUrl} target="_blank" rel="noreferrer">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
              <CvGithubLink href={githubUrl}>
                GitHub <span aria-hidden="true">↗</span>
              </CvGithubLink>
            </div>
          </div>
        </header>

        <section
          className={`${styles.section} ${styles.profileSection}`}
          id="perfil"
          aria-labelledby="perfil-title"
        >
          <header className={styles.sectionTitle}>
            <span aria-hidden="true">01</span>
            <h2 id="perfil-title">Perfil</h2>
          </header>
          <div className={styles.prose}>
            <p>
              Soy QA Lead en eºmergya. Mi trayectoria comenzó en desarrollo
              Drupal y evolucionó hacia la calidad, aportándome una visión
              técnica del ciclo completo de construcción de software.
            </p>
            <p>
              Trabajo en estrategia de pruebas, automatización y entrega
              continua, conectando las necesidades del producto con las del
              equipo. En paralelo, construyo productos propios para seguir
              aprendiendo desde la práctica.
            </p>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.careerSection}`}
          id="trayectoria"
          aria-labelledby="trayectoria-title"
        >
          <header className={styles.sectionTitle}>
            <span aria-hidden="true">02</span>
            <h2 id="trayectoria-title">Trayectoria</h2>
            <p className={styles.companySummary}>
              eºmergya
              <CompanyTenure />
            </p>
          </header>
          <ol className={styles.career}>
            {career.map((role, index) => (
              <li key={`${role.role}-${role.period}`}>
                <span className={styles.careerIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={styles.careerRole}>
                  <div>
                    <div className={styles.careerHeading}>
                      <h3>{role.role}</h3>
                      {index === 0 ? <strong>Actual</strong> : null}
                    </div>
                    <p>{role.company}</p>
                    <p>{role.period}</p>
                    {role.location ? <p>{role.location}</p> : null}
                    {role.details ? (
                      <details className={styles.roleDetails}>
                        <summary>Ver más</summary>
                        <div>
                          <p>
                            <strong>Proyectos</strong> {role.details.projects}
                          </p>
                          <p>{role.details.work}</p>
                          <p>
                            <strong>Tecnologías relevantes</strong>{" "}
                            {role.details.technologies}
                          </p>
                        </div>
                      </details>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          className={`${styles.section} ${styles.capabilitiesSection}`}
          id="capacidades"
          aria-labelledby="capacidades-title"
        >
          <header className={styles.sectionTitle}>
            <span aria-hidden="true">03</span>
            <h2 id="capacidades-title">Capacidades</h2>
          </header>
          <div className={styles.capabilityList}>
            {capabilities.map((capability, index) => (
              <article key={capability.title}>
                <span aria-hidden="true">C{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </div>
                <small>{capability.tools}</small>
              </article>
            ))}
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.projectsSection}`}
          id="proyectos"
          aria-labelledby="proyectos-title"
        >
          <header className={styles.sectionTitle}>
            <span aria-hidden="true">04</span>
            <h2 id="proyectos-title">Proyectos</h2>
          </header>
          <div className={styles.projectList}>
            {projects.map((project, index) => (
              <article key={project.name}>
                <span className={styles.projectIndex} aria-hidden="true">
                  P—{String(index + 1).padStart(2, "0")}
                </span>
                <div className={styles.projectIdentity}>
                  <p>{project.type}</p>
                  <h3>{project.name}</h3>
                </div>
                <div className={styles.projectDetail}>
                  <p>{project.description}</p>
                  <small>{project.stack}</small>
                  {project.status ? (
                    <span className={styles.projectStatus}>{project.status}</span>
                  ) : null}
                  {project.url || project.npmUrl ? (
                    <div className={styles.projectLinks}>
                      {project.url ? (
                        <CvGithubLink
                          className={styles.projectLink}
                          href={project.url}
                        >
                          Repositorio en GitHub{" "}
                          <span aria-hidden="true">↗</span>
                        </CvGithubLink>
                      ) : null}
                      {project.npmUrl ? (
                        <a
                          className={styles.projectLink}
                          href={project.npmUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Paquete npm <span aria-hidden="true">↗</span>
                        </a>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.educationSection}`}
          id="formacion"
          aria-labelledby="formacion-title"
        >
          <header className={styles.sectionTitle}>
            <span aria-hidden="true">05</span>
            <h2 id="formacion-title">Formación</h2>
          </header>
          <div className={styles.education}>
            <article>
              <p>2012—2018</p>
              <div>
                <h3>Ingeniería Informática en Sistemas de Información</h3>
                <p>Universidad Pablo de Olavide</p>
              </div>
            </article>
            <article>
              <p>2010—2012</p>
              <div>
                <h3>
                  Técnico Superior en Desarrollo de Aplicaciones Informáticas
                </h3>
                <p>Formación Profesional de Grado Superior</p>
              </div>
            </article>
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.certificationsSection}`}
          id="certificaciones"
          aria-labelledby="certificaciones-title"
        >
          <header className={styles.sectionTitle}>
            <span aria-hidden="true">06</span>
            <h2 id="certificaciones-title">Certificaciones</h2>
          </header>
          <div className={styles.certifications}>
            <article>
              <p>Google Cloud</p>
              <div>
                <h3>Professional Cloud DevOps Engineer</h3>
                <p>Expedida feb. 2024 · Vencida feb. 2026</p>
                <small>ID de la credencial: 95144150</small>
                <a
                  href="https://google.accredible.com/3e3ffd8a-349f-4ca4-ab6b-0fa4dcdf6661"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver credencial oficial <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          </div>
        </section>

        <footer
          className={`${styles.section} ${styles.contact}`}
          id="contacto"
          aria-labelledby="contacto-title"
        >
          <header className={styles.sectionTitle}>
            <span aria-hidden="true">07</span>
            <h2 id="contacto-title">Contacto</h2>
            <p>Sevilla · Disponible en remoto</p>
          </header>
          <div className={styles.contactLinks}>
            <a href={linkedInUrl} target="_blank" rel="noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <CvGithubLink href={githubUrl}>
              GitHub <span aria-hidden="true">↗</span>
            </CvGithubLink>
            <a href="#cv">Volver arriba <span aria-hidden="true">↑</span></a>
          </div>
        </footer>
      </article>
    </main>
  );
}
