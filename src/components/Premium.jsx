import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { redirect, useNavigate } from "react-router-dom";

const Premium = () => {
  const [orderId, setOrderId] = useState("");
  // const navigate = useNavigate();
  // const handleCreatePayment = async (type) => {
  //   const res = await axios.post(
  //     BASE_URL + "/payment/create",
  //     { membershipType: type },
  //     {
  //       withCredentials: true,
  //     }
  //   );

  //   // navigate(`${res?.data}`);

  //   window.location.replace(`${res?.data}`);

  //   // redirect(`${res?.data}`);

  //   console.log(res?.data);
  // };

  const onCreateOrder = async (type) => {
    try {
      const res = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        {
          withCredentials: true,
        }
      );

      console.log(res.data.savedPayment);

      const order = await res.data.savedPayment;
      setOrderId(order.orderId);
      return order.orderId;
    } catch (error) {
      console.log(error);
    }
  };

  const onApproveOrder = async (orderId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/payment/capture",
        { orderId: orderId },
        { withCredentials: true }
      );

      const details = res.data;
      alert(`Transaction completed by ${details.payer.name.given_name}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "Acbyi7Gt55eWZnbztJlqBpgpyh-4LzO50B8Y5E3l6DJdqZMeel9m7CvIVD_Idl2rV92qkxRyHlY1qaWt",
      }}
    >
      <div className="m-20">
        <div className="flex w-full">
          <div className="card bg-base-300 rounded-box grid h-100 grow place-items-center">
            <h1 className="font-bold text-3xl">Silver Membership</h1>
            <ul>
              <li> - Chat with other people</li>
              <li> - 100 connection Requests per day</li>
              <li> - Blue Tick</li>
              <li> - 3 months</li>
            </ul>

            {/* <button
              
              className="btn btn-secondary"
              onClick={() => handleCreatePayment("Silver")}
            >
              Buy Silver
            </button> */}

            <div className="w-80">
              <p className="text-2xl font-semibold text-blue-700 mb-4 text-center">
                INR 1500
              </p>
              <PayPalButtons
                style={{ layout: "vertical", color: "blue" }}
                createOrder={() => onCreateOrder("Silver")}
                onApprove={() => onApproveOrder(orderId)}
              />
            </div>
          </div>
          <div className="divider divider-horizontal">OR</div>
          <div className="card bg-base-300 rounded-box grid h-100 grow place-items-center">
            <h1 className="font-bold text-3xl">Gold Membership</h1>
            <ul>
              <li> - Chat with other people</li>
              <li> - Inifiniye connection Requests per day</li>
              <li> - Blue Tick</li>
              <li> - 6 months</li>
            </ul>
            {/* <button
              // onClick={() => handleBuyClick("gold")}
              onClick={() => handleCreatePayment("Gold")}
              className="btn btn-primary"
            >
              Buy Gold
            </button> */}

            <div className="w-80">
              <p className="text-2xl text-center font-semibold text-blue-700 mb-4">
                INR 2000
              </p>
              <PayPalButtons
                style={{ layout: "vertical", color: "blue" }}
                createOrder={() => onCreateOrder("Gold")}
                onApprove={() => onApproveOrder(orderId)}
              />
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default Premium;
