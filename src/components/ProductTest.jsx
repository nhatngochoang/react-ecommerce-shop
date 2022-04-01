const { useEffect, useState } = require("react");
const { default: productApi } = require("../api/productApi.js");

function ProductTest() {
   const [productList, setProductList] = useState([]);
   useEffect(() => {
      const fetchProductList = async () => {
         try {
            const params = {
               _page: 1,
               _limit: 10
            };
            const response = await productApi.getAll(params);
            console.log('Fetch products successfully: ', response);
            setProductList(response.data);
         } catch (error) {
            console.log('Failed to fetch product list: ', error);
         }
      }

      fetchProductList();
   }, []);

   return (
      <>
         <pre>
            {JSON.stringify(productList, null, 2)}
         </pre>
      </>
   );
}

export default ProductTest 