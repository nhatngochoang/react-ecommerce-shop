import React, { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "components/Header";
import Footer from "components/Footer";
import Routes from "../routes/Routes";
import RoutesAdmin from "../routes/RoutesAdmin";
import ProductViewModal from "./ProductViewModal.jsx";
import AuthOpen from "../pages/Auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getMe } from "../redux/firebase/userSlice.js";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { Switch } from "react-router-dom";

// Configure Firebase.
const config = {
   apiKey: process.env.REACT_APP_FIREBASE_API,
   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
   appId: process.env.REACT_APP_FIREBASE_APP_ID,
};
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
   // Popup signin flow rather than redirect flow.
   signInFlow: "popup",
   signInSuccessUrl: "/", // phải đi đến trang SignIn để set token
   // We will display Google and Facebook as auth providers.
   signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
   ],
   callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
   },
};

const Layout = () => {
   const [authOpen, setAuthOpen] = useState(false);
   const [token, setToken] = useState("");
   const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

   const dispatch = useDispatch();

   const handleAuth = () => {
      setAuthOpen(!authOpen);
   };

   // Listen to the Firebase Auth state and set the local state.
   useEffect(() => {
      const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
         if (!user) {
            // user logs out, handle something here
            console.log("User is not logged in");
            return;
         }

         console.log("Logged in user: ", user.displayName);

         const token = await user.getIdToken();
         if (token) {
            setToken(token);
         }

         // getMe when signed in
         try {
            const actionResult = await dispatch(getMe());
            const currentUser = unwrapResult(actionResult);
            console.log("Current User Info: ", currentUser);
         } catch (error) {
            console.log("Failed to log in ", error.message);
            // show toast error UI using unwrapResult()
         }

         // console.log('Logged in user token: ', token);
         setIsSignedIn(!!user);
      });
      return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
   }, [dispatch]);

   return (
      <BrowserRouter>
         <Route
            render={(props) => (
               <div>
                  {authOpen ? (
                     <AuthOpen
                        handleAuth={handleAuth}
                        isSignedIn={isSignedIn}
                        uiConfig={uiConfig}
                        token={token}
                     />
                  ) : (
                     <Switch>
                        <Route path='/admin'>
                           <RoutesAdmin />
                        </Route>
                        <Route path='/'>
                           <div>
                              <Header {...props} handleAuth={handleAuth} />
                              <div className="container">
                                 <div className="main">
                                    <Routes />
                                 </div>
                              </div>
                              <Footer />
                              <ProductViewModal />
                           </div>
                        </Route>
                     </Switch>
                  )}
               </div>
            )}
         />
      </BrowserRouter>
   );
};

export default Layout;
