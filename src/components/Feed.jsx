/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import Spinner from "./Spinner";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const feed = useSelector((store) => store?.feed?.users);
  const availableUsers = useSelector((store) => store?.feed?.availableUsers);
  const dispatch = useDispatch();

  // let page = 1;

  const getFeedData = async () => {
    if (feed) return;
    try {
      setLoading(true);
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addFeed(res?.data));
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeedData();
  }, []);

  if (!feed) return;

  if (availableUsers === 0 && feed.length === 0)
    return (
      <h2 className="flex justify-center text-bold text-2xl pt-20">
        No user found
      </h2>
    );

  if (feed.length === 0 && loading) {
    return <Spinner loading={loading} />;
  }

  return (
    <div className="flex justify-center mt-28 z-20">
      {feed && feed?.length >= 1 && (
        <UserCard user={feed[0]} setLoading={setLoading} />
      )}
    </div>
  );
};

export default Feed;
