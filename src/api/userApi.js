import axios from 'axios';
import firebase from 'firebase/compat/app';
import axiosClient from './axiosClient.js';
import axiosJWT from './axiosJWT.js';
import { AppConstant } from '../const'

const userApi = {
   getMe: () => {
      // Call API to get current user
      return new Promise((resolve, reject) => {

         // Wait 1000ms --> return result
         setTimeout(() => {
            const currentUser = firebase.auth().currentUser

            resolve({
               id: currentUser.uid,
               name: currentUser.displayName,
               email: currentUser.email,
               photoUrl: currentUser.photoUrl
            })
         }, 1000)
      })
   },
   getUsers: async (accessToken) => {
      try {
         const url = `${AppConstant.BASE_URL}/users`;
         // const res = await axios.get(url
         const res = await axiosJWT.get(url
            // , {
            //    headers: {
            //       token: `Bearer ${accessToken}`
            //    }
            // }
         )
         const data = await res.data
         return data
      } catch (error) {
         console.log(error);
      }
   },
   updateUser: async (token, values, id) => {
      try {
         const url = `${AppConstant.BASE_URL}/users/${id}`;
         // const res = await axios.get(url
         const res = await axiosJWT.put(url, values, {
            headers: {
               token: `Bearer ${token}`
            }
         })
         const data = await res.data
         return data
      } catch (error) {
         console.log(error);
      }
   },
   deleteUser: async (accessToken, id) => {
      try {
         const url = `${AppConstant.BASE_URL}/users/${id}`;
         const res = await axios.delete(url, {
            headers: {
               token: `Bearer ${accessToken}`
            }
         })
         const data = await res.data
         return data
      } catch (error) {
         console.log(error);
      }
   }
}

export default userApi
