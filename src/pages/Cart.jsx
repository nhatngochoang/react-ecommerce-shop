import React, { useEffect, useState } from 'react'
import styles from "../sass/components/Cart.module.css";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Helmet from '../components/Helmet'
import CartItem from '../components/CartItem'
import Button from '../components/Button'

import productData from '../assets/fake-data/products'
import numberWithCommas from '../utils/numberWithCommas'

import {
   PayPalScriptProvider,
   PayPalButtons,
   usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from 'axios'

import { useHistory } from 'react-router-dom'
import orderApi from '../api/orderApi.js'
import OrderDetail from '../components/OrderDetail.jsx';
import { resetCart } from '../redux/shopping-cart/cartItemsSlice.js';

const Cart = () => {

   const cartItems = useSelector((state) => state.cartItems.value)

   const [cartProducts, setCartProducts] = useState(productData.getCartItemsInfo(cartItems))

   const [totalProducts, setTotalProducts] = useState(0)

   const [totalPrice, setTotalPrice] = useState(0)

   useEffect(() => {
      setCartProducts(productData.getCartItemsInfo(cartItems))
      setTotalPrice(cartItems.reduce((total, item) => total + (Number(item.quantity) * Number(item.price)), 0))
      setTotalProducts(cartItems.reduce((total, item) => total + Number(item.quantity), 0))
   }, [cartItems])

   // console.log(cartProducts);

   const [open, setOpen] = useState(false);
   const [cash, setCash] = useState(false);
   const history = useHistory()
   const usdToVND = 22.69
   const currency = "USD";
   // const amount = (Number(cart.total) / 22.69).toString()
   var amount = Number(totalPrice / usdToVND).toFixed(2)
   const style = { layout: "vertical" };
   const dispatch = useDispatch();

   // Cach 1
   const createOrder = async (data) => {
      try {
         const res = await orderApi.create(data)
         if (res._id) {
            dispatch(resetCart());
            history.push(`/orders/${res._id}`);
         }
      } catch (err) {
         console.log(err);
      }
   };
   // Cach 2
   const createOrder2 = async (data) => {
      try {
         const res = await axios.post("http://localhost:4000/api/orders", data);
         if (res.status === 201) {
            dispatch(resetCart());
            history.push(`/orders/${res.data._id}`);
         }
      } catch (err) {
         console.log(err);
      }
   };

   // Custom component to wrap the PayPalButtons and handle currency changes
   const ButtonWrapper = ({ currency, showSpinner }) => {
      // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
      // This is the main reason to wrap the PayPalButtons in a new component
      const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

      useEffect(() => {
         dispatch({
            type: "resetOptions",
            value: {
               ...options,
               currency: currency,
            },
         });
      }, [currency, showSpinner]);

      return (
         <>
            {showSpinner && isPending && <div className="spinner" />}
            <PayPalButtons
               disabled={false}
               forceReRender={[amount, currency, style]}
               fundingSource={undefined}
               createOrder={(data, actions) => {
                  return actions.order
                     .create({
                        purchase_units: [
                           {
                              amount: {
                                 currency_code: currency,
                                 value: amount,
                              },
                           },
                        ],
                     })
                     .then((orderId) => {
                        // Your code here after create the order
                        return orderId;
                     });
               }}
               onApprove={function (data, actions) {
                  return actions.order.capture().then(function (details) {
                     const shipping = details.purchase_units[0].shipping;
                     createOrder({
                        customer: shipping.name.full_name,
                        address: shipping.address.address_line_1,
                        total: totalPrice,
                        method: "PAYPAL",
                     });
                  });
               }}
            />
         </>
      );
   };


   const onClose = () => {
      setCash(false)
   }

   return (
      <Helmet title="Giỏ hàng">
         <div className="cart">
            <div className="cart__info">
               <div className="cart__info__txt">
                  <p>
                     Bạn đang có {totalProducts} sản phẩm trong giỏ hàng
                  </p>
                  <div className="cart__info__txt__price">
                     <span>Thành tiền:</span> <span>{numberWithCommas(Number(totalPrice))}</span>
                  </div>
               </div>
               <div className="cart__info__btn">
                  {open ? (
                     <div className={styles.paymentMethods}>
                        <Button size="block" onClick={() => setCash(true)}>
                           THANH TOÁN KHI NHẬN HÀNG!
                        </Button>
                        <PayPalScriptProvider
                           options={{
                              "client-id": "AVNesOwqXbzxJfeHgYkcjfu9aQ9CIguJvHGBwCAS7T2F4akkx6WyEB107d6ZB0KGG0RamQYbmxqFZRIQ",
                              components: "buttons",
                              currency: "USD",
                              "disable-funding": "credit,card,p24",
                           }}>
                           <div style={{ height: "35px" }}>
                              <ButtonWrapper
                                 currency={currency}
                                 showSpinner={false}
                              />
                           </div>
                        </PayPalScriptProvider>

                     </div>
                  ) : (
                     <Button size="block" onClick={() => setOpen(true)}>
                        THANH TOÁN NGAY!
                     </Button>
                  )}
                  <Link to="/catalog">
                     <Button size="block">
                        Tiếp tục mua hàng
                     </Button>
                  </Link>

               </div>
            </div>
            <div className="cart__list">
               {
                  cartProducts.map((item, index) => (
                     <CartItem item={item} key={index} />
                  ))
               }
            </div>
            {cash && <OrderDetail total={totalPrice} createOrder={createOrder} onClose={onClose} />}
         </div>
      </Helmet>
   )
}

export default Cart