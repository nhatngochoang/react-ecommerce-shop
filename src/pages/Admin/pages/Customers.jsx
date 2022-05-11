import React, { useEffect, useCallback, useState } from 'react'
import Table from '../components/table/index.jsx'
// import customerList from '../components/assets/JsonData/customers-list.json'
import userApi from '../../../api/userApi.js'
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../components/modal/Modal.jsx'

import ModalComponent from '../components/modal/styled'

const customerTableHead = [
   'id',
   'username',
   'email',
   'phone',
   'total orders',
   'total spend',
   'location'
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
   <>
      <td>{item._id.toString().slice(0, 5).concat('...')}</td>
      <td>{item.username}</td>
      <td>{item.email}</td>
      <td>{item.phone}</td>
      <td>{item.orders.length}</td>
      <td>{item.totalSpend}</td>
      <td>{item.location}</td>
   </>
)

const initialState = { "_id": "", "username": "", "email": "", "location": "", "phone": "", "totalSpend": 0, "totalOrders": 0, orders: [""], }

const Customers = () => {
   const [customerList, setCustomerList] = useState([initialState])
   const [showModal, setShowModal] = useState(false)
   const [modalInfo, setModalInfo] = useState(initialState)

   const [values, setValues] = useState({
      username: '',
      email: '',
      phone: '',
      totalSpend: 0,
      totalOrders: 0,
      location: ''
   })

   const handleModalInfo = (userID) => {
      const filterData = customerList.filter(item => userID === item._id)
      setModalInfo(filterData[0])
      console.log(filterData)
      setValues({
         ...values,
         totalSpend: filterData[0].totalSpend,
         totalOrders: filterData[0].orders.length,
      })
   }

   const handleShowModal = (rowId) => {
      setShowModal(!showModal)
      handleModalInfo(rowId)
   }
   const handleFetchData = useCallback(() => {
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
         const data = await userApi.deleteUser(token, modalInfo._id)
         console.log("DELETE CUSTOMER SUCCESS: ", data);
      }
      fetchData()
   }

   const handleUpdateUser = async (values) => {
      try {
         const fetchData = async () => {
            const token = localStorage.getItem('accessToken')
            const data = await userApi.updateUser(token, values, modalInfo._id)
            console.log("UPDATE CUSTOMER SUCCESS: ", data);
            if (data === 'Update successfully') {
               setShowModal(false)
            }
         }
         await fetchData()
         handleFetchData()
      } catch (error) {
         console.log(error)
      }
   }

   const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      handleUpdateUser(values)
      console.log(values)
   }

   useEffect(() => {
      handleFetchData()
   }, [handleFetchData])

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <Modal
               show={showModal}
               setShow={setShowModal}
            >
               <ModalHeader>
                  <h2>Edit/Delete</h2>
               </ModalHeader>
               <ModalBody>
                  <label htmlFor="username">Username</label>
                  <input value={values['username']} onChange={handleChange} type="text" id="username" name="username" placeholder={modalInfo.username} />
                  <label htmlFor="email">Email</label>
                  <input value={values['email']} onChange={handleChange} type="text" id="email" name="email" placeholder={modalInfo.email} />
                  <label htmlFor="phone">Phone</label>
                  <input value={values['phone']} onChange={handleChange} type="text" id="phone" name="phone" placeholder={modalInfo.phone} />
                  <label htmlFor="totalOrders">Total Orders</label>
                  <input value={values['totalOrders']} onChange={handleChange} type="text" id="totalOrders" name="totalOrders" placeholder={modalInfo.orders.length} />
                  <label htmlFor="totalSpend">Total Spend</label>
                  <input value={values['totalSpend']} onChange={handleChange} type="text" id="totalSpend" name="totalSpend" placeholder={modalInfo.totalSpend} />
                  <label htmlFor="location">Location</label>
                  <input value={values['location']} onChange={handleChange} type="text" id="location" name="location" placeholder={modalInfo.location} />
               </ModalBody>
               <ModalFooter>
                  <button className="button-6" type='submit'>Save Changes</button>
                  <br />
                  <button className="button-6" onClick={handleDeleteUser} type='button'>Delete</button>
               </ModalFooter>
               <button className="modal__close" onClick={() => setShowModal(!showModal)}>close</button>
            </Modal>
         </form>
         {/* <ModalComponent /> */}
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
                        handleShowModal={handleShowModal}
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Customers
