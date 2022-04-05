import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Admin from '../pages/Admin/index.jsx'
import Login from '../pages/Admin/Login.jsx'
import Register from '../pages/Admin/Register.jsx'

const RoutesAdmin = () => {
   return (
      <Switch>
         <Route exact path='/admin/login' component={Login} />
         <Route exact path='/admin/register' component={Register} />
         <Route exact path='/admin/dashboard' component={Admin} />
         <Redirect to="/admin/login" />
      </Switch>
   )
}

export default RoutesAdmin
