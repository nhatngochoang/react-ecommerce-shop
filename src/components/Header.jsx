import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.webp';

const mainNav = [
   {
      display: "Trang chủ",
      path: "/"
   },
   {
      display: "Sản phẩm",
      path: "/catalog"
   },
   {
      display: "Phụ kiện",
      path: "/accessories"
   },
   {
      display: "Liên hệ",
      path: "/contact"
   }
]

const Header = ({ handleAuth }) => {
   const { pathname } = useLocation()
   const activeNav = mainNav.findIndex(e => e.path === pathname) // when an nav item is Clicked, add active Class

   // Listen Scroll Event
   const headerRef = useRef(null)
   useEffect(() => {
      window.addEventListener("scroll", handleScroll())
      return () => {
         window.removeEventListener("scroll", handleScroll())
      };

      function handleScroll() {
         return () => {
            if (headerRef && headerRef.current) {
               if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                  headerRef.current.classList.add('shrink');
               } else {
                  headerRef.current.classList.remove('shrink');
               }
            }
         };
      }
   }, []);

   // Toggle Menu Left
   const menuLeft = useRef(null)
   const menuToggle = () => menuLeft.current.classList.toggle('active')

   const cartItems = useSelector((state) => state.cartItems.value)



   return (
      <div className="header" ref={headerRef}>
         <div className="container">
            <div className="header__logo">
               <Link to="/">
                  <img src={logo} alt="" />
               </Link>
            </div>
            <div className="header__menu">
               <div
                  className="header__menu__mobile-toggle"
                  onClick={menuToggle}
               >
                  <i className='bx bx-menu-alt-left' ></i>
               </div>
               <div className="header__menu__left" ref={menuLeft}>
                  <div
                     className="header__menu__left__close"
                     onClick={menuToggle}
                  >
                     <i className='bx bx-chevron-left'></i>
                  </div>
                  {
                     mainNav.map((item, index) => (
                        <div
                           key={index}
                           className={`header__menu__item header__menu__left__item ${index === activeNav ? 'active' : ''}`}
                           onClick={menuToggle}
                        >
                           <Link to={item.path}>
                              <span>{item.display}</span>
                           </Link>
                        </div>
                     ))
                  }
               </div>
               <div className="header__menu__right">
                  <div className="header__menu__item header__menu__right__item">
                     <i className="bx bx-search"></i>
                  </div>
                  <div className="header__menu__item header__menu__right__item">
                     <Link to="/cart" className="cart-drawer flex v-center">
                        <svg viewBox="0 0 26.6 25.6" className="m2-svg-icon navbar__link-icon icon-shopping-cart-2"><polyline fill="none" points="2 1.7 5.5 1.7 9.6 18.3 21.2 18.3 24.6 6.1 7 6.1" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2.5"></polyline><circle cx="10.7" cy="23" r="2.2" stroke="none"></circle><circle cx="19.7" cy="23" r="2.2" stroke="none"></circle></svg>
                        <div className={`m2-cart-number-badge ${cartItems.length === 0 ? 'hidden' : ''}`}

                        >
                           {cartItems.length}
                        </div>
                     </Link>
                  </div>
                  <div className="header__menu__item header__menu__right__item"
                     style={{ marginLeft: 0 }}>
                     <Link to="/signin" onClick={handleAuth}>
                        <i className="bx bx-user"></i>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
};

export default Header;
