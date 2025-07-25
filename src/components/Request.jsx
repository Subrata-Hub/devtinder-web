/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Request = () => {
  const dispatch = useDispatch();
  const connectionRequest = useSelector((store) => store.request);

  const reviewRequest = async (status, requestId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.log(error);
    }
  };
  const fetchRequets = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequets();
  }, []);

  if (!connectionRequest) return;

  if (connectionRequest.length === 0)
    return (
      <h2 className="flex justify-center text-bold text-2xl pt-20 mb-[450px]">
        No connection request Found
      </h2>
    );

  return (
    <div className="mx-96 mt-20 flex flex-col">
      <h1 className=" flex justify-center text-bold text-2xl">
        Connection Request
      </h1>

      <div className="flex-grow overflow-y-scroll">
        {connectionRequest.map((request, index) => (
          <div
            key={index}
            className="flex justify-between bg-base-300 mt-6 p-4"
          >
            <div className="flex justify-between gap-6">
              <div className="w-20 h-20">
                <img
                  src={request?.fromUserId?.photoUrl}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h2 className="font-bold text-xl">
                  {request?.fromUserId?.firstName +
                    " " +
                    request?.fromUserId?.lastName}
                </h2>
                {request?.fromUserId?.age && request?.fromUserId?.gender && (
                  <p>
                    {request?.fromUserId?.age +
                      " " +
                      request?.fromUserId?.gender}
                  </p>
                )}
                <div className="line-clamp-2 max-w-[420px]">
                  {request?.fromUserId?.about}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-2">
              <button
                className="btn btn-primary"
                onClick={() => reviewRequest("rejected", request?._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => reviewRequest("accepted", request?._id)}
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Request;
