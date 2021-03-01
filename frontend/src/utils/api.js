// INIT API CLASS AND ADD USER GROUP AND AUTH TOKEN
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // 2. Loads cards from the server
  // GET https://around.nomoreparties.co/v1/groupId/cards
  getCardList(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(new TypeError(`Error! ${res.statusText}`))
    );
  }

  // 1. Loads user info from the server
  // GET https://around.nomoreparties.co/v1/groupId/users/me
  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'GET',
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(new TypeError(`Error! ${res.statusText}`))
    );
  }

  // 4. Adds new card to server from add card form
  // POST https://around.nomoreparties.co/v1/groupId/cards
  addCard({ name, link }, token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        name,
        link
      })
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(new TypeError(`Error! ${res.statusText}`))
    );
  }

  // 7. Delete a card from server
  // DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId
  removeCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(new TypeError(`Error! ${res.statusText}`))
    );
  }

  // 8. Add and remove likes
  // PUT, DELETE
  updateLikes(cardId, isLiked, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, { 
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then((res) =>
    res.ok
      ? res.json()
      : Promise.reject(new TypeError(`Error! ${res.statusText}`))
    );
  }

  // 3. Adds user info to the server from edit user form
  // PATCH https://around.nomoreparties.co/v1/groupId/users/me
  setUserInfo({ name, about }, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        name,
        about
      })
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(new TypeError(`Error! ${res.statusText}`))
    );
  }

  // 9. Add profile picture to server
  // PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
  setUserAvatar(avatar, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ avatar })
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(new TypeError(`Error! ${res.statusText}`))
    );
  }
}

// INIT API CLASS AND ADD USER GROUP AND AUTH TOKEN
const api = new Api({
  baseUrl: 'http://localhost:3000',
});

export default api;
