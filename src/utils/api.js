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
  //get items  
  return request(`${URL}/items`, {});
}

export function addItem(item) {
  return request(`${URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })
}

export function deleteItem(id) {
  return request(`${URL}/items/${id}`, {
    'method': 'DELETE',
  })
}

export function handleApiError(response) {
  console.error(`Error: ${response.status}`);
}
