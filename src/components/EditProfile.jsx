import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { HiChevronDown } from "react-icons/hi2";
import { HiChevronUp } from "react-icons/hi2";
import AdditionalDetails from "./AdditionalDetails";

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
  const [showGenderOptions, setShowGenderOptios] = useState(false);
  const [showAdditonalPopup, setShowAdditonalPopup] = useState(false);

  const genders = ["male", "female", "others"];

  const { city } = useSelector((store) => store.user);

  const openGederOptions = () => {
    setShowGenderOptios(!showGenderOptions);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const newFromData = new FormData();
      newFromData.append("file", file);
      newFromData.append("upload_preset", "tindervibeupload");

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/duvvksw0w/image/upload",
          newFromData
        );
        const originalUploadedUrl = res.data.secure_url;
        const uploadIndex = originalUploadedUrl.indexOf("/upload/");
        let transformedUrl = originalUploadedUrl;

        if (uploadIndex !== -1) {
          const baseUrl = originalUploadedUrl.substring(
            0,
            uploadIndex + "/upload/".length
          );
          const pathAfterUpload = originalUploadedUrl.substring(
            uploadIndex + "/upload/".length
          );
          const transformations = "c_fill,h_320,w_384,g_auto";
          transformedUrl = `${baseUrl}${transformations}/${pathAfterUpload}`;
        }
        setPhotoUrl(transformedUrl);
      } catch (err) {
        console.error("Upload failed:", err);
        setError("Image upload failed. Please try again.");
      }
    }
  };

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);

        navigate("/");
      }, 2000);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="flex justify-center gap-4 mt-[70px]">
      <div className="flex justify-center">
        {/* --- MODIFICATION START --- */}
        {/* 1. Set a max-height and make the card a vertical flex container */}
        <div className="card bg-base-300 w-96 shadow-sm flex flex-col max-h-[90vh]">
          {/* 2. Create a sticky header */}
          <div className="px-4 py-2 border-b border-base-200">
            <h2 className="text-2xl font-semibold text-center">Edit Profile</h2>
          </div>

          {/* 3. Create a scrollable content area that fills available space */}
          <div className="card-body overflow-y-auto flex-grow">
            <div className="">
              {" "}
              {/* Your original form container */}
              <label className="from-control w-full max-w-xs">
                <div className="label mb-1">
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
                <div className="label mt-2 mb-1">
                  <span className="lebel-text">Last Name</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                ></input>
              </label>
              <label className="form-control w-full max-w-xs flex flex-col">
                <div className="label mt-2 mb-1">
                  <span className="label-text">Upload Profile Photo:</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    name="profile-picture-upload"
                    accept="image/*"
                    className="file-input file-input-bordered file-input-sm w-full max-w-xs rounded-lg h-10"
                    onChange={handleFileChange}
                  />
                </div>
              </label>
              <label className="from-control w-full max-w-xs">
                <div className="label mt-2 mb-1">
                  <span className="lebel-text">Age:</span>
                </div>
                <input
                  type="text"
                  value={age}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAge(e.target.value)}
                ></input>
              </label>
              <div className="label mt-2 mb-1">
                <span className="lebel-text">Gender</span>
              </div>
              <div
                className="w-full h-10 border-2 border-slate-600 flex justify-between items-center px-2 cursor-pointer"
                onClick={openGederOptions}
              >
                <h2> {gender ? gender : "Select Gender"}</h2>
                {!showGenderOptions ? <HiChevronDown /> : <HiChevronUp />}
              </div>
              {showGenderOptions && (
                <div className="w-40 h-auto p-2 bg-slate-800 mt-1">
                  {genders.map((gender, index) => (
                    <div key={index} className="flex justify-between gap-4">
                      <label htmlFor={gender}>{gender}</label>
                      <input
                        type="radio"
                        name="genders"
                        id={gender}
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      ></input>
                    </div>
                  ))}
                </div>
              )}
              <label className="from-control w-full max-w-xs">
                <div className="label mt-2 mb-1">
                  <span className="lebel-text">About:</span>
                </div>
                <textarea
                  type="text"
                  value={about}
                  className="border-2 border-slate-700 bg-base-100 p-2 "
                  rows="3"
                  cols="45"
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </label>
              <div className="label mt-1 mb-1">
                <span className="lebel-text">Additional Info</span>
              </div>
              <div
                className="w-full h-10 border-2 border-slate-600 flex justify-between items-center px-2 cursor-pointer"
                onClick={() => setShowAdditonalPopup(true)}
              >
                Add Aditional Information
              </div>
              {showAdditonalPopup && (
                <AdditionalDetails
                  setShowAdditonalPopup={setShowAdditonalPopup}
                  user={user}
                />
              )}
            </div>
          </div>

          {/* 4. Create a sticky footer */}
          <div className="p-4 border-t border-base-200">
            {error && (
              <div className="text-red-400 w-full text-center pb-2">
                {error}
              </div>
            )}
            <div className="card-actions justify-center items-center w-full">
              <button className="btn btn-primary w-full" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
          {/* --- MODIFICATION END --- */}
        </div>
      </div>

      <div className="mt-[60px]">
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about, city }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center mt-15">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
