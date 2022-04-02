import React, { useCallback, useEffect, useRef, useState } from 'react';
import productApi from '../api/productApi.js';
import category from '../assets/fake-data/category.js';
import colors from '../assets/fake-data/product-color';
import size from '../assets/fake-data/product-size';
import Button from '../components/Button.jsx';
import CheckBox from '../components/CheckBox.jsx';
import Helmet from '../components/Helmet.jsx';
import InfinityList from '../components/InfinityList.jsx';

const initialState = [{
   "_id": "",
   "title": "",
   "description": "",
   "image01": "",
   "image02": "",
   "categorySlug": "",
   "slug": "",
   "price": 0,
   "discount": 0,
   "sold": 0,
   "colors": [],
   "size": [],
}]
const Catalog = () => {

   const [products, setProducts] = useState(initialState)

   useEffect(() => {
      const fetchProductList = async () => {
         try {
            const response = await productApi.getAll();
            console.log('Fetch products successfully: ', response);
            setProducts(response);
         } catch (error) {
            console.log('Failed to fetch product list: ', error);
         }
      }

      fetchProductList();
   }, []);

   const initFilter = {
      category: [],
      color: [],
      size: []
   }

   const [filter, setFilter] = useState(initFilter)

   // Filter Offline
   const filterSelect = (type, checked, item) => {
      if (checked) {
         switch (type) {
            case "CATEGORY":
               setFilter({
                  ...filter,
                  category: [...filter.category, item.categorySlug]
               })
               break
            case "COLOR":
               setFilter({ ...filter, color: [...filter.color, item.color] })
               break
            case "SIZE":
               setFilter({ ...filter, size: [...filter.size, item.size] })
               break
            default:
         }
      } else {
         switch (type) {
            case "CATEGORY":
               const newCategory = filter.category.filter(e => e !== item.categorySlug)
               setFilter({
                  ...filter,
                  category: newCategory
               })
               break
            case "COLOR":
               const newColor = filter.color.filter(e => e !== item.color)
               setFilter({ ...filter, color: newColor })
               break
            case "SIZE":
               const newSize = filter.size.filter(e => e !== item.size)
               setFilter({ ...filter, size: newSize })
               break
            default:
         }
      }
   }

   const clearFilter = () => {
      setFilter(initFilter)
   }

   const updateProducts = useCallback(
      () => {
         let temp = initialState

         if (filter.category.length > 0) {
            temp = temp.filter(e => filter.category.includes(e.categorySlug))
         }

         if (filter.color.length > 0) {
            temp = temp.filter(e => {
               const check = e.colors.find(color => filter.color.includes(color))
               return check !== undefined
            })
         }

         if (filter.size.length > 0) {
            temp = temp.filter(e => {
               const check = e.size.find(size => filter.size.includes(size))
               return check !== undefined
            })
         }

         setProducts(temp)
      },
      [filter],
   )

   useEffect(() => {
      updateProducts()
   }, [updateProducts])

   const filterRef = useRef(null)

   const showHideFilter = () => filterRef.current.classList.toggle('active')


   return (
      <Helmet title="Sản phấm">
         <div className="catalog">
            <div className="catalog__filter" ref={filterRef}>
               <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                  <i className="bx bx-left-arrow-alt"></i>
               </div>
               <div className="catalog__filter__widget">
                  <div className="catalog__filter__widget__title">Danh mục sản phẩm</div>
                  <div className="catalog__filter__widget__content">
                     {category.map((item, idx) => (
                        <div className="catalog__filter__widget__content__item" key={idx}>
                           <CheckBox
                              label={item.display}
                              onChange={(input) => filterSelect("CATEGORY", input.checked, item)}
                              checked={filter.category.includes(item.categorySlug)}
                           />
                        </div>
                     ))}
                  </div>
               </div>
               <div className="catalog__filter__widget">
                  <div className="catalog__filter__widget__title">Màu sắc</div>
                  <div className="catalog__filter__widget__content">
                     {colors.map((item, idx) => (
                        <div className="catalog__filter__widget__content__item" key={idx}>
                           <CheckBox
                              label={item.display}
                              onChange={(input) => filterSelect("COLOR", input.checked, item)}
                              checked={filter.color.includes(item.color)}
                           />
                        </div>
                     ))}
                  </div>
               </div>
               <div className="catalog__filter__widget">
                  <div className="catalog__filter__widget__title">Size</div>
                  <div className="catalog__filter__widget__content">
                     {size.map((item, idx) => (
                        <div className="catalog__filter__widget__content__item" key={idx}>
                           <CheckBox
                              label={item.display}
                              onChange={(input) => filterSelect("SIZE", input.checked, item)}
                              checked={filter.size.includes(item.size)}
                           />
                        </div>
                     ))}
                  </div>
               </div>
               <div className="catalog__filter__widget">
                  <div className="catalog__filter__widget__content">
                     <Button size="sm"
                        onClick={clearFilter}
                     >xóa bộ lọc</Button>
                  </div>
               </div>
            </div>
            <div className="catalog__filter__toggle">
               <Button size="sm" onClick={() => showHideFilter()}>bộ lọc</Button>
            </div>
            <div className="catalog__content">
               <InfinityList data={products} />
            </div>
         </div>
      </Helmet>
   )
};

export default Catalog;
