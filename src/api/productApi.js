import { AppConstant } from "../const/index.js";
import axiosClient from "./axiosClient.js";
import axiosJWT from "./axiosJWT.js";

// api/productApi.js
class ProductApi {
   getAll = (params) => {
      const url = `/products`;
      return axiosClient.get(url, {
         params
      });
   };

   getBySlug = (slug) => {
      const url = `/product/${slug}`
      return axiosClient.get(url)
   }

   getByCategorySlug = (categorySlug) => {
      const url = `/products/${categorySlug}`
      return axiosClient.get(url)
   }

   getProducts = async () => {
      const url = `${AppConstant.BASE_URL}/products`;
      return axiosJWT.get(url, {
      });
   };
}

const productApi = new ProductApi();
export default productApi;