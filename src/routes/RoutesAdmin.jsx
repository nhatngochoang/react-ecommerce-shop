import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Analytics from '../pages/Admin/pages/Analytics.jsx'
import Blank from '../pages/Admin/pages/Blank.jsx'
import Categories from '../pages/Admin/pages/Categories.jsx'
import Customers from '../pages/Admin/pages/Customers.jsx'
import Dashboard from '../pages/Admin/pages/Dashboard.jsx'
import Login from '../pages/Admin/pages/Login.jsx'
import Orders from '../pages/Admin/pages/Orders.jsx'
import Products from '../pages/Admin/pages/Products.jsx'
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
         <Route exact path='/admin/products' component={Products} />
         <Route exact path='/admin/orders' component={Orders} />
         <Route exact path='/admin/analytics' component={Analytics} />
         <Route exact path='/admin/categories' component={Categories} />
         <Route exact path='/admin/discount' component={Blank} />
         <Route exact path='/admin/inventory' component={Blank} />
         <Route exact path='/admin/settings' component={Blank} />
         <Redirect to="/admin/dashboard" />
      </Switch>
   )
}

export default RoutesAdmin
