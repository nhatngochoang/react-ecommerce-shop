import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import orderApi from '../api/orderApi.js'
import userApi from '../api/userApi.js'
import numberWithCommas from '../utils/numberWithCommas.js'
import Table from './Admin/components/table/index.jsx'

const orderTableHead = [
   'id',
   'customer',
   'address',
   'total',
   'status',
   'method',
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
   <>
      <td>{item._id.toString().slice(0, 5).concat('...')}</td>
      <td>{item.customer}</td>
      <td>{item.address}</td>
      <td>{item.total}</td>
      <td>{item.status}</td>
      <td>{item.method}</td>
   </>
)

const initialState = { "_id": "", "customer": "", "address": "", "total": 0, "status": 0, "method": '' }

export const countTotal = (arr) => {
   let totalSpend = 0;
   for (let i = 0; i < arr.length; i++) {
      totalSpend += arr[i].total
   }
   return totalSpend
}

export default function OrderList() {
   const [customerList, setCustomerList] = useState([initialState])


   console.log(customerList)

   const handleFetchData = useCallback(() => {
      const fetchData = async () => {
         const token = localStorage.getItem('accessToken')
         const userID = localStorage.getItem('userID')
         const userData = await userApi.getUsers(token)
         const orderData = await orderApi.getOrders(token)
         const result = userData.filter(item => item._id === userID)
         // console.log(result[0].orders)
         // console.log(orderData)
         let arr = []
         for (let i = 0; i < result[0].orders.length; i++) {
            for (let j = 0; j < orderData.length; j++) {
               if (orderData[j]._id === result[0].orders[i]) {
                  arr.push(orderData[j])
               }
            }
         }
         const totalSpend = countTotal(arr)
         axios.patch(`
            ${process.env.REACT_APP_API_URL}/api/users/${userID}
         `, { totalSpend })
         setCustomerList(arr)
      }
      fetchData()
   }, [])

   const history = useHistory()

   const handleOrderID = (id) => {
      history.push(`/orders/${id}`)
   }

   useEffect(() => {
      handleFetchData()
   }, [handleFetchData])
   return (
      <div>
         <h1>Danh sách đơn hàng của bạn</h1>
         <br />
         <h2>Bạn có {customerList.length} đơn hàng</h2>
         <br />
         <Table
            limit='10'
            headData={orderTableHead}
            renderHead={(item, index) => renderHead(item, index)}
            bodyData={customerList}
            renderBody={(item, index) => renderBody(item, index)}
            handleShowModal={handleOrderID}
         />
         <br />
         <h3>Tổng giá trị đơn hàng: {numberWithCommas(countTotal(customerList))}đ</h3>
      </div>
   )
}
