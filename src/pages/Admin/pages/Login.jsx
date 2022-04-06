import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useHistory } from 'react-router-dom';
import styled from "styled-components";
import authApi from "../../../api/authApi.js";
import "../../../sass/components/admin/login.css";
import Button from "../components/Button.jsx";
import Icon from "../components/Icon.jsx";
import Input from "../components/Input.jsx";

function Login(props) {
   const FacebookBackground = "linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)";
   const InstagramBackground = "linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)";
   const TwitterBackground = "linear-gradient(to right, #56C1E1 0%, #35A9CE 50%)";

   const [values, setValues] = useState({
      username: '',
      password: '',
   })

   const dispatch = useDispatch()
   // v6 - const navigate = useNavigate()
   const history = useHistory()

   const inputs = [
      {
         id: 1,
         name: 'username',
         type: 'text',
         placeholder: 'Username',
         required: true,
         pattern: "^[A-Za-z0-9]{3,16}$",
      },
      {
         id: 2,
         name: 'password',
         type: 'password',
         placeholder: 'Password',
         // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
         required: true,
      },
   ]

   const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      console.log("LOGIN INFO: ", values)
      // authApi.login(values, dispatch, navigate)
      authApi.login(values, dispatch, history)
   }
   return (
      <div className="admin-login-container" style={{ fontSize: "16px" }}>
         <form onSubmit={handleSubmit}>
            <MainContainer>
               <WelcomeText>ADMIN</WelcomeText>
               <InputContainer>
                  {inputs.map(input => {
                     return (
                        <Input key={input.id}
                           {...input}
                           value={values[input.name]}
                           onChange={handleChange} />
                     )
                  })}
               </InputContainer>
               <ButtonContainer>
                  <Button content="log in" />
               </ButtonContainer>
               <LoginWith>OR LOGIN WITH</LoginWith>
               <HorizontalRule />
               <IconsContainer>
                  <Icon color={FacebookBackground}>
                     <FaFacebookF />
                  </Icon>
                  <Icon color={InstagramBackground}>
                     <FaInstagram />
                  </Icon>
                  <Icon color={TwitterBackground}>
                     <FaTwitter />
                  </Icon>
               </IconsContainer>
               <ForgotPassword>Forgot Password ?</ForgotPassword>
               <ButtonContainer>
                  <Link to="/admin/register">Register</Link>
               </ButtonContainer>
            </MainContainer>
         </form>
      </div>
   );
}

const MainContainer = styled.div`
   display: flex;
   align-items: center;
   flex-direction: column;
   height: 80vh;
   width: 30vw;
   background: rgba(255, 255, 255, 0.15);
   /* Glassmorphism */
   box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
   backdrop-filter: blur(8.5px);
   -webkit-backdrop-filter: blur(8.5px);
   border-radius: 10px;
   color: #ffffff;
   text-transform: uppercase;
   letter-spacing: 0.4rem;
   @media only screen and (max-width: 320px) {
      width: 80vw;
      height: 90vh;
      hr {
         margin-bottom: 0.3rem;
      }
      h4 {
         font-size: small;
      }
   }
   @media only screen and (min-width: 360px) {
      width: 80vw;
      height: 90vh;
      h4 {
         font-size: small;
      }
   }
   @media only screen and (min-width: 411px) {
      width: 80vw;
      height: 90vh;
   }

   @media only screen and (min-width: 768px) {
      width: 80vw;
      height: 80vh;
   }
   @media only screen and (min-width: 1024px) {
      width: 70vw;
      height: 50vh;
   }
   @media only screen and (min-width: 1280px) {
      width: 30vw;
      height: 80vh;
   }
`;

const WelcomeText = styled.h2`
   margin: 3rem 0 2rem 0;
`;

const InputContainer = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   align-items: center;
   height: 20%;
   width: 100%;
`;

const ButtonContainer = styled.div`
   margin: 1rem 0 2rem 0;
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
`;
const LoginWith = styled.h5`
   cursor: pointer;
`;

const HorizontalRule = styled.hr`
   width: 90%;
   height: 0.3rem;
   border-radius: 0.8rem;
   border: none;
   background: linear-gradient(to right, #14163c 0%, #03217b 79%);
   background-color: #ebd0d0;
   margin: 1.5rem 0 1rem 0;
   backdrop-filter: blur(25px);
`;

const IconsContainer = styled.div`
   display: flex;
   justify-content: space-evenly;
   margin: 2rem 0 3rem 0;
   width: 80%;
`;

const ForgotPassword = styled.h4`
   cursor: pointer;
`;

export default Login;
