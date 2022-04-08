import { loginError, loginStart, loginSuccess, registerError, registerStart, registerSuccess } from "../redux/auth/authSlice.js";
import axiosClient from "./axiosClient.js";

class AuthApi {
   // login = (user, dispatch, navigate) => {
   login = async (user, dispatch, history) => {
      dispatch(loginStart())
      try {
         const res = await axiosClient.post('/auth/login', user);
         dispatch(loginSuccess(res))
         localStorage.setItem("currentUser", JSON.stringify(res))
         localStorage.setItem("accessToken", res.accessToken)
         window.location.reload(false);
      } catch (error) {
         dispatch(loginError())
      }
   };
   register = async (user, dispatch, history) => {
      dispatch(registerStart())
      try {
         const res = await axiosClient.post('/auth/register', user);
         dispatch(registerSuccess(res))
         history.push("/admin/login")
      } catch (error) {
         dispatch(registerError())
      }
   };
}

const authApi = new AuthApi();
export default authApi;