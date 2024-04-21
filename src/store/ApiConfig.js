export const apiUrl = 'http://3.232.244.22/api';
export const headersConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});
