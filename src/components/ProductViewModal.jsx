import React, { useEffect, useState } from 'react'

import ProductView from './ProductView.jsx'
import productData from '../assets/fake-data/products.js'
import Button from './Button.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { remove } from '../redux/product-modal/productModalSlice.js'

const ProductViewModal = props => {
   const productSlug = useSelector(state => state.productModal.value)

   const dispatch = useDispatch()

   const [product, setProduct] = useState(undefined)

   // const product = productData.getProductBySlug('quan-jean-phong-cach-18')

   useEffect(() => {
      const product = productData.getProductBySlug(productSlug)
      setProduct(product)
   }, [productSlug])
   return (
      <div className={`product-view__modal ${product === undefined ? '' : 'active'}`}>
         <div className="product-view__modal__content">
            <ProductView product={product} />
            <div className="product-view__modal__content__close">
               <Button
                  size="sm"
                  onClick={() => dispatch(remove())}
               >Đóng</Button>
            </div>
         </div>
      </div>
   )
}

ProductViewModal.propTypes = {}

export default ProductViewModal