import React, { useEffect, useState } from 'react';
import productApi from '../api/productApi.js';
import Grid from '../components/Grid.jsx';
import Helmet from '../components/Helmet.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ProductView from '../components/ProductView.jsx';
import Section, { SectionBody, SectionTitle } from '../components/Section.jsx';

const Product = (props) => {

   const [product, setProduct] = useState({
      "_id": "",
      "title": "",
      "description": "",
      "image01": "",
      "image02": "",
      "categorySlug": "",
      "slug": "",
      "price": 0,
      "discount": 0,
      "sold": 0,
      "colors": [],
      "size": [],
   })

   const [relatedProducts, setRelatedProduct] = useState([{
      "_id": "",
      "title": "",
      "description": "",
      "image01": "",
      "image02": "",
      "categorySlug": "",
      "slug": "",
      "price": 0,
      "discount": 0,
      "sold": 0,
      "colors": [],
      "size": [],
   }])

   useEffect(() => {
      // const product = productData.getProductBySlug(props.match.params.slug)
      const fetchProductList = async () => {
         try {
            const response = await productApi.getBySlug(props.match.params.slug);
            console.log('Fetch product by Slug successfully! ');
            setProduct(response);
         } catch (error) {
            console.log('Failed to fetch product list: ', error);
         }
      }

      fetchProductList();
   }, [props.match.params.slug])

   useEffect(() => {
      const fetchProductList = async () => {
         try {
            const response = await productApi.getByCategorySlug(product.categorySlug);
            console.log('Fetch realted products successfully: ', response);
            setRelatedProduct(response);
         } catch (error) {
            console.log('Failed realted products list: ', error);
         }
      }

      fetchProductList();
   }, [product])


   useEffect(() => {
      window.scroll({
         top: 0,
         left: 0,
         behavior: 'smooth'
      });
   }, [product])

   return (
      <Helmet title={product.title}>
         <Section>
            <SectionBody>
               <ProductView product={product} />
            </SectionBody>
         </Section>
         <Section>
            <SectionTitle>
               Khám phá thêm
            </SectionTitle>
            <SectionBody>
               <Grid
                  col={4}
                  mdCol={2}
                  smCol={1}
                  gap={20}
               >
                  {
                     relatedProducts.map((item, idx) => {
                        return (
                           <ProductCard
                              key={idx}
                              img01={item.image01}
                              img02={item.image02}
                              name={item.title}
                              price={Number(item.price)}
                              slug={item._id}
                           />
                        )
                     })
                  }
               </Grid>
            </SectionBody>
         </Section>
      </Helmet>
   )
};

export default Product;
