import React, { useState } from "react"
import styles from "../sass/components/OrderDetail.module.css"

const OrderDetail = ({ total, createOrder, onClose }) => {
   const [customer, setCustomer] = useState("");
   const [address, setAddress] = useState("");

   const handleClick = () => {
      createOrder({ customer, address, total, method: 0 });
   };

   return (
      <div className={styles.container}>
         <div className={styles.wrapper}>
            <h1 className={styles.title}>Vui lòng thanh toán {total}.000 đ sau khi nhận hàng!</h1>
            <div className={styles.item}>
               <label className={styles.label}>Họ và Tên</label>
               <input
                  placeholder="Enter name..."
                  type="text"
                  className={styles.input}
                  onChange={(e) => setCustomer(e.target.value)}
               />
            </div>
            <div className={styles.item}>
               <label className={styles.label}>Số Điện Thoại</label>
               <input
                  type="phone"
                  placeholder="Enter phone..."
                  className={styles.input}
               />
            </div>
            <div className={styles.item}>
               <label className={styles.label}>Địa Chỉ</label>
               <textarea
                  rows={5}
                  placeholder="Enter address..."
                  // @ts-ignore
                  type="text"
                  className={styles.textarea}
                  onChange={(e) => setAddress(e.target.value)}
               />
            </div>
            <button className={styles.button} onClick={handleClick}>
               Đặt Hàng
            </button>
            <button className={styles.buttonClose} onClick={onClose} >X</button>
         </div>
      </div>
   );
};
export default OrderDetail
