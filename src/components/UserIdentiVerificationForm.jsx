import axios from "axios";
import React, { useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { BASE_URL } from "../utils/constants";
import AccoundRecover from "./AccoundRecover";

const UserIdentyVerificationForm = ({ setShowUserVerificationForm }) => {
  const [emailId, setEmailId] = useState("");
  const [userData, setUserData] = useState("");
  const [showAccountRecovery, setShowAccountRecovery] = useState(false);

  const handleSubmit = async () => {
    const res = await axios.post(
      BASE_URL + "/findAccoundbyemail",
      { emailId },
      { withCredentials: true }
    );
    setUserData(res?.data);
    setShowAccountRecovery(true);
  };
  return (
    <div className="flex flex-col">
      {!showAccountRecovery && (
        <>
          <div className="w-full h-15 flex items-center px-4 justify-between">
            <h1>Find your Account</h1>
            <div
              className="w-10 h-10 rounded-full bg-slate-800 flex justify-center items-center"
              onClick={() => setShowUserVerificationForm(false)}
            >
              <HiMiniXMark />
            </div>
          </div>
          <div className="w-full h-0.5 bg-slate-800"></div>
          <div className="p-4">
            <p>Please enter your email address to search for your account.</p>
          </div>
          <div className="p-4 w-full">
            <input
              type="email"
              value={emailId}
              className="input input-bordered w-full"
              onChange={(e) => setEmailId(e.target.value)}
            ></input>
          </div>
          <div className="w-full h-0.5 bg-slate-800"></div>

          <div className="flex justify-end w-full h-15  items-center px-4 ">
            <button
              className="px-4 py-1.5 rounded-md bg-blue-600 "
              onClick={handleSubmit}
            >
              Search
            </button>
          </div>
        </>
      )}

      {showAccountRecovery && (
        <AccoundRecover
          userData={userData}
          setShowAccountRecovery={setShowAccountRecovery}
        />
      )}
    </div>
  );
};

export default UserIdentyVerificationForm;
