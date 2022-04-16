import React, { useRef, useState } from 'react'

import Modal from './components/Modal.jsx'

import GlobalStyles from './GlobalStyles.jsx'

import styled from "styled-components";

const Container = styled.div``

const Button = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #141414;
  color: #fff;
  font-size: 24px;
  cursor: pointer;
`;

export default function ModalComponent() {
   const [isOpen, setOpen] = useState(false)

   const portalRef = useRef()
   return (
      <>
         <Container ref={portalRef} >
            <GlobalStyles />
            <div>
               <h1> Modal Component</h1>
               <Button onClick={() => setOpen(true)}>Open</Button>
               <div style={{ transform: "translateX(50px)" }}>
                  <Modal
                     isOpen={isOpen}
                     close={() => setOpen(false)}
                     container={portalRef}>
                     <h2>Hello from the Modal</h2>
                     <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                        dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh,
                        ut fermentum massa justo sit amet risus. Cras justo odio, dapibus
                        ac facilisis in, egestas eget quam. Cras mattis consectetur purus
                        sit amet fermentum.
                     </p>
                  </Modal>
               </div>
            </div>
         </Container>
      </>
   )
}
