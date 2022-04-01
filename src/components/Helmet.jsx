import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

const Helmet = props => {

   document.title = 'Thời trang M2 - ' + props.title

   useEffect(() => {
      // Scroll to địa điểm cụ thể
      window.scroll({
         top: 0,
         left: 0,
         behavior: 'smooth'
      });
   }, [])

   return (
      <div>
         {props.children}
      </div>
   )
}

Helmet.propTypes = {
   title: PropTypes.string.isRequired
}

export default Helmet
