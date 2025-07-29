/* eslint-disable react-hooks/exhaustive-deps */

import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";

const OrderConformation = () => {
  const [paymentDetailData, setPaymentDetailsData] = useState();

  const { orderId } = useParams();

  const getPaymentData = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/payment-successfull/detail",
        { orderId: orderId },
        { withCredentials: true }
      );

      console.log(res);
      setPaymentDetailsData(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPaymentData();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 lg:p-10 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <svg
            className="w-20 h-20 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>

        {/* Success Message */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-6 text-lg">
          Thank you for your purchase. Your membership has been updated.
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 p-4 rounded-md mb-8 border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">
            Order Summary
          </h3>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 font-medium">Order ID:</span>
            {/* <span className="text-gray-800 font-bold">{orderInfo.orderId}</span> */}
            <span className="text-gray-800 font-bold">{orderId}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 font-medium">Membership Type:</span>
            <span className="text-gray-800 font-bold capitalize">
              {paymentDetailData?.membershipType}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">Amount Paid:</span>
            <span className="text-green-600 font-bold text-xl">
              {paymentDetailData?.amound} {paymentDetailData?.currency_code}
            </span>
          </div>
        </div>

        {/* Call to Action */}
        <Link to="/">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Go to Feed
          </button>
        </Link>

        {/* Optional: Additional links */}
        <p className="mt-4 text-sm text-gray-500">
          You will receive a confirmation email shortly.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          <button
            // onClick={() => navigate('/contact')}
            className="text-blue-500 hover:underline"
          >
            Need help? Contact Support
          </button>
        </p>
      </div>
    </div>
  );
};

export default OrderConformation;
