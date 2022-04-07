import React from 'react'
import './box.scss'

export default function Box(props) {
   const className = {
      box: 'box',
      purple: props.purple && 'box-purple',
      fullhheight: props.fullhheight && 'box-fullheight',
   }
   return (
      <div className={Object.values(className).join(" ")}>
         {props.children}
      </div>
   )
}
