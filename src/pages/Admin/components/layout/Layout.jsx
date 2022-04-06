import React from 'react'
import { Route } from 'react-router-dom'
import RoutesAdmin from '../../../../routes/RoutesAdmin.jsx'
import Sidebar from '../sidebar/index.jsx'
import './layout.css'

const adminAccessToken = localStorage.getItem('accessToken')

export default function Layout() {
   return (
      <Route render={props => {
         if (!adminAccessToken)
            return (
               <div>
                  <RoutesAdmin />
               </div>)
         else
            return (
               <div>
                  <Sidebar {...props} />
                  <div className="layout__content">
                     <div className="layout__content-main">
                        <RoutesAdmin />
                     </div>
                  </div>
               </div>
            )
      }} />
   )
}
