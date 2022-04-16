import React, { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";

import closeIcon from "../../../assets/images/close.png";

import { MdClose } from "react-icons/md";

const Background = styled.div`
   /* width: 100vw;
   height: 100vh;
   background-color: rgba(255, 255, 255, 0.8); */
   width: 100%;
   height: 100%;
   background: rgba(0, 0, 0, 0.8);

   // fixed styles
   position: fixed;
   top: 0;
   left: 0;
   display: flex;
   justify-content: center;
   align-items: center;
`;

const ModalWrapper = styled.div`
   width: 800px;
   height: 500px;
   box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
   background: #fff;
   color: #000;
   display: grid;
   grid-template-columns: 1fr 1fr;
   position: relative;
   z-index: 10;
   border-radius: 10px;
`;

const ModalImg = styled.img`
   width: 100%;
   height: 100%;
   border-radius: 10px 0 0 10px;
   background: #000;
`;

const CloseModalButton = styled(MdClose)`
   cursor: pointer;
   position: absolute;
   top: 20px;
   right: 20px;
   width: 32px;
   height: 32px;
   padding: 0;
   z-index: 10;
`;

const Content = styled.div`
   background-color: #fff;
   padding: 20px;
   border-radius: 20px;
   max-width: 90%;
   max-height: 90%;
   box-shadow: 0 3px 15px -3px rgba(0, 0, 0, 0.2);
   position: relative;
`;

const HeaderRow = styled.div`
   position: absolute;
   top: 10px;
   right: 10px;
`;

const ScrollDisabler = createGlobalStyle`
   body {
   overflow-y: hidden;
   }
`;

const Modal = ({ isOpen, close, children, container }) => {
   const contentRef = useRef();

   const animation = useSpring({
      config: {
         duration: 250,
      },
      opacity: isOpen ? 1 : 0,
      transform: isOpen ? `translateY(0%)` : `translateY(-100%)`,
   });

   const keyPress = useCallback(
      (e) => {
         if (e.key === "Escape" && isOpen) {
            close();
            console.log("I pressed");
         }
      },
      [close, isOpen]
   );

   // click outside to close
   useEffect(() => {
      if (!isOpen) return;

      function listener(evt) {
         if (contentRef.current?.contains(evt.target)) return;
         close();
      }

      window.addEventListener("click", listener);

      return () => {
         window.removeEventListener("click", listener);
      };
   }, [isOpen]);

   // escape to close
   useEffect(() => {
      document.addEventListener("keydown", keyPress);
      return () => document.removeEventListener("keydown", keyPress);
   }, [keyPress]);

   if (!isOpen) return null;
   return ReactDOM.createPortal(
      <>
         <Background>
            <animated.div style={animation}>
               <ModalWrapper>
                  <ModalImg src={require("../../../assets/images/modal.jpg")} alt="modal" />
                  <Content ref={contentRef}>
                     <HeaderRow>
                        {/* close img */}
                        <img
                           src={closeIcon}
                           alt="close"
                           width="30px"
                           style={{ cursor: "pointer" }}
                           onClick={close}
                        />
                     </HeaderRow>
                     {children}
                  </Content>
                  {/* close icon */}
                  <CloseModalButton aria-label="Close modal" onClick={close} />
               </ModalWrapper>
            </animated.div>
         </Background>
         <ScrollDisabler />
      </>,
      container.current
   );
};

export default Modal;
