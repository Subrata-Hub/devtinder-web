/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { targetUserId } = useParams();

  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const firstName = user?.firstName;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + `/chat/${targetUserId}`, {
      withCredentials: true,
    });

    console.log(chat?.data?.messages);
    const chatMessages = chat?.data?.messages.map((msg) => {
      return {
        firstName: msg?.senderId?.firstName,
        text: msg?.text,
        lastName: msg?.senderId?.lastName,
      };
    });

    setMessages(chatMessages);
  };

  useEffect(() => {
    if (!targetUserId) return;
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId || !targetUserId) return;
    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName,
      userId,
      targetUserId,
    });

    socket.on("messageRecived", ({ firstName, lastName, text }) => {
      console.log(firstName + " " + text);
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };
  return (
    <div className="mt-20 w-3/4 mx-auto h-[70vh] border-2 border-gray-600 flex flex-col">
      <h1 className="p-5 border border-gray-600">Chat</h1>
      <div className="flex-1 overflow-y-scroll">
        {messages?.map((message, index) => (
          <div key={index}>
            <div
              className={`chat ${
                user.firstName === message.firstName ? "chat-start" : "chat-end"
              } `}
            >
              <div className="chat-header">
                {message.firstName} {message.lastName}
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">{message.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-5 border-t border-gray-600 w-full flex items-center gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        ></input>
        <button onClick={sendMessage} className="btn btn-secondary">
          send
        </button>
      </div>
    </div>
  );
};

export default Chat;
