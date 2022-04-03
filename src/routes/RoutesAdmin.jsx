import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Admin from '../pages/Admin/index.jsx'

const RoutesAdmin = () => {
   return (
      <Switch>
         <Route exact path='/admin/dashboard' component={Admin} />
      </Switch>
   )
}

export default RoutesAdmin
