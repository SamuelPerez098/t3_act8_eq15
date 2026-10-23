const LEVELS = ['A1', 'A2', 'B1', 'B2']

export function getStudentLevel(id) {
  const numericId = Number(id) || 1
  return LEVELS[(numericId - 1) % LEVELS.length]
}

export function getInitials(firstName = '', lastName = '') {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'US'
}
