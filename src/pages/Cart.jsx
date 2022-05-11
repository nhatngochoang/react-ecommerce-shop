import React, { useEffect, useRef, useState } from 'react'
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


import { ethers } from 'ethers'
import { Buffer } from 'buffer'

import useModal from '../components/Modal/useModal.js';


const Account = process.env.REACT_APP_ACCOUNT
const PrivateKey = process.env.REACT_APP_PRIVATE_KEY
const RpcHttpUrl = process.env.REACT_APP_RPC_HTTP_URL

const EthereumProvider = new ethers.getDefaultProvider(RpcHttpUrl)
const HexPrivateKey = new Buffer.from(PrivateKey, 'hex') // cv private key to hex format
const Signer = new ethers.Wallet(HexPrivateKey, EthereumProvider)

async function run() {
   const balance = await EthereumProvider.getBalance(Account)
   console.log('ETH balance(wei): ', balance.toString());
   const balanceInEth = ethers.utils.formatEther(balance)
   console.log('balanceInEth: ', balanceInEth);
   console.log('ETH to wei: ', ethers.utils.parseEther('1.0').toString());

   const blockNumber = await EthereumProvider.getBlockNumber()
   console.log('blockNumber: ', blockNumber);
}


const Cart = () => {
   run()

   const cartItems = useSelector((state) => state.cartItems.value)

   const [cartProducts, setCartProducts] = useState(productData.getCartItemsInfo(cartItems))

   const [totalProducts, setTotalProducts] = useState(0)

   const [totalPrice, setTotalPrice] = useState(0)

   const { isShowing, toggle } = useModal();

   const [show, setShow] = useState(false)
   const [privateKey, setPrivateKey] = useState('')
   const [transaction_hash, setTransactionHash] = useState('')

   async function transferEth(value) {
      const transaction = await Signer.sendTransaction({
         to: '0x4281ecf07378ee595c564a59048801330f3084ee', // receiver
         value: ethers.utils.parseEther(value) // eth amount to transfer in wei
      })
      console.log('TRANSACTION_HASH: ', transaction.hash);
      setTransactionHash(transaction.hash)
   }

   const handleSubmit = (e, value = '0.0001') => {
      e.preventDefault()
      transferEth(value)
   }

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
         const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/orders`, data);
         if (res.status === 201) {
            dispatch(resetCart());
            const userID = localStorage.getItem('userID')
            const res2 = await axios.get(`${process.env.REACT_APP_API_URL}/api/userslist/${userID}`)
            const clone = JSON.parse(JSON.stringify(res2.data));
            clone.orders.push(res.data._id)
            await axios.put(`${process.env.REACT_APP_API_URL}/api/users/${userID}`, clone);
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
                     createOrder2({
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
                        <div style={{ marginBottom: '10px', marginTop: '10px' }} >
                           <Button size="block" onClick={() => setShow(true)}>
                              THANH TOÁN BẰNG VÍ ĐIỆN TỬ METAMASK!
                           </Button>
                        </div>

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
               {show && <form onSubmit={handleSubmit} style={{ width: '50%' }}>
                  <br />
                  <label htmlFor="privatekey">
                     <h3>Enter wallet private key</h3>
                  </label>
                  <br />
                  <input type="password" className="input1" id="privatekey"
                     value={privateKey}
                     onChange={e => setPrivateKey(e.target.value)}
                  />
                  <br />
                  <Button size="block">
                     Submit Transaction
                  </Button>
                  <h3>Transaction_hash: {transaction_hash}</h3>
               </form>}
            </div>
            {cash && <OrderDetail total={totalPrice} createOrder={createOrder2} onClose={onClose} />}
         </div>
      </Helmet>
   )
}

export default Cart










function UserAvatar(props) {
   return <img src={props.src} />
}

function Username(props) {
   return <span>{props.name}</span>
}

function User() {
   const user = useRef({
      name: "Aleem Isiaka",
      avatarURL: "https://icotar.com/avatar/jake.png?bg=e91e63",
   })

   const [, setForceUpdate] = useState(Date.now());

   useEffect(() => {
      setTimeout(() => {
         user.current = {
            name: "Isiaka Aleem",
            avatarURL: "https://icotar.com/avatar/craig.png?s=50", // a new image
         };

         setForceUpdate();
      }, 5000)
   })
   return (<div>
      <Username name={user.name} />
      <UserAvatar src={user.avatarURL} />
   </div>);
}
