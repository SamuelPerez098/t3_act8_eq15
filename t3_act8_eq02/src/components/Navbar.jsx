import { getAppRole, getInitials } from '../utils/student.js'

function Navbar({ user, onToggleSidebar, onLogout }) {
  const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username
  const appRole = getAppRole(user.role)
  const panelLabel = appRole === 'Profesor' ? 'PANEL DOCENTE' : 'PANEL ESTUDIANTE'

  return (
    <header className="navbar">
      <button className="hamburger" type="button" onClick={onToggleSidebar} aria-label="Mostrar u ocultar menú">
        <span></span><span></span><span></span>
      </button>

      <h1>ENGLISH LAB // LEARNING SYSTEM</h1>
      <div className="nav-spacer"></div>
      <span className="nav-label">{panelLabel}</span>

      <div className="nav-user">
        {user.image ? (
          <img src={user.image} alt={`Perfil de ${fullName}`} />
        ) : (
          <div className="nav-avatar">{getInitials(user.firstName, user.lastName)}</div>
        )}
        <div className="nav-user-text">
          <strong>{fullName}</strong>
          <small>{appRole}</small>
        </div>
        <button className="logout-button" type="button" onClick={onLogout}>Cerrar sesión</button>
      </div>
    </header>
  )
}

export default Navbar
