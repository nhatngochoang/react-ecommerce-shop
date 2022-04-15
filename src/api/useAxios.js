
import { useEffect, useState } from "react"
import axiosJWT from "./axiosJWT.js"

export const useAxios = (url) => {
   const [state, setState] = useState({
      data: null,
      loading: true
   })

   useEffect(() => {
      setState(prev => ({
         data: prev.data,
         loading: true
      }))
      async function getData() {
         const res = await axiosJWT.get(url)
         return res
      }
      getData().then(res => res.data)
         .then(data => setState({
            data,
            loading: false
         }))
      getData().catch(err => console.error(err))

   }, [url, setState])

   return state
}
