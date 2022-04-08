import axios from 'axios';
import firebase from 'firebase/compat/app';
import axiosClient from './axiosClient.js';

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
         const url = 'http://localhost:4000/api/users';
         const res = await axios.get(url, {
            headers: {
               token: `Bearer ${accessToken}`
            }
         })
         const data = await res.data
         return data
      } catch (error) {
         console.log(error);
      }
   },
   deleteUser: async (accessToken, id = '624abc37be5748fa1ff6e6a0') => {
      try {
         const url = `http://localhost:4000/api/users/${id}`;
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
