import React from 'react';
import Helmet from '../components/Helmet.jsx';
import HeroSlider from '../components/HeroSlider.jsx';
import Section, { SectionBody, SectionTitle } from '../components/Section.jsx'
import Grid from '../components/Grid.jsx';
import PolicyCard from '../components/PolicyCard.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { Link } from 'react-router-dom';

import heroSliderData from '../assets/fake-data/hero-slider.js';
import policy from '../assets/fake-data/policy.js';
import productData from '../assets/fake-data/products.js'

import banner from '../assets/images/banner.png'
const Home = () => {
   return (
      <Helmet title="Trang Chủ">
         {/* Hero slider Begin */}
         <HeroSlider
            data={heroSliderData}
            control={true}
            auto={true}
            timeOut={5000}
         />
         {/* Hero slider End */}
         {/* Policy Begin */}
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
         {/* Policy End */}
         {/* begin best selling section */}
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
                     productData.getProducts(4).map((item, index) => (
                        <ProductCard
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
         {/* end Best selling section */}
         {/* new arrival section */}
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
                     productData.getProducts(8).map((item, index) => (
                        <ProductCard
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

         {/* banner */}
         <Section>
            <SectionBody>
               <Link to="/catalog">
                  <img src={banner} alt="" />
               </Link>
            </SectionBody>
         </Section>
         {/* end banner */}

         {/* popular product section */}
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
                     productData.getProducts(12).map((item, index) => (
                        <ProductCard
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
