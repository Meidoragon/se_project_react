import { apiBaseUrl as URL } from "./constants";
import { request } from "./api.js";

export function register(values) {
  return request(`${URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
}

export function signIn(values) {
  return request(`${URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(values)
  })
}

