import React, { useEffect, useState } from 'react';
import Helmet from '../components/Helmet.jsx';
import productData from '../assets/fake-data/products.js'
import Section from '../components/Section.jsx';
import { SectionBody } from '../components/Section.jsx';
import { SectionTitle } from '../components/Section.jsx';
import Grid from '../components/Grid.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ProductView from '../components/ProductView.jsx';
import productApi from '../api/productApi.js';

const Product = (props) => {

   // const product = productData.getProductBySlug(props.match.params.slug)
   // const relatedProducts = productData.getProducts(8)


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

   // const relatedProducts = product
   useEffect(() => {
      const fetchProductList = async () => {
         try {
            const response = await productApi.getBySlug(props.match.params.slug);
            console.log('Fetch product by Slug successfully: ', response);
            setProduct(response);
         } catch (error) {
            console.log('Failed to fetch product list: ', error);
         }
      }

      fetchProductList();
   }, [props.match.params.slug])


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
                  {/* {
                     relatedProducts.map((item, idx) => {
                        return (
                           <ProductCard
                              key={idx}
                              img01={item.image01}
                              img02={item.image02}
                              name={item.title}
                              price={Number(item.price)}
                              slug={item.slug}
                           />
                        )
                     })
                  } */}
               </Grid>
            </SectionBody>
         </Section>
      </Helmet>
   )
};

export default Product;
