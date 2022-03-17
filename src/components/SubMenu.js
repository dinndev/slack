import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthProvider } from "../States/AuthProvider";
import Channels from "./SubMenu/Channels";
import DirectMessages from "./SubMenu/DirectMessages";

const SubMenu = ({showSubMenu}) => {
    const [{ user }] = useAuthProvider();
    const [channels, setChannels] = useState([]);
    const [showChannels, setShowChannels] = useState(true)
    const [showDirectMessageList, setShowDirectMessageList] = useState(true)

    // GET LIST OF CHANNELS
    useEffect(async() => {
        if(user !== undefined){
            const responseBody = await axios({
                url: "channels", 
                baseURL: "http://206.189.91.54/api/v1/",
                method: 'get',
                headers: {
                    expiry: user.expiry,
                    uid: user.uid,
                    "access-token": user["access-token"],
                    client: user.client
                }
                
            })
            .then((response) => {
                setChannels(response.data.data);
                return response;
            })

            return responseBody;
        }

    }, [user])

    useEffect(()=>{
        if(channels !== []){
            console.log("channels: ", channels);
        }
    }, [channels])

    const toggleChannels = () =>{
        setShowChannels(!showChannels);
    }
    
    const toggleDirectMessageList = () =>{
        setShowDirectMessageList(!showDirectMessageList);
    }

    return channels !== '' ? (
        <div className={`h-screen grow-4 bg-gray-600 p-4 select-none ${showSubMenu ? "block": "hidden"}`}>
            <div className="py-3 mb-3 flex justify-between border-b-2 border-gray-400">
                <div className="text-xl font-bold">{user.email}</div><button>compose</button> 
            </div>
            <ul className="mb-2">
                <li>Threads</li>
                <li>Mentions & reactions</li>
                <li>Drafts</li>
                <li>More</li>
            </ul>
            <span className="cursor-pointer w-full block text-gray-400 font-bold" onClick={toggleChannels}>Channels</span> 
            {/* DISPLAY LIST OF CHANNELS */}
            <ul className={`h-fit w-full mb-2 ${showChannels == true ? "block" : "hidden"}`}>
                {channels && channels.map(channel => {
                    return <Channels key={channel.id} channel={channel}/> 
                })}
                <li className="w-fit ml-5">Add Channel</li>
            </ul>
            <span className="cursor-pointer w-full block text-gray-400 font-bold" onClick={toggleDirectMessageList}>Direct Messages</span>
            {/* DISPLAY LIST OF DIRECT MESSAGES */}
            <ul className={`w-fit ${showDirectMessageList == true ? "block" : "hidden"}`}>
                <DirectMessages/>
            </ul>
        </div>
    ):(
        <div className="border border-black h-screen grow-4">SubMenu</div>
    )
        
}
 
export default SubMenu;