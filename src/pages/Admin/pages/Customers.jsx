import React, { useEffect, useCallback, useState } from 'react'
import Table from '../components/table/index.jsx'
// import customerList from '../components/assets/JsonData/customers-list.json'
import userApi from '../../../api/userApi.js'

const customerTableHead = [
   'id',
   'name',
   'email',
   'phone',
   'total orders',
   'total spend',
   'location'
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
   <tr key={index}>
      <td>{item._id.toString().slice(0, 5).concat('...')}</td>
      <td>{item.username}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>{item.totalOrders}</td>
      <td>{item.totalSpend}</td>
      <td>{item.location}</td>
   </tr>
)

const initialState = [{ "_id": "", "username": "", "email": "", "location": "", "phone": "", "totalSpend": 0, "totalOrders": 0 }]

const Customers = () => {
   const [customerList, setCustomerList] = useState(initialState)
   const handlefetchData = useCallback(() => {
      const fetchData = async () => {
         const token = localStorage.getItem('accessToken')
         const data = await userApi.getUsers(token)
         setCustomerList(data)
         console.log("FETCH CUSTOMER DATA : ", data);
      }
      fetchData()
   }, [])

   const handleDeleteUser = () => {
      const fetchData = async () => {
         const token = localStorage.getItem('accessToken')
         const data = await userApi.deleteUser(token)
         console.log("DELETE CUSTOMER SUCCESS: ", data);
      }
      fetchData()
   }

   useEffect(() => {
      handlefetchData()
      handleDeleteUser()
   }, [handlefetchData])

   return (
      <div>
         <h2 className="page-header">
            customers
         </h2>
         <div className="row">
            <div className="col-12">
               <div className="card">
                  <div className="card__body">
                     <Table
                        limit='10'
                        headData={customerTableHead}
                        renderHead={(item, index) => renderHead(item, index)}
                        bodyData={customerList}
                        renderBody={(item, index) => renderBody(item, index)}
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Customers
