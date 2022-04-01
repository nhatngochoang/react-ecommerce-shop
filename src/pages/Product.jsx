import React, { useEffect } from 'react';
import Helmet from '../components/Helmet.jsx';
import productData from '../assets/fake-data/products.js'
import Section from '../components/Section.jsx';
import { SectionBody } from '../components/Section.jsx';
import { SectionTitle } from '../components/Section.jsx';
import Grid from '../components/Grid.jsx';
import ProductCard from '../components/ProductCard.jsx';
import ProductView from '../components/ProductView.jsx';

const Product = (props) => {

   const product = productData.getProductBySlug(props.match.params.slug)

   const relatedProducts = productData.getProducts(8)

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
                              slug={item.slug}
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
