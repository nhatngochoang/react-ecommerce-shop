import React, { useCallback, useEffect, useState } from 'react';
import Helmet from '../components/Helmet.jsx';
import HeroSlider from '../components/HeroSlider.jsx';
import Section, { SectionBody, SectionTitle } from '../components/Section.jsx'
import Grid from '../components/Grid.jsx';
import PolicyCard from '../components/PolicyCard.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { Link } from 'react-router-dom';
import heroSliderData from '../assets/fake-data/hero-slider.js';
import policy from '../assets/fake-data/policy.js';
import banner from '../assets/images/banner.png'
import productApi from '../api/productApi.js';
import axios from 'axios';
// import productList from '../assets/fake-data/products.js'
// import ProductTest from '../components/ProductTest.jsx';

const initialState = {
   "_id": "", "title": "", "description": "", "image01": "", "image02": "", "categorySlug": '', "slug": '',
   price: 0, discount: 0, sold: 0, colors: [], size: []
}

const getProducts = (products, count) => {
   const max = products.length - count
   const min = 0
   const start = Math.floor(Math.random() * (max - min) + min)
   return products.slice(start, start + count)
}

const Home = () => {
   const [productList, setProductList] = useState([initialState])

   const handleFetchData = useCallback((props) => {
      const fetchData = async () => {
         try {
            const response = await productApi.getAll();
            setProductList(response);
            console.log("FETCH PRODUCT DATA : ", response);
         } catch (err) {
            console.log(err)
         }
      }
      fetchData()
   }, [])

   useEffect(() => {
      handleFetchData()
   }, [handleFetchData])

   return (
      <Helmet title="Trang Chủ">
         {/* <ProductTest /> */}
         {/* Begin Hero slider  */}
         <HeroSlider
            data={heroSliderData}
            control={true}
            auto={true}
            timeOut={5000}
         />
         {/* End Hero slider  */}


         {/* Begin Policy  */}
         <Section>
            <SectionBody>
               <Grid
                  col={4}
                  mdCol={2}
                  smCol={1}
                  gap={20}
               >
                  {
                     policy.map((item, index) => <Link key={index} to="/policy">
                        <PolicyCard
                           name={item.name}
                           description={item.description}
                           icon={item.icon}
                        />
                     </Link>)
                  }
               </Grid>
            </SectionBody>
         </Section>
         {/* End Policy  */}
         {/* <Link to="/whale?type=beluga">Beluga Whale</Link>
         <Link to="/whale?type=blue">Blue Whale</Link> */}
         {/* Begin best selling section */}
         <Section>
            <SectionTitle>
               top sản phẩm bán chạy trong tuần
            </SectionTitle>
            <SectionBody>
               <Grid
                  col={4}
                  mdCol={2}
                  smCol={1}
                  gap={20}
               >
                  {
                     getProducts(productList, 4).map((item, index) => (
                        <ProductCard
                           id={item._id}
                           key={index}
                           img01={item.image01}
                           img02={item.image02}
                           name={item.title}
                           price={Number(item.price)}
                           slug={item.slug}
                        />
                     ))
                  }
               </Grid>
            </SectionBody>
         </Section>
         {/* End best selling section */}
         {/* Begin new arrival section */}
         <Section>
            <SectionTitle>
               sản phẩm mới
            </SectionTitle>
            <SectionBody>
               <Grid
                  col={4}
                  mdCol={2}
                  smCol={1}
                  gap={20}
               >
                  {
                     getProducts(productList, 8).map((item, index) => (
                        <ProductCard
                           id={item._id}
                           key={index}
                           img01={item.image01}
                           img02={item.image02}
                           name={item.title}
                           price={Number(item.price)}
                           slug={item.slug}
                        />
                     ))
                  }
               </Grid>
            </SectionBody>
         </Section>
         {/* end new arrival section */}

         {/* Begin banner */}
         <Section>
            <SectionBody>
               <Link to="/catalog">
                  <img src={banner} alt="" />
               </Link>
            </SectionBody>
         </Section>
         {/* end banner */}

         {/* Begin popular product section */}
         <Section>
            <SectionTitle>
               phổ biến
            </SectionTitle>
            <SectionBody>
               <Grid
                  col={4}
                  mdCol={2}
                  smCol={1}
                  gap={20}
               >
                  {
                     getProducts(productList, 12).map((item, index) => (
                        <ProductCard
                           id={item._id}
                           key={index}
                           img01={item.image01}
                           img02={item.image02}
                           name={item.title}
                           price={Number(item.price)}
                           slug={item.slug}
                        />
                     ))
                  }
               </Grid>
            </SectionBody>
         </Section>
         {/* end popular product section */}
      </Helmet>
   );
};

export default Home;
