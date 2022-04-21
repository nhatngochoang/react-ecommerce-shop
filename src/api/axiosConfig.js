import jwt_decode from 'jwt-decode'
const { default: axios } = require("axios");

export const axiosConfig = axios.create({
   baseURL: process.env.REACT_APP_API_URL,
   timeout: 30000,
   headers: {
      'Content-Type': 'application/json',
      'X-Custom-Header': 'foobar'
   },
   withCredentials: true, // Để request gửi kèm cookie
});

axiosConfig.interceptors.request.use(async (config) => {
   let accessToken = localStorage.getItem('accessToken')

   const refreshToken = () => {

   }

   if (accessToken) {
      const decodedToken = jwt_decode(accessToken)
      if (decodedToken.exp * 1000 < new Date().getTime()) {
         accessToken = await refreshToken()
         localStorage.setItem('accessToken', accessToken)

      }
      config.headers.Authorization = 'Bearer ' + accessToken
   }

   return config
})