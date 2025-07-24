import React, { useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import PasswordResetForm from "./PasswordResetForm";

const CodeVerificationForm = ({ userData, setShowCodeVerificationForm }) => {
  const [code, setCode] = useState("");
  const [passwordResetForm, setPasswordResetForm] = useState(false);
  const [verifiedEmail, setVeriedEmail] = useState("");
  const handleContinueClick = async () => {
    const res = await axios.post(
      BASE_URL + "/recover/verify-code",
      { emailId: userData?.emailId, code },
      { withCredentials: true }
    );
    console.log(res);
    setVeriedEmail(res?.data?.emailId);
    setPasswordResetForm(true);
  };
  return (
    <div>
      {!passwordResetForm && (
        <>
          <div className="w-full h-15 flex items-center px-4 justify-between">
            <h1>Enter security code</h1>
            <div
              className="w-10 h-10 rounded-full bg-slate-800 flex justify-center items-center"
              onClick={() => setShowCodeVerificationForm(false)}
            >
              <HiMiniXMark />
            </div>
          </div>
          <div className="w-full h-0.5 bg-slate-800"></div>
          <div className="p-4">
            <p>
              Please check your emails for a message with your code. Your code
              is 6 numbers long.
            </p>
          </div>

          <div className="flex px-4 gap-4 py-6">
            <div>
              <input
                type="number"
                className="w-48 h-12 border-2 border-slate-700 pl-4"
                placeholder="Enter code"
                onChange={(e) => setCode(e.target.value)}
              ></input>
            </div>
            <div className="flex-col">
              <h2 className="text-[14px]">We sent your code to:</h2>
              <p className="text-[13px]">{userData?.emailId}</p>
            </div>
          </div>
          <div className="w-full h-0.5 bg-slate-800"></div>

          <div className="flex justify-between w-full h-15  items-center px-4 ">
            <button onClick={() => setShowCodeVerificationForm(false)}>
              Didn't get a code?
            </button>
            <button
              className="px-4 py-1.5 rounded-md bg-blue-600 "
              onClick={handleContinueClick}
            >
              Continue
            </button>
          </div>
        </>
      )}

      {passwordResetForm && (
        <PasswordResetForm
          verifiedEmail={verifiedEmail}
          setPasswordResetForm={setPasswordResetForm}
        />
      )}
    </div>
  );
};

export default CodeVerificationForm;
