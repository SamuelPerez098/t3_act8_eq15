import { useState } from 'react'
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import StudentsPage from './pages/StudentsPage.jsx'
import ReportsPage from './pages/ReportsPage.jsx'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import { getAppRole } from './utils/student.js'

function loadSession() {
  try {
    const saved = sessionStorage.getItem('englishLabUser')
    return saved ? JSON.parse(saved) : null
  } catch {
    return null
  }
}

function App() {
  const [user, setUser] = useState(loadSession)
  const [view, setView] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogin = (loggedUser) => {
    const normalizedUser = {
      ...loggedUser,
      appRole: getAppRole(loggedUser.role),
    }

    sessionStorage.setItem('englishLabUser', JSON.stringify(normalizedUser))
    setUser(normalizedUser)
    setView('dashboard')
  }

  const handleLogout = () => {
    sessionStorage.removeItem('englishLabUser')
    setUser(null)
    setView('dashboard')
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="system-shell">
      <Navbar
        user={user}
        onToggleSidebar={() => setSidebarOpen((value) => !value)}
        onLogout={handleLogout}
      />

      <div className="system-body">
        <Sidebar
          open={sidebarOpen}
          currentView={view}
          onNavigate={setView}
        />

        <main className="main-content">
          {view === 'dashboard' && <DashboardPage />}
          {view === 'students' && <StudentsPage />}
          {view === 'reports' && <ReportsPage />}
        </main>
      </div>
    </div>
  )
}

export default App
