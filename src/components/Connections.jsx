/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <h1 className="flex justify-center mt-20 text-bold text-2xl">
        No Connectios Found
      </h1>
    );

  return (
    <div className="mx-96 mt-20">
      <h1 className="flex justify-center text-bold text-2xl">Connectios</h1>

      {connections.map((connection) => (
        <div
          key={connection._id}
          className="flex justify-between items-center  bg-base-300"
        >
          <div className="flex  gap-6  mt-6 p-4">
            <div className="w-20 h-20">
              <img
                src={connection.photoUrl}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h2 className="font-bold text-xl">
                {connection?.firstName + " " + connection.lastName}
              </h2>
              {connection?.age && connection?.gender && (
                <p>{connection?.age + " " + connection?.gender}</p>
              )}
              <div className="line-clamp-2 max-w-[500px]">
                {connection?.about}
              </div>
            </div>
          </div>
          <Link to={`/chat/${connection._id}`}>
            <button className="btn btn-primary">Chat</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Connections;
