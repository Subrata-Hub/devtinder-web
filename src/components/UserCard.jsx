import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";

const UserCard = ({ user, setLoading }) => {
  const [page, setPage] = useState(1);
  const feed = useSelector((store) => store?.feed?.users);
  const availableUsers = useSelector((store) => store?.feed?.availableUsers);

  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
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
      <figure className="h-80">
        <img src={photoUrl} alt="Photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <div>{about}</div>
        <div className="card-actions flex justify-between">
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
