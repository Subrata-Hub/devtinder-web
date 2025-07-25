import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import UserIdentyVerificationForm from "./UserIdentiVerificationForm";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginFrom, setIsLoginFrom] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showUserVerificationFrom, setShowUserVerificationForm] =
    useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log(res?.data);
      dispatch(addUser(res?.data));
      navigate("/");
      dispatch(addFeed(null));
    } catch (error) {
      setErrorMessage(error?.response?.data || "Something went wrong");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));

      navigate("/profile");
    } catch (error) {
      setErrorMessage(error?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center mt-36 mb-[130px]">
      <div className="card bg-base-300 w-[420px] shadow-sm">
        {!showUserVerificationFrom && (
          <div className="card-body w-96">
            <h2 className="card-title justify-center items-center">
              {isLoginFrom ? "LogIn" : "Signup"}
            </h2>
            <div className="">
              {!isLoginFrom && (
                <>
                  <label className="from-control w-full max-w-xs">
                    <div className="label">
                      <span className="lebel-text">Fast Name</span>
                    </div>
                    <input
                      type="text"
                      value={firstName}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setFirstName(e.target.value)}
                    ></input>
                  </label>
                  <label className="from-control w-full max-w-xs">
                    <div className="label">
                      <span className="lebel-text">Last Name</span>
                    </div>
                    <input
                      type="text"
                      value={lastName}
                      className="input input-bordered w-full max-w-xs"
                      onChange={(e) => setLastName(e.target.value)}
                    ></input>
                  </label>
                </>
              )}

              <label className="from-control w-full max-w-xs">
                <div className="label">
                  <span className="lebel-text">Email ID</span>
                </div>
                <input
                  type="text"
                  value={emailId}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setEmailId(e.target.value)}
                ></input>
              </label>
              <label className="from-control w-full max-w-xs">
                <div className="label mt-2">
                  <span className="lebel-text">Pasword</span>
                </div>
                <input
                  type="text"
                  value={password}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </label>
            </div>
            <div className="text-red-400">{errorMessage}</div>
            <div className="card-actions justify-center items-center">
              {isLoginFrom && (
                <button
                  className="btn btn-primary w-[98%]"
                  onClick={handleLogin}
                >
                  Login
                </button>
              )}
              {!isLoginFrom && (
                <button
                  className="btn btn-primary w-[95%] -ml-3"
                  onClick={handleSignup}
                >
                  SignUp
                </button>
              )}
            </div>
            <div className="flex justify-between items-center">
              <div
                className="cursor-pointer py-2"
                onClick={() => setIsLoginFrom(!isLoginFrom)}
              >
                {isLoginFrom
                  ? "New User? Sign Up Here"
                  : "Exting user logIn Here "}
              </div>
              {isLoginFrom && (
                <div onClick={() => setShowUserVerificationForm(true)}>
                  <p>Forgotten Password?</p>
                </div>
              )}
            </div>
          </div>
        )}

        {showUserVerificationFrom && (
          <UserIdentyVerificationForm
            setShowUserVerificationForm={setShowUserVerificationForm}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
