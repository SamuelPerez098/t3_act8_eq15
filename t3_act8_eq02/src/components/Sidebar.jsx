function Sidebar({ open, currentView, onNavigate, onLogout }) {
  return (
    <aside className={`sidebar ${open ? '' : 'sidebar-hidden'}`}>
      <div>
        <div className="sidebar-kicker">ENGLISH LAB //</div>
        <h2>MENÚ</h2>

        <button
          className={`menu-item ${currentView === 'dashboard' ? 'active' : ''}`}
          type="button"
          onClick={() => onNavigate('dashboard')}
        >
          <span>⌂</span> Inicio
        </button>

        <button
          className={`menu-item ${currentView === 'students' ? 'active' : ''}`}
          type="button"
          onClick={() => onNavigate('students')}
        >
          <span>♙</span> Estudiantes
        </button>

        <button
          className={`menu-item ${currentView === 'reports' ? 'active' : ''}`}
          type="button"
          onClick={() => onNavigate('reports')}
        >
          <span>⚙</span> Reportes de errores
        </button>
      </div>

      <div className="sidebar-bottom">
        <button className="menu-item" type="button" onClick={onLogout}>
          <span>↪</span> Cerrar sesión
        </button>
        <p>PLATAFORMA GRATUITA<br />INGLÉS · A1 — B2</p>
      </div>
    </aside>
  )
}

export default Sidebar
