import { useState } from 'react'

const levels = [
  { level: 'A1', label: 'Inicial', value: 72, width: 100 },
  { level: 'A2', label: 'Básico', value: 54, width: 75 },
  { level: 'B1', label: 'Intermedio', value: 32, width: 44 },
  { level: 'B2', label: 'Intermedio alto', value: 18, width: 25 },
]

const moduleProgress = {
  A1: [
    { name: 'Verbos y conjugaciones', value: 78 },
    { name: 'Escritura de oraciones', value: 64 },
    { name: 'Lectura', value: 71 },
    { name: 'Juegos de práctica', value: 86 },
  ],
  A2: [
    { name: 'Verbos y conjugaciones', value: 72 },
    { name: 'Escritura de oraciones', value: 69 },
    { name: 'Lectura', value: 76 },
    { name: 'Juegos de práctica', value: 81 },
  ],
  B1: [
    { name: 'Verbos y conjugaciones', value: 68 },
    { name: 'Escritura de oraciones', value: 74 },
    { name: 'Lectura', value: 79 },
    { name: 'Juegos de práctica', value: 73 },
  ],
  B2: [
    { name: 'Verbos y conjugaciones', value: 82 },
    { name: 'Escritura de oraciones', value: 77 },
    { name: 'Lectura', value: 84 },
    { name: 'Juegos de práctica', value: 79 },
  ],
}

function DashboardPage() {
  const [selectedLevel, setSelectedLevel] = useState('A1')
  const modules = moduleProgress[selectedLevel]
  const average = Math.round(modules.reduce((sum, module) => sum + module.value, 0) / modules.length)

  return (
    <section>
      <div className="eyebrow">ENGLISH LAB / INICIO</div>
      <div className="page-heading">
        <div>
          <h2>Resumen de aprendizaje</h2>
          <p>Conoce el avance general de los estudiantes en sus prácticas de inglés.</p>
        </div>
        <span className="chip">176 ESTUDIANTES INSCRITOS</span>
      </div>

      <div className="dashboard-grid dashboard-learning-grid">
        <section className="panel">
          <div className="panel-head">
            <div>
              <h3>Estudiantes por nivel</h3>
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

          <div className="chart-footer">
            <span>Mayor población: nivel A1</span>
            <span>Total: 176</span>
          </div>
        </section>

        <section className="panel module-panel">
          <div className="panel-head">
            <div>
              <h3>Avance por módulo</h3>
            </div>
            <span className="chip">NIVEL {selectedLevel}</span>
          </div>

          <div className="level-tabs" role="group" aria-label="Seleccionar nivel">
            {Object.keys(moduleProgress).map((level) => (
              <button
                type="button"
                key={level}
                className={selectedLevel === level ? 'active' : ''}
                onClick={() => setSelectedLevel(level)}
              >
                {level}
              </button>
            ))}
          </div>

          <p className="module-help">Promedio de lecciones completadas por estudiantes {selectedLevel} en cada módulo.</p>

          <div className="module-list">
            {modules.map((module) => (
              <div className="module-item" key={module.name}>
                <div className="module-line">
                  <strong>{module.name}</strong>
                  <span>{module.value}%</span>
                </div>
                <div className="module-track">
                  <div className="module-fill" style={{ width: `${module.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="module-average">
            <span>Avance promedio del nivel {selectedLevel}</span>
            <strong>{average}%</strong>
          </div>
        </section>
      </div>

      <div className="summary-cards">
        <article>
          <strong>Actividad semanal</strong>
          <span>68%</span>
          <small>Alumnos que practicaron esta semana</small>
        </article>
        <article>
          <strong>Racha más larga</strong>
          <span>12 días</span>
          <small>Práctica consecutiva registrada</small>
        </article>
        <article>
          <strong>Reportes técnicos</strong>
          <span>3 abiertos</span>
          <small>Errores o fallas informados por usuarios</small>
        </article>
      </div>
    </section>
  )
}

export default DashboardPage
