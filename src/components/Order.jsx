import React, { useEffect, useState } from "react"
import styles from "../sass/components/Order.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
const paidImg = require("../assets/images/img/paid.png")

const checkedImg = require("../assets/images/img/checked.png")
const bakeImg = require("../assets/images/img/bake.png")
const bikeImg = require("../assets/images/img/bike.png")
const deliveredImg = require("../assets/images/img/delivered.png")

const orderState = {
   "_id": "",
   "customer": "",
   "address": "",
   "total": 0,
   "status": 0,
   "method": 0,
}


function Order(props) {
   const { id } = useParams();
   console.log(id)

   const [order, setOrder] = useState(orderState)

   useEffect(() => {
      const fetchOrderByID = async () => {
         const res = await axios.get(`http://localhost:4000/api/orders/${props.match.params.id}`);
         console.log(res);
         setOrder(res.data)
      }

      fetchOrderByID()

   }, [props])

   const status = order.status;

   const statusClass = (index) => {
      if (index - status < 1) return styles.done;
      if (index - status === 1) return styles.inProgress;
      if (index - status > 1) return styles.undone;
   };
   return (
      <>
         <h1 style={{ margin: "40px 0px" }}>Chi tiết đơn hàng</h1>
         <div className={styles.container}>
            <div className={styles.left}>
               <div className={styles.row}>
                  <table className={styles.table}>
                     <thead>
                        <tr className={styles.trTitle}>
                           <th>Mã đơn hàng</th>
                           <th>Khách hàng</th>
                           <th>Địa chỉ</th>
                           <th>Tổng</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr className={styles.tr}>
                           <td>
                              <span className={styles.id}>{`${order._id.slice(0, 3)}${"x".repeat(19)}`}</span>
                           </td>
                           <td>
                              <span className={styles.name}>{order.customer}</span>
                           </td>
                           <td>
                              <span className={styles.address}>{order.address}</span>
                           </td>
                           <td>
                              <span className={styles.total}>{order.total}.000 đ</span>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
               <h2 style={{ margin: "40px 0px" }}>Tình trạng đơn hàng</h2>
               <div className={styles.row}>
                  <div className={statusClass(0)}>
                     <img src={paidImg} style={{ width: '30px', height: '30px' }} alt="" />
                     <span>Đã thanh toán</span>
                     <div className={styles.checkedIcon}>
                        <img
                           className={styles.checkedIcon}
                           src={checkedImg}
                           style={{ width: '20px', height: '20px' }}
                           alt=""
                        />
                     </div>
                  </div>
                  <div className={statusClass(1)}>
                     <img src={bakeImg} style={{ width: '30px', height: '30px' }} alt="" />
                     <span>Đang chuẩn bị</span>
                     <div className={styles.checkedIcon}>
                        <img
                           className={styles.checkedIcon}
                           src={checkedImg}
                           style={{ width: '20px', height: '20px' }}
                           alt=""
                        />
                     </div>
                  </div>
                  <div className={statusClass(2)}>
                     <img src={bikeImg} style={{ width: '30px', height: '30px' }} alt="" />
                     <span>Đang giao hàng</span>
                     <div className={styles.checkedIcon}>
                        <img
                           className={styles.checkedIcon}
                           src={checkedImg}
                           style={{ width: '20px', height: '20px' }}
                           alt=""
                        />
                     </div>
                  </div>
                  <div className={statusClass(3)}>
                     <img src={deliveredImg} style={{ width: '30px', height: '30px' }} alt="" />
                     <span>Đã giao</span>
                     <div className={styles.checkedIcon}>
                        <img
                           className={styles.checkedIcon}
                           src={checkedImg}
                           style={{ width: '20px', height: '20px' }}
                           alt=""
                        />
                     </div>
                  </div>
               </div>
            </div>
            <div className={styles.right}>
               <div className={styles.wrapper}>
                  <h2 className={styles.title}>THÀNH TIỀN</h2>
                  <div className={styles.totalText}>
                     <b className={styles.totalTextTitle}>Tạm tính:</b>{order.total}.000 đ
                  </div>
                  <div className={styles.totalText}>
                     <b className={styles.totalTextTitle}>Giảm giá:</b>0 đ
                  </div>
                  <div className={styles.totalText}>
                     <b className={styles.totalTextTitle}>Tổng:</b>{order.total}.000 đ
                  </div>
                  <button disabled className={styles.button}>
                     ĐÃ THANH TOÁN
                  </button>
               </div>
            </div>
         </div>
      </>
   );
}

export default Order 
