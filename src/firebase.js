import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
   apiKey: "AIzaSyD8236wYFwxPXM2X6PutHNQeMLgUYNP3DE",
   authDomain: "m2-ecommerce-shop.firebaseapp.com",
   projectId: "m2-ecommerce-shop",
   storageBucket: "STORAGE_BUCKET",
   messagingSenderId: "MESSAGING_SENDER_ID",
   appId: "APP_ID"
}

// Initialize Firebase and Firebase Authentication
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export { auth }