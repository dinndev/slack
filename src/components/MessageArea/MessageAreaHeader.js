import React, {useContext, useEffect, useState} from "react";
import { MessageContext } from "../../States/MessageContext";

const MessageAreaHeader = ({toggleSubMenu}) => {
    const {messageMode} = useContext(MessageContext);

    return ( 
        <div className="h-fit w-full bg-gray-700 max-h-fit py-4 px-3 font-extrabold text-lg">
            <button onClick={toggleSubMenu}>toggle</button> {messageMode.receiver_class == "Channel" ? "#"+messageMode.name: messageMode.name}
        </div>
    );
}
 
export default MessageAreaHeader;