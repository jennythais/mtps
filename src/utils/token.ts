import { TEMP_TOKEN_KEY, TOKEN_KEY } from '@/constants/auth'
import Cookies from 'js-cookie';

export const getToken = () => {
  return typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) ?? undefined : undefined
}

export const getTokenCookie = () => {
  return Cookies.get(TOKEN_KEY);
}

export const setToken = (token: string) => {
  return localStorage.setItem(TOKEN_KEY, token)
}

export const setTokenCookie = (token: string) => {
  return Cookies.set(TOKEN_KEY, token)
}

export const getTempToken = () => {
  return localStorage.getItem(TEMP_TOKEN_KEY) ?? undefined
}

export const getTempTokenCookie = () => {
  return Cookies.get(TEMP_TOKEN_KEY) !== undefined ? Cookies.get(TEMP_TOKEN_KEY) : undefined
}

export const setTempToken = (token: string) => {
  return localStorage.setItem(TEMP_TOKEN_KEY, token)
}
export const setTempTokenCookie = (token: string) => {
  return Cookies.set(TEMP_TOKEN_KEY, token)
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
export const isRefreshTokenCookieValid = () => {
  return Cookies.get(TEMP_TOKEN_KEY) !== undefined
}

export const clearStorage = () => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.clear()
}
export const clearCookie = () => {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(TEMP_TOKEN_KEY);
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  sessionStorage.clear();
}
