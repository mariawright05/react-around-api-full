// INIT API CLASS AND ADD USER GROUP AND AUTH TOKEN
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Retrieves initial cards and user info from the server
  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getCardList()]);
  }

  // 2. Loads cards from the server
  // GET https://around.nomoreparties.co/v1/groupId/cards
  getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(new TypeError(`Error! ${res.statusText}`))
    );
  }

  // 1. Loads user info from the server
  // GET https://around.nomoreparties.co/v1/groupId/users/me
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(new TypeError(`Error! ${res.statusText}`))
    );
  }

  // 4. Adds new card to server from add card form
  // POST https://around.nomoreparties.co/v1/groupId/cards
  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
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
  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: 'DELETE'
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(new TypeError(`Error! ${res.statusText}`))
    );
  }

  // 8. Add and remove likes
  // PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
  cardLikeAdd(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: 'PUT'
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(new TypeError(`Error! ${res.statusText}`))
    );
  }

  // DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
  cardLikeRemove(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: 'DELETE'
    }).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(new TypeError(`Error! ${res.statusText}`))
    );
  }

  // 3. Adds user info to the server from edit user form
  // PATCH https://around.nomoreparties.co/v1/groupId/users/me
  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
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
  setUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
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
  baseUrl: 'https://around.nomoreparties.co/v1/group-5',
  headers: {
    authorization: '095d2fb7-24e6-4afa-94ea-68b60bd7e290',
    'Content-Type': 'application/json'
  }
});

export default api;
