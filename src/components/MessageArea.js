import axios from "axios";
import React, {useContext, useState, useEffect, useCallback} from "react";
import { MessageContext } from "../States/MessageContext";
import MessageAreaHeader from "./MessageArea/MessageAreaHeader";
import SendMessage from "./MessageArea/SendMessage";

const MessageArea = ({currentUser}) => {
    const {messageMode} = useContext(MessageContext);
    const [messages, setMessages] = useState([]);

    const myfunc = useCallback(async() => {
        if(currentUser != ''){
            const responseBody = await axios({
                baseURL: "http://206.189.91.54/api/v1",
                url: '/messages',
                method: 'get',
                params: {
                    receiver_id: messageMode.receiver_id,
                    receiver_class: messageMode.receiver_class
                },
                headers: {
                    "expiry": currentUser.expiry,
                    "uid": currentUser.uid,
                    "access-token": currentUser["access-token"],
                    "client": currentUser.client
                }
            })
            .then((response)=>{
                setMessages(response.data.data);
                return response
            }, (error) => {
                console.log(error);
            })
            return responseBody;
        }
    }, [messageMode, currentUser])

    // GET MESSAGES
    useEffect(() => {
        myfunc()
    }, [myfunc])

    useEffect(()=>{
        const updateMessage = () => setInterval(myfunc, 5000);
        updateMessage();
        return () => clearInterval(updateMessage)
    }, [])

    return (
        <div className="flex flex-col border border-black h-screen grow-16">
            <MessageAreaHeader/>
            {/* DISPLAY MESSAGES */}
            <div className="border border-black grow-16">
                <ul>
                {(messages !== undefined) || (messages.length != 0 ) ? (
                messages.map((message)=>{
                    return <li key={Math.random()}>{message.body}</li>
                    })
                ) : (
                    <div>MessageDisplay</div>
                )}
                </ul>
            </div>
            <SendMessage myfunc={myfunc} currentUser={currentUser}/>
        </div> 
    );

}
 
export default MessageArea;