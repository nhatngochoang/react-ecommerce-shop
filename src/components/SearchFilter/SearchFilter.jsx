import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import './SearchFilter.css'
import ProductCard from '../ProductCard.jsx'

const initialState = {
   "_id": "", "title": "", "description": "", "image01": "", "image02": "", "categorySlug": '', "slug": '',
   price: 0, discount: 0, sold: 0, colors: [], size: []
}

export default function SearchFilter() {
   const [query, setQuery] = useState('')
   const [products, setProducts] = useState([initialState])

   const fetchData = useCallback(() => {
      const fetchData = async () => {
         if (query !== '') {
            const res = await axios.get(`
            ${process.env.REACT_APP_API_URL}/api/v1/products/search?title=${query}
            `)
            setProducts(res.data)
         } else {
            const res = await axios.get(`
            ${process.env.REACT_APP_API_URL}/api/v1/products
            `)
            setProducts(res.data)
         }
      }
      fetchData()
   }, [query])

   useEffect(() => {
      fetchData()
   }, [fetchData])

   const handleChange = (e) => {
      setQuery(e.target.value)
   }

   return (
      <>
         <div className="topnav__search" style={{ width: "25%" }}>
            <input type="text" placeholder='Search here...' onChange={handleChange} value={query} />
            <i className='bx bx-search'></i>
         </div>
         <br />
         <br />
         {products.length > 0 ? <h2>Có {products.length} sản phẩm được tìm thấy</h2> : <h2>Không có sản phẩm nào  được tìm thấy</h2>}
         <ul className="search-list">
            {
               Array(Math.ceil(products.length / 4)).fill(0).map((_, index) => (
                  <div key={index} className='row'>
                     {products.slice(index * 4, index * 4 + 4).map((item, index) => (
                        <li className="search-list-item" key={index}>
                           <ProductCard
                              key={index}
                              img01={item.image01}
                              img02={item.image02}
                              name={item.title}
                              price={Number(item.price)}
                              slug={item._id}
                              id={item._id}
                           />
                        </li>
                     ))}
                  </div>
               ))
            }

         </ul>
      </>

   )
}
