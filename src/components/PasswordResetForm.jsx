import axios from "axios";
import React, { useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const PasswordResetForm = ({ verifiedEmail, setPasswordResetForm }) => {
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleContinueClick = async () => {
    const res = await axios.post(
      BASE_URL + "/password-reset",
      { emailId: verifiedEmail, password },
      { withCredentials: true }
    );

    dispatch(addUser(res?.data?.user));

    navigate("/");
  };

  return (
    <div>
      <div className="w-full h-15 flex items-center px-4 justify-between">
        <h1>Choose a new password</h1>
        <div
          className="w-10 h-10 rounded-full bg-slate-800 flex justify-center items-center"
          onClick={() => setPasswordResetForm(false)}
        >
          <HiMiniXMark />
        </div>
      </div>
      <div className="w-full h-0.5 bg-slate-800"></div>
      <div className="p-4">
        <p>
          Create a new password that is at least 6 characters long. A strong
          password has a combination of letters, digits and punctuation marks
        </p>
      </div>

      <div className="flex px-4  py-6">
        <input
          type="password"
          className="w-full h-12 border-2 border-slate-700 pl-4"
          placeholder="New Password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
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
    </div>
  );
};

export default PasswordResetForm;
