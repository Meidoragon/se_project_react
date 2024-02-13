import { apiBaseUrl as URL } from "./constants";

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Error: ${response.status}`);
  }
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export function getItems() {
  return request(`${URL}/items`, {});
}

export function addItem(item, token) {
  console.log(item);
  console.log(token);
  return request(`${URL}/items`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
}

export function deleteItem(id, token) {
  return request(`${URL}/items/${id}`, {
    method: 'DELETE',
    headers: {
      authorizaiton: `Bearer ${token}`,
    }
  })
}

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

export function getCurrentUser(token) {
  return request(`${URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    }
  })
}


export function handleApiError(res) {
  console.error(`Error: ${res.status}`);
}
