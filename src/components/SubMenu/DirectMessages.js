import React, {useContext, useEffect, useState} from "react";
import { MessageContext } from "../../States/MessageContext";
import { useAuthProvider } from "../../States/AuthProvider";
import axios from "axios";
import env from "react-dotenv";

const DirectMessages = () => {
    const [{ user }] = useAuthProvider();
    const {dispatch} = useContext(MessageContext);
    const [messengers, setMessengers] = useState('')
    const {messageMode} = useContext(MessageContext);

    useEffect(() => {
        if(user !== undefined){
            const responseBody = axios({
                url: "/messages",
                baseURL: `${env.API_URL}`,
                method: 'get',
                params: {
                    receiver_id: 1735,
                    receiver_class: 'User'
                },
                headers: {
                    "expiry": user.expiry,
                    "uid": user.uid,
                    "access-token": user["access-token"],
                    "client": user.client
                }
            })
            .then(response => {
                const senders = response.data.data.map((item)=>{
                    return {id: item.receiver.id, email: item.receiver.email};
                })
                const sendersUnique = senders.filter((value, index, self) =>
                    index === self.findIndex((t) => (
                        t.place === value.place && t.name === value.name
                    ))
                )
                setMessengers(sendersUnique);
                return response
            })
            return responseBody
        }

    }, [user])

    useEffect(()=>{
        if(messengers !== ''){
            console.log("messengers: ", messengers)
        }
    }, [messengers])

    const handleClick = (e) => {
        dispatch({type: 'SET_MESSAGE_TYPE', user: {"receiver_id": e.target.id, "receiver_class": 'User', "name": e.target.innerText}})
    }

    return messengers.length !== 0 ? (
        messengers.map((messenger)=>{
            return (
                <li className={`w-fit px-4 cursor-pointer rounded-md ${messenger.email == messageMode.name ? "font-bold bg-gray-400 text-zinc-700": ""}`} key={messenger.id} id={messenger.id} onClick={handleClick}>{messenger.email}</li>
            )
        })
    ) : (
        <li className="w-fit"></li>
    )
}
 
export default DirectMessages;