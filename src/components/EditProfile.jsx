import React, { useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        navigate("/");
      }, 1000);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="flex justify-center gap-4 mt-28">
      <div className="flex justify-center ">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title justify-center items-center">
              Edit Profile
            </h2>
            <div className="">
              <label className="from-control w-full max-w-xs">
                <div className="label">
                  <span className="lebel-text">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                ></input>
              </label>
              <label className="from-control w-full max-w-xs">
                <div className="label mt-2">
                  <span className="lebel-text">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
              </label>
              <label className="from-control w-full max-w-xs">
                <div className="label mt-2">
                  <span className="lebel-text">Photo Url:</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                ></input>
              </label>
              <label className="from-control w-full max-w-xs">
                <div className="label mt-2">
                  <span className="lebel-text">Age:</span>
                </div>
                <input
                  type="text"
                  value={age}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAge(e.target.value)}
                ></input>
              </label>
              <label className="from-control w-full max-w-xs">
                <div className="label mt-2">
                  <span className="lebel-text">Gender</span>
                </div>
                <input
                  type="text"
                  value={gender}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setGender(e.target.value)}
                ></input>
              </label>
              <label className="from-control w-full max-w-xs">
                <div className="label mt-2">
                  <span className="lebel-text">About:</span>
                </div>
                <input
                  type="text"
                  value={about}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAbout(e.target.value)}
                ></input>
              </label>
            </div>
            <div className="text-red-400">{error}</div>
            <div className="card-actions justify-center items-center">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
