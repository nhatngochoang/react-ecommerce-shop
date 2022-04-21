import axios from "axios";
import { AppConstant } from "../const/index.js";
import axiosClient from "./axiosClient.js";
import axiosJWT from "./axiosJWT.js";

class OrderApi {
   create = (data) => {
      const url = '/orders';
      return axiosClient.post(url, data);
   };
}

// const orderApi = new OrderApi();
const orderApi = {
   getOrders: async (accessToken) => {
      try {
         const url = `${AppConstant.BASE_URL}/orders`;
         // const res = await axios.get(url
         const res = await axiosJWT.get(url
            // , {
            //    headers: {
            //       token: `Bearer ${accessToken}`
            //    }
            // }
         )
         const data = await res.data
         return data
      } catch (error) {
         console.log(error);
      }
   },
   updateOrder: async (token, values, id) => {
      try {
         const url = `${AppConstant.BASE_URL}/orders/${id}`;
         // const res = await axios.get(url
         const res = await axiosJWT.put(url, values, {
            headers: {
               token: `Bearer ${token}`
            }
         })
         const data = await res.data
         return data
      } catch (error) {
         console.log(error);
      }
   },
   deleteOrder: async (accessToken, id) => {
      try {
         const url = `${AppConstant.BASE_URL}/orders/${id}`;
         const res = await axiosJWT.delete(url, {
            headers: {
               token: `Bearer ${accessToken}`
            }
         })
         const data = await res.data
         return data
      } catch (error) {
         console.log(error);
      }
   }
}
export default orderApi;