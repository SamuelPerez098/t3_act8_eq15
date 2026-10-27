const API_URL = 'https://dummyjson.com'

async function request(url, options = {}) {
  const response = await fetch(url, options)
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || `Error HTTP ${response.status}`)
  }

  return data
}

export async function loginUser(identifier, password) {
  let username = identifier.trim()

  if (username.includes('@')) {
    const result = await request(`${API_URL}/users?limit=0&select=username,email`)
    const found = result.users.find(
      (user) => user.email.toLowerCase() === username.toLowerCase(),
    )

    if (!found) {
      throw new Error('Usuario o contraseña incorrectos.')
    }

    username = found.username
  }

  return request(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 60,
    }),
  })
}

export async function getUsers() {
  return request(`${API_URL}/users?limit=0`)
}

export async function createUser(user) {
  return request(`${API_URL}/users/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
}

export async function updateUser(id, user) {
  return request(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
}

export async function deleteUser(id) {
  return request(`${API_URL}/users/${id}`, {
    method: 'DELETE',
  })
}
