import { apiBaseUrl as URL } from "./constants";

export function getItems(){
  //get items  
  return fetch(`${URL}/items`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Error: ${response.status}`);
    }
  })
}

export function addItem(item){
  return fetch(`${URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Error: ${response.status}`);
    }
  })
}

export function deleteItem(id){
  return fetch(`${URL}/items/${id}`, {
    'method': 'DELETE',
  }).then((response) => {
    if (response.ok) {
      return response;
    } else {
      return Promise.reject(`Error: ${response.status}`);
    }
  })
}