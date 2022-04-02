import axiosClient from "./axiosClient.js";

class CategoryApi {
   getAll = (params) => {
      const url = '/categories';
      return axiosClient.get(url, {
         params
      });
   };
}

const categoryApi = new CategoryApi();
export default categoryApi;