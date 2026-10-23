function ReportsPage() {
  return (
    <section>
      <div className="eyebrow">ENGLISH LAB / REPORTES</div>
      <div className="page-heading">
        <div>
          <h2>Reportes de errores</h2>
          <p>Opción de navegación simulada solicitada para el sistema.</p>
        </div>
        <span className="chip">3 ABIERTOS · DEMO</span>
      </div>

      <section className="panel">
        <div className="panel-head"><h3>Seguimiento técnico</h3></div>
        <div className="reports-list">
          <article><strong>#001 · Audio no carga</strong><span>Prioridad media · Abierto</span></article>
          <article><strong>#002 · Resultado de ejercicio</strong><span>Prioridad baja · En revisión</span></article>
          <article><strong>#003 · Sesión expirada</strong><span>Prioridad alta · Abierto</span></article>
        </div>
      </section>
    </section>
  )
}

export default ReportsPage
