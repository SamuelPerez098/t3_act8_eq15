import { useEffect, useMemo, useState } from 'react'
import StudentModal from '../components/StudentModal.jsx'
import { createUser, deleteUser, getUsers, updateUser } from '../services/api.js'
import { getStudentLevel } from '../utils/student.js'

const PAGE_SIZES = [10, 20, 40, 50]

function readPaginationFromUrl() {
  const params = new URLSearchParams(window.location.search)
  const page = Math.max(1, Number(params.get('page')) || 1)
  const requestedLimit = Number(params.get('limit')) || 10
  const limit = PAGE_SIZES.includes(requestedLimit) ? requestedLimit : 10
  return { page, limit }
}

function StudentsPage() {
  const initialPagination = readPaginationFromUrl()
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionError, setActionError] = useState('')
  const [busy, setBusy] = useState(false)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [page, setPage] = useState(initialPagination.page)
  const [limit, setLimit] = useState(initialPagination.limit)
  const [modal, setModal] = useState({ open: false, mode: 'add', student: null })

  const loadStudents = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getUsers()
      setStudents(data.users || [])
    } catch (requestError) {
      setError(requestError.message || 'No fue posible obtener los estudiantes.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStudents()
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      const next = readPaginationFromUrl()
      setPage(next.page)
      setLimit(next.limit)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const updateUrl = (nextPage, nextLimit, replace = false) => {
    const params = new URLSearchParams(window.location.search)
    params.set('page', String(nextPage))
    params.set('limit', String(nextLimit))
    const url = `${window.location.pathname}?${params.toString()}`
    window.history[replace ? 'replaceState' : 'pushState']({}, '', url)
  }

  const filteredStudents = useMemo(() => {
    const text = search.trim().toLowerCase()

    return students.filter((student) => {
      const matchesText = !text || [student.firstName, student.lastName, student.email, student.username]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(text)
      const matchesRole = roleFilter === 'all' || student.role === roleFilter
      return matchesText && matchesRole
    })
  }, [students, search, roleFilter])

  const totalPages = Math.max(1, Math.ceil(filteredStudents.length / limit))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * limit
  const visibleStudents = filteredStudents.slice(start, start + limit)

  useEffect(() => {
    if (page !== safePage) {
      setPage(safePage)
      updateUrl(safePage, limit, true)
    }
  }, [page, safePage, limit])

  const resetToFirstPage = () => {
    setPage(1)
    updateUrl(1, limit, true)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
    resetToFirstPage()
  }

  const handleRoleFilter = (event) => {
    setRoleFilter(event.target.value)
    resetToFirstPage()
  }

  const handleLimit = (event) => {
    const nextLimit = Number(event.target.value)
    setLimit(nextLimit)
    setPage(1)
    updateUrl(1, nextLimit)
  }

  const handlePage = (nextPage) => {
    const clamped = Math.min(Math.max(1, nextPage), totalPages)
    if (clamped === safePage) return
    setPage(clamped)
    updateUrl(clamped, limit)
  }

  const openAdd = () => setModal({ open: true, mode: 'add', student: null })
  const openEdit = (student) => setModal({ open: true, mode: 'edit', student })
  const closeModal = () => !busy && setModal({ open: false, mode: 'add', student: null })

  const handleSave = async (form) => {
    if (modal.mode === 'edit') {
      const confirmed = window.confirm(`¿Confirmas que deseas editar a ${modal.student.firstName} ${modal.student.lastName}?`)
      if (!confirmed) return
    }

    try {
      setBusy(true)
      setActionError('')

      if (modal.mode === 'add') {
        const created = await createUser(form)
        setStudents((current) => {
          const repeatedId = current.some((student) => Number(student.id) === Number(created.id))
          const localId = repeatedId ? Math.max(...current.map((student) => Number(student.id) || 0)) + 1 : created.id
          return [{ ...form, ...created, id: localId }, ...current]
        })
      } else {
        const updated = await updateUser(modal.student.id, form)
        setStudents((current) => current.map((student) => (
          student.id === modal.student.id ? { ...student, ...form, ...updated } : student
        )))
      }

      setModal({ open: false, mode: 'add', student: null })
    } catch (requestError) {
      setActionError(requestError.message || 'La operación no pudo completarse.')
    } finally {
      setBusy(false)
    }
  }

  const handleDelete = async (student) => {
    const confirmed = window.confirm(`¿Eliminar a ${student.firstName} ${student.lastName}? Esta acción se reflejará en la tabla local.`)
    if (!confirmed) return

    try {
      setBusy(true)
      setActionError('')
      await deleteUser(student.id)
      setStudents((current) => current.filter((item) => item.id !== student.id))
    } catch (requestError) {
      setActionError(requestError.message || 'No fue posible eliminar el estudiante.')
    } finally {
      setBusy(false)
    }
  }

  const pageNumbers = Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
    if (totalPages <= 5) return index + 1
    const first = Math.min(Math.max(1, safePage - 2), totalPages - 4)
    return first + index
  })

  return (
    <section className="students-page">
      <div className="eyebrow">ENGLISH LAB / ESTUDIANTES</div>
      <div className="page-heading">
        <div>
          <h2>Gestión de estudiantes</h2>
          <p>Datos obtenidos desde DummyJSON Users.</p>
        </div>
        <button className="primary-button" type="button" onClick={openAdd}>＋ Nuevo estudiante</button>
      </div>

      <section className="panel">
        <div className="panel-head">
          <div>
            <h3>Estudiantes inscritos</h3>
            <span>Consulta, filtra y administra los registros de la API.</span>
          </div>
          <span className="chip">{filteredStudents.length} REGISTROS</span>
        </div>

        <div className="filters">
          <input
            className="field search-field"
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Buscar por nombre, usuario o correo"
          />

          <select className="field" value={roleFilter} onChange={handleRoleFilter}>
            <option value="all">Rol: Todos</option>
            <option value="user">user</option>
            <option value="moderator">moderator</option>
            <option value="admin">admin</option>
          </select>

          <select className="field" value={limit} onChange={handleLimit}>
            {PAGE_SIZES.map((size) => <option value={size} key={size}>Mostrar: {size}</option>)}
          </select>
        </div>

        {actionError && <div className="alert error-alert">{actionError}</div>}

        {loading ? (
          <div className="loading-box">Cargando estudiantes...</div>
        ) : error ? (
          <div className="alert error-alert">
            <span>{error}</span>
            <button className="secondary-button" type="button" onClick={loadStudents}>Reintentar</button>
          </div>
        ) : (
          <>
            <div className="table-wrapper">
              <table className="students-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Estudiante</th>
                    <th>Nivel</th>
                    <th>Edad</th>
                    <th>Rol</th>
                    <th>Universidad</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="id-cell">{String(student.id).padStart(3, '0')}</td>
                      <td>
                        <div className="student-cell">
                          {student.image && <img src={student.image} alt="" />}
                          <div>
                            <strong>{student.firstName} {student.lastName}</strong>
                            <small>{student.email}</small>
                          </div>
                        </div>
                      </td>
                      <td><span className={`level-pill level-${getStudentLevel(student.id).toLowerCase()}`}>{getStudentLevel(student.id)}</span></td>
                      <td>{student.age ?? '—'}</td>
                      <td><span className="role-pill">{student.role || 'user'}</span></td>
                      <td className="university-cell">{student.university || 'Sin dato'}</td>
                      <td>
                        <div className="action-buttons">
                          <button type="button" onClick={() => openEdit(student)} disabled={busy}>Editar</button>
                          <button className="danger" type="button" onClick={() => handleDelete(student)} disabled={busy}>Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {visibleStudents.length === 0 && (
                    <tr><td colSpan="7" className="empty-table">No hay resultados con los filtros seleccionados.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <span>
                Mostrando {filteredStudents.length ? start + 1 : 0}–{Math.min(start + limit, filteredStudents.length)} de {filteredStudents.length}
              </span>
              <div className="page-controls">
                <button type="button" onClick={() => handlePage(safePage - 1)} disabled={safePage === 1}>Anterior</button>
                {pageNumbers.map((number) => (
                  <button
                    type="button"
                    key={number}
                    className={number === safePage ? 'current' : ''}
                    onClick={() => handlePage(number)}
                  >
                    {number}
                  </button>
                ))}
                <button type="button" onClick={() => handlePage(safePage + 1)} disabled={safePage === totalPages}>Siguiente</button>
              </div>
            </div>
          </>
        )}
      </section>

      <StudentModal
        open={modal.open}
        mode={modal.mode}
        student={modal.student}
        busy={busy}
        onClose={closeModal}
        onSubmit={handleSave}
      />
    </section>
  )
}

export default StudentsPage
