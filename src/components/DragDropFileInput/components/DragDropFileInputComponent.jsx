import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { ImageConfig } from '../config/ImageConfig.js'
import uploadImg from '../assets/cloud-upload-regular-240.png'
import './index.css'

DragDropFileInputComponent.propTypes = {
   onFileChange: PropTypes.func
}

export default function DragDropFileInputComponent(props) {
   const wrapperRef = useRef(null)

   const onDragEnter = () => {
      wrapperRef.current.classList.add('dragover')
   }

   const onDragLeave = () => {
      wrapperRef.current.classList.remove('dragover')
   }

   const onDrop = () => {
      wrapperRef.current.classList.remove('dragover')
   }

   const onFileDrop = (e) => {
      const newFile = e.target.files[0]
      if (newFile) {
         const updatedList = [...props.file, newFile]
         props.setFile(updatedList)
      }
   }

   const fileRemove = (file) => {
      const updatedList = [...props.file];
      updatedList.splice(props.file.indexOf(file), 1);
      props.setFile(updatedList);
   }

   return (
      <div className="file-input-box">
         <h2 className="file-input-header">
            Drop File Here
         </h2>
         <>
            <div
               ref={wrapperRef}
               className="drop-file-input"
               onDragEnter={onDragEnter}
               onDragLeave={onDragLeave}
               onDrop={onDrop}
            >
               <div className="drop-file-input__label">
                  <img src={uploadImg} alt="" />
                  <p>Drag & Drop your files here</p>
               </div>
               <input type="file" name="" id=""
                  onChange={onFileDrop}
               />
            </div>
            {
               props.file.length > 0 && (
                  <div className="drop-file-preview">
                     <p className="drop-file-preview__title">
                        Ready to upload
                     </p>
                     {
                        props.file.map((item, index) => (
                           <div key={index} className="drop-file-preview__item">
                              <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                              <div className="drop-file-preview__item__info">
                                 <p>{item.name}</p>
                                 <p>{item.size}B</p>
                              </div>
                              <span className="drop-file-preview__item__del" onClick={() => fileRemove(item)}>x</span>
                           </div>
                        ))
                     }
                  </div>
               )
            }
         </>
      </div>
   )
}

