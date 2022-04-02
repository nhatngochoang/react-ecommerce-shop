import axiosClient from "./axiosClient.js";

class ColorApi {
   getAll = (params) => {
      const url = '/colors';
      return axiosClient.get(url, {
         params
      });
   };
}

const colorApi = new ColorApi();
export default colorApi;