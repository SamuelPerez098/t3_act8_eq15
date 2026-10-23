const levels = [
  { level: 'A1', label: 'Inicial', value: 72, width: 100 },
  { level: 'A2', label: 'Básico', value: 54, width: 75 },
  { level: 'B1', label: 'Intermedio', value: 32, width: 44 },
  { level: 'B2', label: 'Intermedio alto', value: 18, width: 25 },
]

function DashboardPage() {
  return (
    <section>
      <div className="eyebrow">ENGLISH LAB / INICIO</div>
      <div className="page-heading">
        <div>
          <h2>Resumen de aprendizaje</h2>
          <p>Panel general del sistema administrativo de English Lab.</p>
        </div>
        <span className="chip">DATOS ILUSTRATIVOS</span>
      </div>

      <div className="dashboard-grid">
        <section className="panel">
          <div className="panel-head">
            <div>
              <h3>Estudiantes por nivel</h3>
              <span>Distribución demostrativa A1, A2, B1 y B2</span>
            </div>
            <span className="chip">A1 — B2</span>
          </div>

          <div className="level-chart">
            {levels.map((item) => (
              <div className="level-row" key={item.level}>
                <div className="level-label">{item.level}<small>{item.label}</small></div>
                <div className="bar-track"><div className="bar" style={{ width: `${item.width}%` }}></div></div>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="panel metric-panel">
          <div className="panel-head"><h3>Estado del proyecto</h3></div>
          <div className="metric"><span>Autenticación</span><strong>DummyJSON</strong><small>Login real mediante POST</small></div>
          <div className="metric"><span>Gestión</span><strong>CRUD</strong><small>Agregar, editar y eliminar usuarios</small></div>
          <div className="metric"><span>Tabla</span><strong>208+</strong><small>Registros disponibles en la API</small></div>
        </section>
      </div>

      <section className="panel reinforce-panel">
        <div className="panel-head">
          <div>
            <h3>Módulos del sistema</h3>
            <span>Funciones principales de la Actividad 8</span>
          </div>
        </div>
        <div className="topic-list">
          <article><strong>Login con API</strong><small>Validación real con DummyJSON y manejo de errores.</small></article>
          <article><strong>Tabla interactiva</strong><small>Filtros, paginación y parámetros reflejados en la URL.</small></article>
          <article><strong>CRUD simulado</strong><small>Llamadas POST, PUT y DELETE más actualización del estado local.</small></article>
        </div>
      </section>
    </section>
  )
}

export default DashboardPage
