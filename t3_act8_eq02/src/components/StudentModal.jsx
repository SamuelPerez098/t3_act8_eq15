import { useEffect, useState } from 'react'

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  age: 18,
  role: 'user',
}

function StudentModal({ open, mode, student, busy, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return

    setForm(
      student
        ? {
            firstName: student.firstName || '',
            lastName: student.lastName || '',
            email: student.email || '',
            age: student.age || 18,
            role: student.role || 'user',
          }
        : EMPTY_FORM,
    )
    setError('')
  }, [open, student])

  if (!open) return null

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
      setError('Nombre, apellido y correo son obligatorios.')
      return
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError('Ingresa un correo electrónico válido.')
      return
    }

    onSubmit({
      ...form,
      age: Number(form.age) || 18,
    })
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="student-modal-title">
        <button className="modal-close" type="button" onClick={onClose} aria-label="Cerrar">×</button>
        <div className="eyebrow">ENGLISH LAB / ESTUDIANTES</div>
        <h3 id="student-modal-title">{mode === 'edit' ? 'Editar estudiante' : 'Nuevo estudiante'}</h3>

        <form onSubmit={handleSubmit} className="student-form">
          <label>Nombre<input name="firstName" value={form.firstName} onChange={handleChange} /></label>
          <label>Apellido<input name="lastName" value={form.lastName} onChange={handleChange} /></label>
          <label className="form-wide">Correo<input name="email" type="email" value={form.email} onChange={handleChange} /></label>
          <label>Edad<input name="age" type="number" min="1" max="120" value={form.age} onChange={handleChange} /></label>
          <label>Rol
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="user">user</option>
              <option value="moderator">moderator</option>
              <option value="admin">admin</option>
            </select>
          </label>

          {error && <p className="form-error form-wide">{error}</p>}

          <div className="modal-actions form-wide">
            <button className="secondary-button" type="button" onClick={onClose} disabled={busy}>Cancelar</button>
            <button className="primary-button" type="submit" disabled={busy}>
              {busy ? 'Guardando...' : mode === 'edit' ? 'Guardar cambios' : 'Agregar estudiante'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default StudentModal
