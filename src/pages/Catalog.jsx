import React, { useCallback, useEffect, useRef, useState } from 'react';
import categoryApi from '../api/categoryApi.js';
import colorApi from '../api/colorApi.js';
import productApi from '../api/productApi.js';
import sizeApi from '../api/sizeApi.js';
import Button from '../components/Button.jsx';
import CheckBox from '../components/CheckBox.jsx';
import Helmet from '../components/Helmet.jsx';
import InfinityList from '../components/InfinityList.jsx';

const productsState = [{
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

const categoryState = [
   {
      display: "",
      categorySlug: ""
   }
]

const colorState = [
   {
      display: "",
      color: ""
   }
]

const sizeState = [
   {
      display: "",
      size: ""
   }
]

const Catalog = () => {

   const [products, setProducts] = useState(productsState)

   const [category, setCategories] = useState(categoryState)
   const [colors, setColors] = useState(colorState)
   const [size, setSize] = useState(sizeState)

   const [tempState, setTempState] = useState(productsState)

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

   useEffect(() => {
      const fetchCategoryList = async () => {
         try {
            const response = await categoryApi.getAll();
            console.log('Fetch colors successfully: ', response);
            setCategories(response);
         } catch (error) {
            console.log('Failed to fetch color list: ', error);
         }
      }

      fetchCategoryList();
   }, []);
   useEffect(() => {
      const fetchColorList = async () => {
         try {
            const response = await colorApi.getAll();
            console.log('Fetch categories successfully: ', response);
            setColors(response);
         } catch (error) {
            console.log('Failed to fetch category list: ', error);
         }
      }

      fetchColorList();
   }, []);

   useEffect(() => {
      const fetchSizeList = async () => {
         try {
            const response = await sizeApi.getAll();
            console.log('Fetch sizes successfully: ', response);
            setSize(response);
         } catch (error) {
            console.log('Failed to fetch size list: ', error);
         }
      }

      fetchSizeList();
   }, []);

   useEffect(() => {
      const fetchProductList = async () => {
         try {
            const response = await productApi.getAll();
            setTempState(response)
         } catch (error) {
         }
      }

      fetchProductList();
   }, [])

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
         let temp = tempState

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
      [filter, tempState],
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
