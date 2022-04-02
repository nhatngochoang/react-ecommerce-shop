import axiosClient from "./axiosClient.js";

class OrderApi {
   create = (data) => {
      const url = '/orders';
      return axiosClient.post(url, data);
   };
}

const orderApi = new OrderApi();
export default orderApi;