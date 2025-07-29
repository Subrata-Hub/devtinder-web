import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Premium = () => {
  const [orderId, setOrderId] = useState("");
  const userData = useSelector((store) => store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const verifyPremiupUser = async () => {
    const res = await axios.get(BASE_URL + "/primium/verify", {
      withCredentials: true,
    });

    if (res?.data?.isPremium) {
      dispatch(addUser(res?.data));
      navigate(`/payment/complete-order/${orderId}`);
    }
  };

  const onCreateOrder = async (type) => {
    try {
      const res = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        {
          withCredentials: true,
        }
      );

      const order = await res.data.savedPayment;
      setOrderId(order.orderId);
      return order.orderId;
    } catch (error) {
      console.log(error);
    }
  };

  const onApproveOrder = async (orderId) => {
    try {
      await axios.post(
        BASE_URL + "/payment/capture",
        { orderId: orderId },
        { withCredentials: true }
      );

      verifyPremiupUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AfU5B86AcfjapQo1wyfXSnzZwdm3ahsprdmHhvLLoJk4oXZiEGpYYYw71PIDkJvdDmLcCKoc-6J9vT9G",
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

            <div className="w-80 ">
              <p className="text-2xl font-semibold text-blue-700 mb-4 text-center">
                INR 1500
              </p>
              {userData?.membershipType === "Silver" ? (
                <p className="text-center text-green-600 font-bold">
                  You already have Silver Membership!
                </p>
              ) : (
                <PayPalButtons
                  style={{ layout: "vertical", color: "blue" }}
                  createOrder={() => onCreateOrder("Silver")}
                  onApprove={() => onApproveOrder(orderId)}
                />
              )}
            </div>
          </div>
          <div className="divider divider-horizontal">OR</div>
          <div className="card bg-base-300 rounded-box grid h-100 grow place-items-center">
            <h1 className="font-bold text-3xl">Gold Membership</h1>
            <ul>
              <li> - Chat with other people</li>
              <li> - Infinite connection Requests per day</li>
              <li> - Blue Tick</li>
              <li> - 6 months</li>
            </ul>

            <div className="w-80">
              <p className="text-2xl text-center font-semibold text-blue-700 mb-4">
                INR 2000
              </p>
              {userData?.membershipType === "Gold" ? (
                <p className="text-center text-green-600 font-bold">
                  You already have Gold Membership!
                </p>
              ) : (
                <PayPalButtons
                  style={{ layout: "vertical", color: "blue" }}
                  createOrder={() => onCreateOrder("Gold")}
                  onApprove={() => onApproveOrder(orderId)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default Premium;
