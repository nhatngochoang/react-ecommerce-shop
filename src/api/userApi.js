import firebase from 'firebase/compat/app';

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
   }
}

export default userApi
