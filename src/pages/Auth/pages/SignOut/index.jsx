import React from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useHistory } from "react-router-dom";

export default function SignOut({ handleAuth, token }) {
   const history = useHistory();

   const handleSignOut = () => {
      const handleSignOut = async () => {
         firebase.auth().signOut();
      };
      handleSignOut()
         .then(() => {
            firebase.messaging().deleteToken(token); // Logout
         })
         .then(() => history.push("/"))
         .catch((err) => {
            console.log(err);
         });
   };

   return (
      <div>
         <div className="limiter">
            <div className="container-login100">
               <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
                  <div className="go-back" onClick={() => handleAuth()}>
                     <Link to="/">
                        <div className="go-back--icon">
                           <i className="bx bx-arrow-back"></i>
                           <span className="go-back--icon__text">Back to HomePage</span>
                        </div>
                     </Link>
                  </div>
                  <form className="login100-form validate-form flex-sb flex-w">
                     <span className="login100-form-title p-b-12">
                        <h4>M-2 ecommerce Shop</h4>
                     </span>
                     <h2 className="go-back--icon__text">
                        Welcome {firebase.auth().currentUser.displayName}!!!
                     </h2>
                     <div className="container-login100-form-btn m-t-17">
                        <button
                           className="login100-form-btn txt2"
                           style={{ color: "white" }}
                           onClick={handleSignOut}
                        >
                           Sign out
                        </button>
                     </div>
                     <div className="w-full text-center p-t-55">
                        <span className="txt2"></span>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
}
