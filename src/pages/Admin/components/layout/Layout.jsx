import React from 'react'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import RoutesAdmin from '../../../../routes/RoutesAdmin.jsx'
import Sidebar from '../sidebar/index.jsx'
import Topnav from '../topnav/index.jsx'
import './layout.css'

const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

export default function Layout() {
   const theme = useSelector(state => state.theme)

   return (
      <Route render={props => {
         if (isAdmin === false)
            return (
               <div>
                  <RoutesAdmin />
               </div>)
         else
            return (
               <div className={`layout ${theme.mode} ${theme.color}`}>
                  <Sidebar {...props} />
                  <div className="layout__content">
                     <Topnav />
                     <div className="layout__content-main">
                        <RoutesAdmin />
                     </div>
                  </div>
               </div>
            )
      }} />
   )
}
