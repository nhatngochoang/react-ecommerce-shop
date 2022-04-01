import { useState } from "react";
import SignIn from "./pages/SignIn/index.jsx";
import SignUp from "./pages/SignUp/index.jsx";


const AuthOpen = ({ handleAuth, isSignedIn, uiConfig, token }) => {
   const [authStatus, setAuthStatus] = useState(true)

   const handleAuthStatus = () => {
      setAuthStatus(!authStatus)
   }
   return (
      <>
         {authStatus
            ? <SignIn handleAuthStatus={handleAuthStatus} handleAuth={handleAuth} isSignedIn={isSignedIn} uiConfig={uiConfig} token={token} />
            : <SignUp handleAuthStatus={handleAuthStatus} handleAuth={handleAuth} isSignedIn={isSignedIn} uiConfig={uiConfig} token={token} />
         }
      </>
   );
}

export default AuthOpen;