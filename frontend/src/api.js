const BASE_URL = 'http://localhost:8001/session'

export const createSession = async () => {
  const res = await fetch(`${BASE_URL}/`, { method: 'POST' })
  if (!res.ok) throw new Error('Failed to create session')
  return res.json()
}

export const getOptions = async (sessionId) => {
  const res = await fetch(`${BASE_URL}/${sessionId}/options`)
  if (!res.ok) throw new Error('Failed to fetch options')
  return res.json()
}

export const addOption = async (sessionId, name) => {
  const res = await fetch(`${BASE_URL}/${sessionId}/option/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  })
  if (!res.ok) throw new Error('Failed to add option')
  return res.json()
}

export const deleteOption = async (sessionId, name) => {
  const res = await fetch(`${BASE_URL}/${sessionId}/option/`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  })
  if (!res.ok) throw new Error('Failed to delete option')
  return res.json()
}

export const spin = async (sessionId) => {
  const res = await fetch(`${BASE_URL}/${sessionId}/spin/`, { method: 'POST' })
  if (!res.ok) throw new Error('Failed to spin')
  return res.json()
}
