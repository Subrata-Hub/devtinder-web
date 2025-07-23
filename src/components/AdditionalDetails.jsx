import { useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

import { BASE_URL } from "../utils/constants";
import axios from "axios";

const AdditionalDetails = ({ setShowAdditonalPopup, user }) => {
  const [location, setLocation] = useState(user?.location || "");
  const [city, setCity] = useState(user?.city || "");
  const [skills, setSkills] = useState(user.skills || []);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || "");
  const [alternativeEmail, setAlternativeEmail] = useState(
    user.alternativeEmail || ""
  );
  const [brithday, setBrithday] = useState(user?.brithday || "");
  const [hobbies, setHobbies] = useState(user.hobbies || []);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const [showToast, setShowToast] = useState(false);
  const [addSkill, setAddSkill] = useState("");
  const [addHobbies, setAddHobbies] = useState("");

  const handleAddSkillChange = (e) => {
    setAddSkill(e.target.value.toLocaleLowerCase());
  };

  const handleAddSkillSubmit = (e) => {
    if (e.key === "Enter" && addSkill.trim() !== "") {
      setSkills([...skills, addSkill.trim()]);
      setAddSkill("");
    }
  };

  const handleAddHobbiesChange = (e) => {
    setAddHobbies(e.target.value.toLocaleLowerCase());
  };

  const handleAddHobbiesSubmit = (e) => {
    if (e.key === "Enter" && addHobbies.trim() !== "") {
      setHobbies([...hobbies, addHobbies.trim()]);
      setAddHobbies("");
    }
  };

  const removeSkill = (skillToRemove) => {
    const skillsArray = skills.filter((skill) => skill !== skillToRemove);
    setSkills(skillsArray);
  };

  const removeHobbies = (hobbieToRemove) => {
    const hobbiesArray = hobbies.filter((hobbie) => hobbie !== hobbieToRemove);
    setHobbies(hobbiesArray);
  };

  const saveProfile = async () => {
    setError("");

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          location,
          city,
          skills,
          phoneNumber,
          alternativeEmail,
          brithday,
          hobbies,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        setShowAdditonalPopup(false);
      }, 1000);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="w-[600px] h-[500px] fixed bg-slate-800 border-4 border-slate-600 top-16 left-[500px] z-[2000] flex flex-col">
      {/* Header - Always visible */}
      <div className="w-full h-10 p-4 text-[18px] flex-shrink-0 flex justify-between">
        <h2 className="font-semibold">Add Additional Information</h2>
        <div
          className="w-6 h-6 flex justify-center items-center rounded-full bg-amber-600"
          onClick={() => setShowAdditonalPopup(false)}
        >
          <HiMiniXMark />
        </div>
      </div>
      <div className="w-full h-0.5 mt-2 bg-slate-500 flex-shrink-0"></div>

      {/* Scrollable Content Area */}
      <div className="flex-grow overflow-y-scroll">
        <div className="p-4">
          <h2 className="text-[17px]">Location</h2>

          <div>
            <label className="from-control w-full max-w-xs">
              <div className="label mt-2 mb-1">
                <span className="lebel-text">Country/Region:</span>
              </div>
              <input
                type="text"
                value={location}
                className="input input-bordered w-full"
                onChange={(e) =>
                  setLocation(e.target.value.toLocaleLowerCase())
                }
              ></input>
            </label>

            <label className="from-control w-full max-w-xs">
              <div className="label mt-2 mb-1">
                <span className="lebel-text">City:</span>
              </div>
              <input
                type="text"
                value={city}
                className="input input-bordered w-full"
                onChange={(e) => setCity(e.target.value)}
              ></input>
            </label>
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-[17px]">Skills</h2>

          <label className="from-control w-full max-w-xs">
            <div className="label mt-2 mb-1">
              <span className="lebel-text">skill:</span>
            </div>
            <input
              type="text"
              value={addSkill}
              className="input input-bordered w-full"
              onChange={handleAddSkillChange}
              onKeyDown={handleAddSkillSubmit}
              placeholder="Type a skill and press Enter"
            ></input>
          </label>

          <div className="mt-3 w-full min-h-[100px] px-2 py-2 bg-slate-900">
            <h2 className="p-2">Your Skills</h2>
            <div className="flex flex-wrap shrink-0 gap-3">
              {skills.length === 0 ? (
                <p className="text-gray-400 text-sm p-2">
                  No skills added yet.
                </p>
              ) : (
                skills.map((skill, index) => (
                  <button
                    key={index}
                    className="w-auto py-2 px-3 rounded-xl bg-red-500 text-white" // Added text-white for visibility
                  >
                    <div className="flex justify-between items-center gap-2">
                      <p>{skill}</p>
                      <HiMiniXMark
                        className="cursor-pointer text-lg" // Added text-lg for better clickability
                        onClick={() => removeSkill(skill)}
                      />
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-[17px]">Hobbies</h2>

          <label className="from-control w-full max-w-xs">
            <div className="label mt-2 mb-1">
              <span className="lebel-text">hobbie:</span>
            </div>
            <input
              type="text"
              value={addHobbies}
              className="input input-bordered w-full"
              onChange={handleAddHobbiesChange}
              onKeyDown={handleAddHobbiesSubmit}
              placeholder="Type a skill and press Enter"
            ></input>
          </label>

          <div className="mt-3 w-full min-h-[100px] px-2 py-2 bg-slate-900">
            <h2 className="p-2">Your Hobbies</h2>
            <div className="flex flex-wrap shrink-0 gap-3">
              {hobbies.length === 0 ? (
                <p className="text-gray-400 text-sm p-2">
                  No hobbies added yet.
                </p>
              ) : (
                hobbies.map((hobbie, index) => (
                  <button
                    key={index}
                    className="w-auto py-2 px-3 rounded-xl bg-pink-600 text-white" // Added text-white for visibility
                  >
                    <div className="flex justify-between items-center gap-2">
                      <p>{hobbie}</p>
                      <HiMiniXMark
                        className="cursor-pointer text-lg" // Added text-lg for better clickability
                        onClick={() => removeHobbies(hobbie)}
                      />
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="p-4">
          <h2 className="text-[17px]">Contact info</h2>

          <label className="from-control w-full max-w-xs">
            <div className="label mt-2 mb-1">
              <span className="lebel-text">Phone number:</span>
            </div>
            <input
              type="text"
              value={phoneNumber}
              className="input input-bordered w-full"
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></input>
          </label>
          <label className="from-control w-full max-w-xs">
            <div className="label mt-2 mb-1">
              <span className="lebel-text">Alternative Email:</span>
            </div>
            <input
              type="text"
              value={alternativeEmail}
              className="input input-bordered w-full"
              onChange={(e) => setAlternativeEmail(e.target.value)}
            ></input>
          </label>
          <label className="from-control w-full max-w-xs">
            <div className="label mt-2 mb-1">
              <span className="lebel-text">Brithday:</span>
            </div>
            <input
              type="date"
              value={brithday}
              className="input input-bordered w-full"
              onChange={(e) => setBrithday(e.target.value)}
            ></input>
          </label>
        </div>
      </div>

      {/* Fixed Save Button */}
      <div className="w-full flex justify-end px-4 py-2 bg-slate-800 border-t-2 border-slate-600 flex-shrink-0">
        <div className="text-red-400 w-full">{error}</div>
        <button
          className="px-6 py-2 bg-amber-400 text-slate-900 font-semibold rounded-md hover:bg-amber-500 transition-colors"
          onClick={saveProfile}
        >
          Save
        </button>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center top-20">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdditionalDetails;
