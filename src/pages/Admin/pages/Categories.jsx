import React, { useEffect, useCallback, useState } from 'react'
import Table from '../components/table/index.jsx'
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../components/modal/Modal.jsx'
import axios from 'axios'

const categoryTableHead = [
   'id',
   'display',
   'slug',
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
   <>
      <td>{item._id.toString().slice(0, 5).concat('...')}</td>
      <td>{item.display}</td>
      <td>{item.categorySlug}</td>
   </>
)

const initialState = { "_id": "", "display": "", "categorySlug": "" }

const Categories = () => {
   const [categoryList, setCategoryList] = useState([initialState])
   const [showModal, setShowModal] = useState(false)
   const [modalInfo, setModalInfo] = useState(initialState)

   const [labelHeader, setLabelHeader] = useState('Edit/Delete')

   const [values, setValues] = useState({
      display: '',
      categorySlug: '',
   })

   const handleModalInfo = (id) => {
      const filterData = categoryList.filter(item => id === item._id)
      setModalInfo(filterData[0])
   }

   const handleShowModal = (rowId) => {
      setShowModal(!showModal)
      setLabelHeader('Edit/Delete')
      handleModalInfo(rowId)
   }
   const handleFetchData = useCallback(() => {
      const fetchData = async () => {
         const categoriesApi = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/categories`)
         setCategoryList(categoriesApi.data)
         console.log("FETCH CUSTOMER DATA : ", categoriesApi.data);
      }
      fetchData()
   }, [])

   const handleDelete = async () => {
      const categoriesApi = await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/categories/${modalInfo._id}`)
      console.log("DELETE CUSTOMER SUCCESS: ", categoriesApi.data);
      setShowModal(false)
      setModalInfo(initialState)
      setValues({
         display: '',
         categorySlug: '',
      })
      handleFetchData()
   }

   const handleUpdateUser = async () => {
      try {
         const categoriesApi = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/categories/${modalInfo._id}`, values)
         setShowModal(false)
         setModalInfo(initialState)
         setValues({
            display: '',
            categorySlug: '',
         })
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

   const handleCreateLabel = () => {
      setModalInfo(initialState)
      setShowModal(true)
      setLabelHeader('Create')
   }

   const handleCreate = async () => {
      const categoryApi = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/categories`, values)
      setShowModal(false)
      setModalInfo(initialState)
      handleFetchData()
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
                  <h2>{labelHeader}</h2>
               </ModalHeader>
               <ModalBody>
                  <label htmlFor="display">Display</label>
                  <input value={values['display']} onChange={handleChange} type="text" id="display" name="display" placeholder={modalInfo.display} />
                  <label htmlFor="categorySlug">Slug</label>
                  <input value={values['categorySlug']} onChange={handleChange} type="text" id="categorySlug" name="categorySlug" placeholder={modalInfo.categorySlug} />
               </ModalBody>
               <ModalFooter>
                  {labelHeader !== 'Create' ?
                     (<>
                        <button className="button-6" type='button' onClick={handleUpdateUser}>Save Changes</button>
                        <br />
                        <button className="button-6" onClick={handleDelete} type='button'>Delete</button>
                     </>)
                     :
                     (<>
                        <button className="button-6" type='button' onClick={handleCreate}>Create</button>
                     </>)}
               </ModalFooter>
               <button className="modal__close" onClick={() => setShowModal(!showModal)}>close</button>
            </Modal>
         </form>
         {/* <ModalComponent /> */}
         <h2 className="page-header">
            Categories
         </h2>
         <div className="row">
            <div className="col-12">
               <button className="button-6" onClick={handleCreateLabel}>Create</button>
               <div className="card">
                  <div className="card__body">
                     <Table
                        limit='10'
                        headData={categoryTableHead}
                        renderHead={(item, index) => renderHead(item, index)}
                        bodyData={categoryList}
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
export default Categories
