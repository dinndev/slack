import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "../../States/MessageContext";
import { FiMenu } from "react-icons/fi";
import { FcViewDetails } from "react-icons/fc";
import { BiDetail } from "react-icons/bi";

const MessageAreaHeader = ({ toggleSubMenu, toggleChannelDetails }) => {
  const { messageMode } = useContext(MessageContext);
  console.log(messageMode);
  return (
    <div className="h-fit w-full bg-gray-700 max-h-fit py-4 px-3 font-extrabold text-lg">
      <button className="mr-5" onClick={toggleSubMenu}>
        <FiMenu />
      </button>
      {messageMode.receiver_class == "Channel"
        ? "#" + messageMode.name
        : messageMode.name}
      <button className="float-right text-2xl" onClick={toggleChannelDetails}>
        <BiDetail />
      </button>
    </div>
  );
};

export default MessageAreaHeader;
