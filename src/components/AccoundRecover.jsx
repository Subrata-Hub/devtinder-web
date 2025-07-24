import React, { useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import CodeVerificationForm from "./CodeVerificationForm";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const AccoundRecover = ({ userData, setShowAccountRecovery }) => {
  const [showCodeVerificationForm, setShowCodeVerificationForm] =
    useState(false);

  // const [code,setCode] = useState(code)

  const handleContinueClick = async () => {
    await axios.post(
      BASE_URL + "/recover",
      { emailId: userData?.emailId },
      { withCredentials: true }
    );
    setShowCodeVerificationForm(true);
  };
  return (
    <div>
      {!showCodeVerificationForm && (
        <>
          <div className="w-full h-15 flex items-center px-4 justify-between">
            <h1>Reset Your Password</h1>
            <div
              className="w-10 h-10 rounded-full bg-slate-800 flex justify-center items-center"
              onClick={() => setShowAccountRecovery(false)}
            >
              <HiMiniXMark />
            </div>
          </div>
          <div className="w-full h-0.5 bg-slate-800"></div>
          <div className="p-4">
            <p>How do you want to receive the code to reset your password?</p>
          </div>
          <div className="flex justify-between items-center px-4 py-6">
            <div className="flex flex-col">
              <h2 className="font-medium text-[15px]">Send code via email</h2>
              <p className="text-[13px]">{userData?.emailId}</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16">
                <img
                  src={userData?.photoUrl}
                  className="w-full h-full object-cover rounded-full"
                  alt="uiser-profile-picture"
                />
              </div>

              <h2 className="font-semibold text-[15px]">{`${userData?.firstName} ${userData?.lastName}`}</h2>
              <p className="text-[13px]">tinderVibe user</p>
            </div>
          </div>
          <div className="w-full h-0.5 bg-slate-800"></div>

          <div className="flex justify-end w-full h-15  items-center px-4 ">
            <button
              className="px-4 py-1.5 rounded-md bg-blue-600 "
              onClick={handleContinueClick}
            >
              Continue
            </button>
          </div>
        </>
      )}
      {showCodeVerificationForm && (
        <CodeVerificationForm
          userData={userData}
          setShowCodeVerificationForm={setShowCodeVerificationForm}
        />
      )}
    </div>
  );
};

export default AccoundRecover;
