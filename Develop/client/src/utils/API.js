import AuthService from './auth';

const fetchWithToken = (url, options = {}) => {
  // Get the authentication token
  const token = AuthService.getToken();

  // Add the token to the headers
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  // Make the API request
  return fetch(url, options);
};

export const getMe = () => {
  return fetchWithToken('/api/users/me');
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const saveBook = (bookData) => {
  return fetchWithToken('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookData),
  });
};

export const deleteBook = (bookId) => {
  return fetchWithToken(`/api/users/books/${bookId}`, {
    method: 'DELETE',
  });
};

export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
