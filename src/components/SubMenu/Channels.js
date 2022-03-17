import { useContext } from "react";
import { MessageContext } from "../../States/MessageContext";

const Channels = ({channel}) => {
    const {dispatch} = useContext(MessageContext)
    const handleClick = (e) => {
        console.log("target value: ", e.target.innerText)
        dispatch({type: 'SET_MESSAGE_TYPE', user: {"receiver_id": e.target.id, "receiver_class": 'Channel', "name": e.target.innerText}})
    }
    return ( 
        <li className="w-fit cursor-pointer" key={channel.id} id={channel.id} onClick={handleClick}>{channel.name}</li>
    );
}
 
export default Channels;