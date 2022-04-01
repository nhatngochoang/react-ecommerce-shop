import "firebase/compat/auth";
import "firebase/compat/messaging";
import React from "react";
import { Link } from "react-router-dom";
import "../../../../sass/components/auth/auth.css";
import SignOut from "../SignOut/index.jsx";

const icon01 = require("../../../../assets/icons/icon-google.png");

const SignUp = (props) => {
   const { handleAuth, handleAuthStatus, isSignedIn, token } = props;

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
                        <span className="login100-form-title">Sign Up</span>
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
                        <div className="p-t-13 p-b-9">
                           <span className="txt1">Confirm Password</span>
                        </div>
                        <div
                           className="wrap-input100 validate-input"
                           data-validate="Confirm Password is required"
                        >
                           <input className="input100" type="password" name="pass" />
                           <span className="focus-input100"></span>
                        </div>
                        <div className="container-login100-form-btn m-t-17">
                           <button className="login100-form-btn">Sign Up</button>
                        </div>
                        <div className="w-full text-center p-t-55">
                           <span className="txt2">Already have an account?</span>
                           <Link
                              to="/signin"
                              className="txt2 bo1"
                              onClick={() => handleAuthStatus()}
                           >
                              Sign in now
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

SignUp.propTypes = {};

export default SignUp;
