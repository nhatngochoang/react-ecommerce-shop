import axios from 'axios';
import jwt_decode from 'jwt-decode';

let axiosJWT = axios.create()

const refreshToken = async () => {
   try {
      const url = `${process.env.REACT_APP_API_URL}/api/auth/refresh`;
      const res = await axios.post(url, {
         withCredentials: true,
      })
      return res.data
   } catch (error) {
      console.log(error)
   }
}
axiosJWT.interceptors.request.use(
   async (config) => {
      let date = new Date()
      const accessToken = localStorage.getItem('accessToken')
      const decodedToken = jwt_decode(accessToken)
      // token expire
      if (decodedToken.exp < date.getTime() / 1000) {
         const data = await refreshToken()
         // update user access token here, refresh token will be auto store in cookie
         // const refreshUser = {
         //    ...oldUser,
         //    accessToken: data.accessToken
         // }
         config.headers["token"] = "Bearer " + data.accessToken
      }
      config.headers["token"] = "Bearer " + accessToken
      return config
   },
   (err) => {
      return Promise.reject(err)
   }
)

export default axiosJWT