import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ProductCard from './ProductCard.jsx'
import Grid from './Grid.jsx'


const InfinityList = props => {

   const perLoad = 6 // items each load

   const listRef = useRef(null)

   const [data, setData] = useState(props.data)

   const [load, setLoad] = useState(true)

   const [index, setIndex] = useState(0)

   useEffect(() => {
      setData(props.data.slice(0, perLoad))
      setIndex(1)
   }, [props.data])

   useEffect(() => {
      window.addEventListener("scroll", () => {
         if (listRef && listRef.current) {
            if (window.scrollY + window.innerHeight >= listRef.current.clientHeight + listRef.current.offsetTop + 200) {
               console.log("bottom reach") // đã kéo tới cuối trang
               setLoad(true)
            }
         }

      })
   }, [listRef])

   useEffect(() => {
      const getItems = () => {
         const pages = Math.floor(props.data.length / perLoad)
         const maxIndex = props.data.length % perLoad === 0 ? pages : pages + 1

         if (load && index <= maxIndex) {
            const start = perLoad * index
            const end = start + perLoad

            setData(data.concat(props.data.slice(start, end)))
            setIndex(index + 1)
         }
      }
      getItems()
      setLoad(false)
   }, [load, index, data, props.data])

   return (
      <div ref={listRef}>
         <Grid
            col={3}
            mdCol={2}
            smCol={1}
            gap={20}
         >
            {
               data.map((item, idx) => (
                  <ProductCard
                     key={idx}
                     img01={item.image01}
                     img02={item.image02}
                     name={item.title}
                     price={Number(item.price)}
                     slug={item.slug}
                  />
               ))
            }

         </Grid>
      </div>
   )
}

InfinityList.propTypes = {
   data: PropTypes.array.isRequired
}

export default InfinityList