import { useState } from 'react'
import { loginUser } from '../services/api.js'

function LoginPage({ onLogin }) {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!identifier.trim() || !password.trim()) {
      setError('Completa el usuario/correo y la contraseña.')
      return
    }

    try {
      setLoading(true)
      const data = await loginUser(identifier, password)
      onLogin(data)
    } catch (requestError) {
      setError(requestError.message || 'Usuario o contraseña incorrectos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <section className="login-panel">
        <div className="login-brand">ENGLISH LAB //</div>
        <h1>INICIO DE SESIÓN</h1>
        <p className="login-subtitle">LEARNING SYSTEM // ACCESO AL SISTEMA</p>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="identifier">Usuario o correo electrónico:</label>
          <input
            id="identifier"
            type="text"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            placeholder="emilys o correo del usuario"
            autoComplete="username"
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Contraseña"
            autoComplete="current-password"
          />

          {error && <p className="form-error" role="alert">{error}</p>}

          <button className="primary-button login-button" type="submit" disabled={loading}>
            {loading ? 'INICIANDO...' : 'INICIAR SESIÓN'}
          </button>
        </form>

        <div className="demo-credentials">
          <strong>Cuenta de prueba DummyJSON</strong>
          <span>Usuario: emilys</span>
          <span>Contraseña: emilyspass</span>
        </div>
      </section>
    </div>
  )
}

export default LoginPage
