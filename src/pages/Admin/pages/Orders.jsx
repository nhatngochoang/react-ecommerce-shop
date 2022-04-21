import React, { useCallback, useEffect, useState } from 'react'
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../components/modal/Modal.jsx'
import Table from '../components/table/index.jsx'
import orderApi from '../../../api/orderApi.js'


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

export default function Orders() {
   const [customerList, setCustomerList] = useState([initialState])
   const [showModal, setShowModal] = useState(false)
   const [modalInfo, setModalInfo] = useState(initialState)

   const [values, setValues] = useState({
      customer: '',
      address: '',
      total: '',
      status: 0,
      method: 0,
   })

   const handleModalInfo = (userID) => {
      const filterData = customerList.filter(item => userID === item._id)
      setModalInfo(filterData[0])
   }

   const handleShowModal = (rowId) => {
      setShowModal(!showModal)
      handleModalInfo(rowId)
   }
   const handleFetchData = useCallback(() => {
      const fetchData = async () => {
         const token = localStorage.getItem('accessToken')
         const data = await orderApi.getOrders(token)
         setCustomerList(data)
         console.log("FETCH CUSTOMER DATA : ", data);
      }
      fetchData()
   }, [])

   const handleDeleteUser = () => {
      const fetchData = async () => {
         const token = localStorage.getItem('accessToken')
         const data = await orderApi.deleteOrder(token, modalInfo._id)
         console.log("DELETE CUSTOMER SUCCESS: ", data);
      }
      fetchData()
   }

   const handleUpdateUser = async (values) => {
      try {
         const fetchData = async () => {
            const token = localStorage.getItem('accessToken')
            const data = await orderApi.updateOrder(token, values, modalInfo._id)
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
                  <label htmlFor="customer">Customer</label>
                  <input value={values['customer']} onChange={handleChange} type="text" id="customer" name="customer" placeholder={modalInfo.customer} />

                  <label htmlFor="address">Address</label>
                  <input value={values['address']} onChange={handleChange} type="text" id="address" name="address" placeholder={modalInfo.address} />

                  <label htmlFor="total">Total</label>
                  <input value={values['total']} onChange={handleChange} type="text" id="total" name="total" placeholder={modalInfo.total} />

                  <label htmlFor="status">Status</label>
                  <input value={values['status']} onChange={handleChange} type="text" id="status" name="status" placeholder={modalInfo.status} />

                  <label htmlFor="method">Method</label>
                  <input value={values['method']} onChange={handleChange} type="text" id="method" name="method" placeholder={modalInfo.method} />

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
                        headData={orderTableHead}
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
