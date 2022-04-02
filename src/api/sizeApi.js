import axiosClient from "./axiosClient.js";

class SizeApi {
   getAll = (params) => {
      const url = '/sizes';
      return axiosClient.get(url, {
         params
      });
   };
}

const sizeApi = new SizeApi();
export default sizeApi;