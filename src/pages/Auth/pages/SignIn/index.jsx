import firebase from "firebase/compat/app";
import "firebase/compat/messaging";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { Link } from "react-router-dom";
import "../../../../sass/components/auth/auth.css";
import SignOut from "../SignOut/index.jsx";

const icon01 = require("../../../../assets/icons/icon-google.png");

const SignIn = (props) => {
   const { handleAuth, handleAuthStatus, isSignedIn, uiConfig, token } = props;

   if (!isSignedIn) {
      return (
         <>
            <div className="limiter">
               <div className="container-login100">
                  <div className="wrap-login100 p-l-110 p-r-110 p-t-62 p-b-33">
                     <div className="go-back" onClick={() => handleAuth()}>
                        <Link to="/">
                           <i className="bx bx-arrow-back go-back--icon"></i>
                        </Link>
                     </div>
                     <form className="login100-form validate-form flex-sb flex-w">
                        <span className="login100-form-title p-b-53">Sign In With</span>
                        <div style={{ width: "100%", transform: "scale(1.5)" }}>
                           <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                        </div>
                        <span className="login100-form-title p-t-53">Or</span>
                        {/* <Link to="#" className="btn-face m-b-20">
                           <i className="fa fa-facebook-official"></i>
                           Facebook
                        </Link>
                        <Link to="#" className="btn-google m-b-20">
                           <img src={icon01} alt="GOOGLE" />
                           Google
                        </Link> */}
                        <div className="p-t-31 p-b-9">
                           <span className="txt1">Username</span>
                        </div>
                        <div
                           className="wrap-input100 validate-input"
                           data-validate="Username is required"
                        >
                           <input className="input100" type="text" name="username" />
                           <span className="focus-input100"></span>
                        </div>

                        <div className="p-t-13 p-b-9">
                           <span className="txt1">Password</span>
                           {/* <a href="#" className="txt2 bo1 m-l-5">
                              Forgot?
                           </a> */}
                        </div>
                        <div
                           className="wrap-input100 validate-input"
                           data-validate="Password is required"
                        >
                           <input className="input100" type="password" name="pass" />
                           <span className="focus-input100"></span>
                        </div>
                        <div className="container-login100-form-btn m-t-17">
                           <button className="login100-form-btn">Sign In</button>
                        </div>
                        <div className="w-full text-center p-t-55">
                           <span className="txt2">Not a member?</span>
                           <Link
                              to="/signup"
                              className="txt2 bo1"
                              onClick={() => handleAuthStatus()}
                           >
                              Sign up now
                           </Link>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
            <div id="dropDownSelect1"></div>
         </>
      );
   } else return <SignOut handleAuth={handleAuth} token={token} />;
};

SignIn.propTypes = {};

export default SignIn;
