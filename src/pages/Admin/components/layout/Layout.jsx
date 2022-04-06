import React from 'react'
import { Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import RoutesAdmin from '../../../../routes/RoutesAdmin.jsx'
import RoutesAuth from '../../../../routes/RoutesAuth.jsx'

import Sidebar from '../sidebar/index.jsx'

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
