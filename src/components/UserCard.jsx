import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";
import { HiOutlineMapPin } from "react-icons/hi2";

const UserCard = ({ user, setLoading }) => {
  const [page, setPage] = useState(1);
  const feed = useSelector((store) => store?.feed?.users);
  const availableUsers = useSelector((store) => store?.feed?.availableUsers);

  const { _id, firstName, lastName, photoUrl, age, gender, about, city } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed({ availableUsers, _id }));

      if (feed.length === 1) {
        setLoading(true);
        const res = await axios.get(BASE_URL + `/feed?page=${page}&limit=10`, {
          withCredentials: true,
        });

        console.log(`nextpageData: ${res}`);
        dispatch(addFeed(res?.data));
        setPage(page + 1);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="h-80 w-[380px">
        <img
          src={photoUrl}
          alt="Photo"
          className="h-80 w-[380px] object-contain"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && (
          <div className="flex justify-between items-center">
            <div> {age + ", " + gender}</div>
            <div className="flex justify-between items-center gap-2">
              {city && (
                <>
                  <HiOutlineMapPin />
                  <div>{city}</div>
                </>
              )}
            </div>
          </div>
        )}
        <div className="line-clamp-3">{about}</div>
        <div className="card-actions flex justify-between mt-3">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignored
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
