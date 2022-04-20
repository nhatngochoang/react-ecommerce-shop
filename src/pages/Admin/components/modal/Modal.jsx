import React, { useRef, useEffect } from 'react'

export default function Modal(props) {

   const modRef = useRef()

   useEffect(() => {
      const clickOutsideContent = e => {
         if (e.target === modRef.current) {
            props.setShow(false)
         }
      }
      window.addEventListener('click', clickOutsideContent)
      return () => {
         window.removeEventListener('click', clickOutsideContent)
      }
   }, [props])
   return (
      <div ref={modRef} className={`modal ${props.show ? 'active' : ''}`}>
         <div className="modal__content">
            {props.children}
         </div>
      </div>
   )
}

export const ModalHeader = props => {
   return (
      <div className="modal__header">
         {props.children}
      </div>
   )
}

export const ModalBody = props => {
   return (
      <div className="modal__body">
         {props.children}
      </div>
   )
}

export const ModalFooter = props => {
   return (
      <div className="modal__footer">
         {props.children}
      </div>
   )
}
