import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from './Button.jsx'
import numberWithCommas from '../utils/numberWithCommas.js'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addItem } from '../redux/shopping-cart/cartItemsSlide.js'
import { remove } from '../redux/product-modal/productModalSlice.js'

const ProductView = props => {
   const dispatch = useDispatch()

   let product = props.product

   if (product === undefined) product = {
      title: "",
      price: '',
      image01: null,
      image02: null,
      categorySlug: "",
      colors: [],
      slug: "",
      size: [],
      description: ""
   }

   const [previewImg, setPreviewImg] = useState(product.image01)

   const [descExpand, setDescExpand] = useState(false)

   const handleDescExpand = () => {
      setDescExpand(!descExpand)
   }
   const [color, setColor] = useState(undefined)
   const [size, setSize] = useState(undefined)

   const [quantity, setQuantity] = useState(0)

   const updateQuantity = (type) => {
      if (type === 'minus') {
         setQuantity(quantity + 1)
      }
   }

   const check = () => {

      if (color === undefined) {
         alert('Vui lòng chọn màu sắc')
         return false
      }
      if (size === undefined) {
         alert('Vui lòng chọn kích thước')
         return false
      }
      return true
   }

   const addToCart = () => {
      if (check()) {
         let newItem = {
            slug: product.slug,
            color: color,
            size: size,
            price: product.price,
            quantity: quantity
         }
         if (dispatch(addItem(newItem))) {
            alert('Success')
         } else {
            alert('Fail')
         }
      }
   }

   const goToCart = () => {
      if (check()) {
         let newItem = {
            slug: product.slug,
            color: color,
            size: size,
            price: product.price,
            quantity: quantity
         }
         if (dispatch(addItem(newItem))) {
            dispatch(remove())
            props.history.push('/cart')
         } else {
            alert('Fail')
         }
      }
   }


   useEffect(() => {
      setPreviewImg(product.image01)
      setQuantity(1)
      setColor(undefined)
      setSize(undefined)
   }, [product])
   return (
      <div className="product">
         <div className="product__images">
            <div className="product__images__list">
               <div className="product__images__list__item"
                  onClick={() => setPreviewImg(product.image01)}
               >
                  <img src={product.image01} alt="" />
               </div>
               <div className="product__images__list__item"
                  onClick={() => setPreviewImg(product.image02)}
               >
                  <img src={product.image02} alt="" />
               </div>
            </div>
            <div className="product__images__main">
               <img src={previewImg} alt="" />
            </div>
            <div className={`product-description ${descExpand ? 'expand' : ''}`}>
               <div className="product-description__title">Chi tiết sản phẩm</div>
               <div className="product-description__content"
                  dangerouslySetInnerHTML={{ __html: product.description }}
               ></div>
               <div className="product-description__toggle">
                  <Button size="sm"
                     onClick={handleDescExpand}
                  >
                     {descExpand ? "Thu gọn" : 'Xem thêm'}
                  </Button>
               </div>
            </div>
         </div>
         <div className="product__info">
            <h1 className="product__info__title">{product.title}</h1>
            <div className="product__info__item">
               <span className="product__info__item__price">
                  {numberWithCommas(product.price)}
               </span>
            </div>
            <div className="product__info__item">
               <div className="product__info__item__title">
                  Màu sắc
               </div>
               <div className="product__info__item__list">
                  {product.colors.map((item, idx) => {
                     return (
                        <div key={idx} className={`product__info__item__list__item ${color === item ? 'active' : ''}`}
                           onClick={() => setColor(item)}
                        >
                           <div className={`circle bg-${item}`}></div>
                        </div>
                     )
                  })}
               </div>
            </div>
            <div className="product__info__item">
               <div className="product__info__item__title">
                  Kích cỡ
               </div>
               <div className="product__info__item__list">
                  {product.size.map((item, idx) => {
                     return (
                        <div key={idx} className={`product__info__item__list__item ${size === item ? 'active' : ''}`}
                           onClick={() => setSize(item)}
                        >
                           <span className="product__info__item__list__item__size">{item}</span>
                        </div>
                     )
                  })}
               </div>
            </div>
            <div className="product__info__item">
               <div className="product__info__item__title">
                  Số lượng
               </div>
               <div className="product__info__item__quantity">
                  <div className="product__info__item__quantity__btn"
                     onClick={quantity > 0 ? () => setQuantity(quantity - 1) : null}
                  >
                     <i className="bx bx-minus"></i>
                  </div>
                  <div className="product__info__item__quantity__input">
                     {quantity}
                  </div>
                  <div className="product__info__item__quantity__btn"
                     onClick={() => updateQuantity('minus')}
                  >
                     <i className="bx bx-plus"></i>
                  </div>
               </div>
            </div>
            <div className="product__info__item">
               <Button
                  onClick={addToCart}
               >Thêm vào giỏ hàng</Button>
               <Button
                  onClick={() => goToCart()}
               >Mua ngay</Button>
            </div>
         </div>
      </div>
   )
}

ProductView.propTypes = {
   product: PropTypes.object
}

export default withRouter(ProductView)