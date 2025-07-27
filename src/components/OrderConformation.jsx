// import React, { useEffect } from "react";
// import { BASE_URL } from "../utils/constants";
// import axios from "axios";

// const OrderConformation = () => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const token = urlParams.get("token");

//   const getPaymentCapture = async () => {
//     try {
//       if (token) {
//         const res = await axios.post(
//           BASE_URL + "/payment/capture",
//           { orderId: token },
//           { withCredentials: true }
//         );

//         console.log(res.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getPaymentCapture();
//   }, []);

//   return <div className="mt-20">Payment Successfull</div>;
// };

// export default OrderConformation;
