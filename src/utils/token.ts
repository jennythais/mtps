import { TEMP_TOKEN_KEY, TOKEN_KEY } from '@/constants/auth'

export const getToken = () => {
  return typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) ?? undefined : undefined
}

export const setToken = (token: string) => {
  return localStorage.setItem(TOKEN_KEY, token)
}

export const getTempToken = () => {
  return localStorage.getItem(TEMP_TOKEN_KEY) ?? undefined
}

export const setTempToken = (token: string) => {
  return localStorage.setItem(TEMP_TOKEN_KEY, token)
}

export const removeTempToken = () => {
  return localStorage.removeItem(TEMP_TOKEN_KEY)
}

export const isTokenValid = (token?: string) => {
  return typeof token === 'string' && token !== ''
}

export const isRefreshTokenValid = (token?: string) => {
  return typeof token === 'string' && token !== ''
}

export const clearStorage = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.clear()
}
