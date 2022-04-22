import React from 'react'
import DragDropFileInputComponent from './components/DragDropFileInputComponent.jsx'

export default function DragDropFileInput() {

   const onFileChange = (files) => {
      console.log("Files Input:", files)
   }
   return (
      <div className="file-input-box">
         <h2 className="file-input-header">
            Drop File Here
         </h2>
         <DragDropFileInputComponent
            onFileChange={(files) => onFileChange(files)}
         />
      </div>
   )
}
