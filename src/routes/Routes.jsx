import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SignIn from '../pages/Auth/pages/SignIn/index.jsx'
import SignUp from '../pages/Auth/pages/SignUp/index.jsx'
import Cart from '../pages/Cart'
import Catalog from '../pages/Catalog'
import Home from '../pages/Home'
import Product from '../pages/Product'


const Routes = () => {
   return (
      <Switch>
         <Route path='/' exact component={Home} />
         <Route path='/catalog/:slug' component={Product} />
         <Route path='/catalog' component={Catalog} />
         <Route path='/cart' component={Cart} />
         <Route path='/signin' component={SignIn} />
         <Route path='/signup' component={SignUp} />
      </Switch>
   )
}

export default Routes
