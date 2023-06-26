import decode from 'jwt-decode';
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');
const { SECRET } = require('../config');


class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token) && this.verifyToken(token);
  }  

  verifyToken(token) {
    try {
      const decoded = jwt.verify(token, SECRET);
      return decoded;
    } catch (err) {
      throw new AuthenticationError('Invalid token');
    }
  }
  
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('token'); // Update the key to match the key used to store the token
  }

  setToken(token) {
    localStorage.setItem('token', token); // Update the key to match the key used to store the token
  }

  removeToken() {
    localStorage.removeItem('token'); // Update the key to match the key used to store the token
  }

  login(token) {
    this.setToken(token);
    window.location.assign('/');
  }

  logout() {
    this.removeToken();
    window.location.assign('/');
  }
}

export default new AuthService();
