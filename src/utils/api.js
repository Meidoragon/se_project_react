import { apiBaseUrl as URL } from "./constants";

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Error: ${response.status}`);
  }
}

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

export function getItems() {
  return request(`${URL}/items`, {});
}

export function addItem(token, item) {
  return request(`${URL}/items`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
}

export function deleteItem(token, id) {
  return request(`${URL}/items/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    }
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

export function updateCurrentUser(token, newInfo) {
  return request(`${URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newInfo)
  })
}

export function addCardLike(token, id) {
  return request(`${URL}/items/${id}/likes`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
}

export function removeCardLike(token, id) {
  return request(`${URL}/items/${id}/likes`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      authorization: `Bearer ${token}`,
    },
  })
}

export function handleApiError(res) {
  console.error(`Error: ${res.status}`);
}
