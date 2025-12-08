export const getToken = () => ({
  authToken: localStorage.getItem('accessToken') || ''
})
