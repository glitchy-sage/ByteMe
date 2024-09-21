class AuthService {
    constructor() {
      this.authenticated = false;
    }
  
    login(username, password) {
      if (username === 'admin' && password === 'password') {
        this.authenticated = true;
        return true;
      }
      return false;
    }
  
    isAuthenticated() {
      return this.authenticated;
    }
  }
  
  export default new AuthService();
  