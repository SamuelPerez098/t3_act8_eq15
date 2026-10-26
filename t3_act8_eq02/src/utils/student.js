const LEVELS = ['A1', 'A2', 'B1', 'B2']
const ACTIVITIES = ['Hoy', 'Ayer', 'Hace 2 días', 'Hace 3 días']

export function getStudentLevel(id) {
  const numericId = Number(id) || 1
  return LEVELS[(numericId - 1) % LEVELS.length]
}

export function getStudentActivity(id) {
  const numericId = Number(id) || 1
  return ACTIVITIES[(numericId - 1) % ACTIVITIES.length]
}

export function getAppRole(role) {
  const normalizedRole = String(role || '').toLowerCase()

  if (normalizedRole === 'profesor' || normalizedRole === 'teacher') {
    return 'Profesor'
  }

  if (normalizedRole === 'admin' || normalizedRole === 'moderator') {
    return 'Profesor'
  }

  return 'Estudiante'
}

export function getApiRole(appRole) {
  return appRole === 'Profesor' ? 'admin' : 'user'
}

export function getInitials(firstName = '', lastName = '') {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'US'
}
