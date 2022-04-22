import React, { useEffect, useCallback, useState } from 'react'
import Table from '../components/table/index.jsx'
import productApi from '../../../api/productApi.js'
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../components/modal/Modal.jsx'
import Button from '../../../components/Button.jsx'
import DragDropFileInput from '../../../components/DragDropFileInput/DragDropFileInput.jsx'
import axios from 'axios'

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
      <td><img style={{ maxWidth: '100px' }} src={item.image01} alt="anh san pham 1" /></td>
      <td><img style={{ maxWidth: '100px' }} src={item.image02} alt="anh san pham 2" /></td>
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
   price: 0, discount: 0, sold: 0, colors: [], size: []
}

const Products = () => {
   const [productList, setProductList] = useState([initialState])
   const [showModal, setShowModal] = useState(false)
   const [modalInfo, setModalInfo] = useState(initialState)
   const [headerLabel, setHeaderLabel] = useState('Edit/Delete')
   const [values, setValues] = useState({
      title: '',
      description: '',
      image01: '',
      image02: '',
      categorySlug: '',
      slug: '',
      price: '',
      discount: '',
      sold: '',
      colors: [],
      size: []
   })
   const [file, setFile] = useState(null);

   const [colors, setColors] = useState(['']);
   const [sizes, setSizes] = useState(['']);


   const formValue = [
      {
         label: 'Title',
         name: 'title',
      },
      {
         label: 'Desc',
         name: 'description',
      }, {
         label: 'Category Slug',
         name: 'categorySlug',
      }, {
         label: 'Slug',
         name: 'slug',
      }, {
         label: 'Price',
         name: 'price',
      }, {
         label: 'Discount',
         name: 'discount',
      }, {
         label: 'Sold',
         name: 'sold',
      }
   ]

   const handleFetchData = useCallback((props) => {
      const fetchData = async () => {
         try {
            const response = await productApi.getAll();
            setProductList(response);
            console.log("FETCH PRODUCT DATA : ", response);
            const colorApi = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/colors`)
            setColors(colorApi.data)
            const sizeApi = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/sizes`)
            setSizes(sizeApi.data)
         } catch (err) {
            console.log(err)
         }
      }
      fetchData()
   }, [])

   const handleModalInfo = (ID) => {
      const filterData = productList.filter(item => ID === item._id)
      setModalInfo(filterData[0])
   }

   const handleShowModal = (rowId) => {
      setShowModal(!showModal)
      setHeaderLabel('Edit/Delete')
      handleModalInfo(rowId)
   }

   const handleChangeCreateLabel = () => {
      setShowModal(!showModal)
      setHeaderLabel('Create')
   }

   const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value })
   }

   const handleColorCheckboxChange = (color) => {
      const res = modalInfo.colors.findIndex(item => item === color)
      console.log(res);
      if (res === -1) {
         const newColors = [...modalInfo.colors, color]
         setModalInfo({
            ...modalInfo,
            colors: newColors,
         })
      } else {
         const newColors = [...modalInfo.colors.filter(item => item !== color)]
         setModalInfo({
            ...modalInfo,
            colors: newColors,
         })
      }
   }

   const handleSizeCheckboxChange = (size) => {
      const res = modalInfo.size.findIndex(item => item === size)
      if (res === -1) {
         const newColors = [...modalInfo.size, size]
         setModalInfo({
            ...modalInfo,
            size: newColors,
         })
      } else {
         const newColors = [...modalInfo.size.filter(item => item !== size)]
         setModalInfo({
            ...modalInfo,
            size: newColors,
         })
      }
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      console.log(values)
   }

   const closeModalAndResetInfo = () => {
      setShowModal(!showModal)
      setModalInfo(initialState)
   }

   const handleCreate = async () => {
      const data = new FormData();
      data.append("file", file[0]);
      data.append("upload_preset", "uploads");

      const data2 = new FormData();
      data2.append("file", file[1]);
      data2.append("upload_preset", "uploads");

      try {
         if (file[1]) { // check how many files upload
            const process1 = axios.post(
               "https://api.cloudinary.com/v1_1/dcjxcptdt/image/upload",
               data
            );
            const uploadRes = await process1
            const { url } = uploadRes.data;
            // console.log(uploadRes)

            const process2 = axios.post(
               "https://api.cloudinary.com/v1_1/dcjxcptdt/image/upload",
               data2
            );
            const uploadRes2 = await process2
            // console.log(uploadRes2)

            const { url: url2 } = uploadRes2.data;

            const newProduct = {
               ...values,
               image01: url,
               image02: url2,
               price: +values.price,
               discount: +values.discount,
               sold: +values.sold
            };
            console.log(newProduct);

            await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/products`, newProduct);
            setShowModal(false);
         } else {
            const process1 = axios.post(
               "https://api.cloudinary.com/v1_1/dcjxcptdt/image/upload",
               data
            );
            const uploadRes = await process1
            const { url } = uploadRes.data;

            const newProduct = {
               ...values,
               image01: url,
               image02: 'no image2',
               price: +values.price,
               discount: +values.discount,
               sold: +values.sold,
               colors: modalInfo.colors,
               size: modalInfo.size
            };
            console.log(newProduct);

            await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/products`, newProduct);
            setShowModal(false);
         }
      } catch (err) {
         console.log(err);
      }
   }

   useEffect(() => {
      handleFetchData()
   }, [handleFetchData])


   console.log(modalInfo);
   return (
      <div>
         <form onSubmit={handleSubmit}>
            <Modal
               show={showModal}
               setShow={closeModalAndResetInfo}
            >
               <ModalHeader>
                  <h2>{headerLabel}</h2>
               </ModalHeader>
               <ModalBody>
                  <div style={{ maxHeight: '60vh', overflowY: 'scroll' }}>
                     {formValue.map((item, index) => {
                        return (
                           <div key={index} >
                              <label htmlFor={item.name}>{item.label}</label>
                              <input value={values[item.name]} onChange={handleChange} type="text" id={item.name} name={item.name} placeholder={modalInfo[item.name]} />
                           </div>
                        )
                     })}
                     <label htmlFor="colors">Colors</label>
                     {colors.map((item, index) => {
                        return (
                           <table key={index} >
                              <tbody>
                                 <tr >
                                    <td style={{ width: '25%' }}>
                                       <label htmlFor={item.color}>{item.display}</label>
                                    </td>
                                    <td style={{ width: '25%' }}>
                                       <input value={item.color} type="checkbox" id={item._id} key={index} name={item.color} checked={(modalInfo.colors.findIndex(color => color === item.color)) !== -1} onChange={() => handleColorCheckboxChange(item.color)} />
                                       <p></p>
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        )
                     })}
                     <label htmlFor="sizes">Sizes</label>
                     {sizes.map((item, index) => {
                        return (
                           <table key={index} >
                              <tbody>
                                 <tr >
                                    <td style={{ width: '25%' }}>
                                       <label htmlFor={item.size}>{item.display}</label>
                                    </td>
                                    <td style={{ width: '25%' }}>
                                       <input value={item.size} type="checkbox" id={item._id} key={index} name={item.size}
                                          checked={(modalInfo.size.findIndex(s => s === item.size)) !== -1} onChange={() => handleSizeCheckboxChange(item.size)}
                                       />
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        )
                     })}
                     {headerLabel === 'Edit/Delete' && (
                        <div>
                           <p>Product Images</p>
                           <img style={{ maxWidth: '100px', marginRight: "40px" }} src={modalInfo.image01} alt="anh san pham 1" />
                           <img style={{ maxWidth: '100px' }} src={modalInfo.image02} alt="anh san pham 2" />
                        </div>
                     )}
                     <label >Upload Images</label>
                     {/* Drag Drop */}
                     <DragDropFileInput setFile={setFile} />
                  </div>
               </ModalBody>
               <ModalFooter>
                  {headerLabel === 'Create' ?
                     (<>
                        <button className="button-6" type='button' onClick={handleCreate}>Create</button>
                     </>) :
                     (<>
                        <>
                           <Button
                              backgroundColor='orange'
                              icon="bx bxs-edit"
                              animate={true}
                           >
                              Edit
                           </Button>
                        </>
                        <>
                           <Button
                              backgroundColor='red'
                              icon="bx bxs-trash"
                              animate={true}
                           >
                              Delete
                           </Button>
                        </>
                     </>)
                  }
               </ModalFooter>
               <button className="modal__close" onClick={() => closeModalAndResetInfo()}>close</button>
            </Modal>
         </form>
         <h2>
            Customers
         </h2>
         <div onClick={handleChangeCreateLabel}>
            <Button
               backgroundColor='blue'
               icon="bx bx-plus"
               animate={true}
            >
               Create
            </Button>
         </div>
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
