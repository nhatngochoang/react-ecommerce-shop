import React, { useEffect, useCallback, useState } from 'react'
import Table from '../components/table/index.jsx'
// import productList from '../components/assets/JsonData/customers-list.json'
import productApi from '../../../api/productApi.js'
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../components/modal/Modal.jsx'

import ModalComponent from '../components/modal/styled'

const productTableHead = [
   'id',
   'title',
   'description',
   'Image 1',
   'Image 2',
   'Category Slug',
   'slug',
   'price',
   'discount',
   'sold',
   'colors',
   'size',
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
   <>
      <td>{item._id.toString().slice(0, 5).concat('...')}</td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{item.image01}</td>
      <td>{item.image02}</td>
      <td>{item.categorySlug}</td>
      <td>{item.slug}</td>
      <td>{item.price}</td>
      <td>{item.discount}</td>
      <td>{item.sold}</td>
      <td>{item.colors}</td>
      <td>{item.size}</td>
   </>
)

const initialState = {
   "_id": "", "title": "", "description": "", "image01": "", "image02": "", "categorySlug": '', "slug": '',
   price: 0, discount: 0, sold: 0, colors: [''], size: ['']
}

const Products = () => {
   const [productList, setProductList] = useState([initialState])
   const [showModal, setShowModal] = useState(false)
   const [modalInfo, setModalInfo] = useState(initialState)

   const [values, setValues] = useState({
      title: '',
      description: '',
      image01: '',
      image02: '',
      categorySlug: '',
      slug: '',
      price: 0,
      discount: 0,
      sold: 0,
      colors: [''],
      size: ['']
   })

   const handleFetchData = useCallback((props) => {
      const fetchData = async () => {
         try {
            const response = await productApi.getAll();
            setProductList(response);
            console.log("FETCH PRODUCT DATA : ", response);
         } catch (err) {
            console.log(err)
         }
      }
      fetchData()
   }, [])

   const handleShowModal = (rowId) => {
      setShowModal(!showModal)
      // handleModalInfo(rowId)
   }

   const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
   }

   const handleSubmit = (e) => {
      e.preventDefault()
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
                  <input value={values['totalOrders']} onChange={handleChange} type="text" id="totalOrders" name="totalOrders" placeholder={modalInfo.totalOrders} />
                  <label htmlFor="totalSpend">Total Spend</label>
                  <input value={values['totalSpend']} onChange={handleChange} type="text" id="totalSpend" name="totalSpend" placeholder={modalInfo.totalSpend} />
                  <label htmlFor="location">Location</label>
                  <input value={values['location']} onChange={handleChange} type="text" id="location" name="location" placeholder={modalInfo.location} />
               </ModalBody>
               <ModalFooter>
                  <button className="button-6" type='submit'>Save Changes</button>
                  <br />
                  <button className="button-6" type='button'>Delete</button>
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
                        headData={productTableHead}
                        renderHead={(item, index) => renderHead(item, index)}
                        bodyData={productList}
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

export default Products
