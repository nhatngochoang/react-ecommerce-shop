import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Customers from '../pages/Admin/pages/Customers.jsx'
import Dashboard from '../pages/Admin/pages/Dashboard.jsx'
import Login from '../pages/Admin/pages/Login.jsx'
import Register from '../pages/Admin/pages/Register.jsx'

const adminAccessToken = localStorage.getItem('accessToken')

const RoutesAdmin = () => {
   if (!adminAccessToken)
      return (
         <Switch>
            <Route exact path='/admin/login' component={Login} />
            <Route exact path='/admin/register' component={Register} />
            <Redirect to="/admin/login" />
         </Switch>
      )
   else return (
      <Switch>
         <Route exact path='/admin/dashboard' component={Dashboard} />
         <Route exact path='/admin/customers' component={Customers} />
         <Redirect to="/admin/dashboard" />
      </Switch>
   )
}

export default RoutesAdmin
