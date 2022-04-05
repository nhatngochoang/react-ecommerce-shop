import { loginError, loginStart, loginSuccess } from "../redux/auth/authSlice.js";
import axiosClient from "./axiosClient.js";

class AuthApi {
   // login = (user, dispatch, navigate) => {
   login = async (user, dispatch, history) => {
      dispatch(loginStart())
      try {
         const res = await axiosClient.post('/auth/login', user);
         dispatch(loginSuccess(res))
         history.push("/admin/dashboard")
      } catch (error) {
         dispatch(loginError())
      }
   };
}

const authApi = new AuthApi();
export default authApi;