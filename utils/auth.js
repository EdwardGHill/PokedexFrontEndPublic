export const isAuthenticated = () => {
    const token = localStorage.getItem('access_token');
    return !!token; // Returns true if the token is present
  };