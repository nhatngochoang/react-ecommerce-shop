import React from 'react'
import { Redirect } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import NotFound from '../components/NotFound.jsx'
import Order from '../components/Order.jsx'
import SearchFilter from '../components/SearchFilter/SearchFilter.jsx'
import Whale from '../components/Whale.jsx'
import Admin from '../pages/Admin/index.jsx'
import SignIn from '../pages/Auth/pages/SignIn/index.jsx'
import SignUp from '../pages/Auth/pages/SignUp/index.jsx'
import Cart from '../pages/Cart'
import Catalog from '../pages/Catalog'
import Contact from '../pages/Contact.jsx'
import Home from '../pages/Home'
import Product from '../pages/Product'


const Routes = () => {
   return (
      <Switch>
         <Route exact path='/' component={Home} />
         <Route path='/catalog/:slug' component={Product} />
         <Route path='/catalog' component={Catalog} />
         <Route path='/cart' component={Cart} />
         <Route path='/contact' component={Contact} />

         <Route path='/search' component={SearchFilter} />
         <Route path='/signin' component={SignIn} />
         <Route path='/signup' component={SignUp} />
         <Route path='/orders/:id' component={Order} />
         <Route path='/whale' component={Whale} />
         {/* default page */}
         {/* <Route path="*" component={Home} />*/}
         <Route component={NotFound} />
         {/* <Redirect to="/" /> */}
      </Switch>
   )
}

export default Routes
