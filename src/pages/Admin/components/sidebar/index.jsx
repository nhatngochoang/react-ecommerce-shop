import React, { useEffect, useRef, useState } from 'react'
import './sidebar.css'
import logo from '../assets/images/logo.png'

import sidebar_items from '../assets/JsonData/sidebar_routes.json'
import { Link } from 'react-router-dom'
import SidebarItem from './SidebarItem.jsx'

// const SidebarItem = props => {

//    const active = props.active ? 'active' : ''

//    return (
//       <div className="sidebar__item">
//          <div className={`sidebar__item-inner ${active}`}>
//             <i className={props.icon}></i>
//             <span>
//                {props.title}
//             </span>
//          </div>
//       </div>
//    )
// }

const Sidebar = props => {


   const sidebarRef = useRef(null)
   const indicatorRef = useRef(null)

   const [activeIndex, setActiveIndex] = useState(0)
   const [stepHeight, setStepHeight] = useState(0)

   useEffect(() => {
      const activeIndex = sidebar_items.findIndex(item => item.route === props.location.pathname)
      setActiveIndex(activeIndex)
   }, [props.location.pathname])

   useEffect(() => {
      const timer = setTimeout(() => {
         const sidebarItem = sidebarRef.current.querySelector('.sidebar__item')
         indicatorRef.current.style.height = `
           ${sidebarItem.clientHeight * 1.1}px
        `
         setStepHeight(sidebarItem.clientHeight)
      }, 50);

      return () => {
         clearTimeout(timer);
      };
   }, [])


   return (
      <div className='sidebar' ref={sidebarRef}>
         <div className="sidebar__logo">
            <img src={logo} alt="company logo" />
         </div>
         <div
            ref={indicatorRef}
            className="sidebar__indicator"
            style={{
               transform: `translateX(-50%) translateY(${activeIndex * stepHeight - 2}px)`
            }}
         >
         </div>
         {
            sidebar_items.map((item, index) => (
               <Link to={item.route} key={index}>
                  <SidebarItem
                     title={item.display_name}
                     icon={item.icon}
                     active={index === activeIndex}
                  />
               </Link>
            ))
         }
      </div>
   )
}

export default Sidebar
