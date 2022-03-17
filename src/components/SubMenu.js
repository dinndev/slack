import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthProvider } from "../States/AuthProvider";
import Channels from "./SubMenu/Channels";
import DirectMessages from "./SubMenu/DirectMessages";
import CreateChannel from "./SubMenu/CreateChannel";
import { useCreateChannelProvider } from "../States/Reducers/CreateChannelProvider";
const SubMenu = () => {
  const [{ user }] = useAuthProvider();
  const [channels, setChannels] = useState([]);
  const [{ channelDescription }, dispatch] = useCreateChannelProvider();

  // GET LIST OF CHANNELS
  useEffect(async () => {
    if (user !== undefined) {
      const responseBody = await axios({
        url: "channels",
        baseURL: "http://206.189.91.54/api/v1/",
        method: "get",
        headers: {
          expiry: user.expiry,
          uid: user.uid,
          "access-token": user["access-token"],
          client: user.client,
        },
      }).then((response) => {
        setChannels(response.data.data);
        return response;
      });
      return responseBody;
    }
  }, [user, channelDescription]);

  const handleToggleCreateChanel = (_) => {
    dispatch({
      type: "SET_CREATE_MODE",
      toggleCreateMode: true,
    });
  };
//   return channels !== "" ? (
//     <div className="border border-black h-screen grow-4">
//       SubMenu
//       <br />
//       <ul>
//         <li>Threads</li>
//         <li>Mentions & reactions</li>
//         <li>Drafts</li>
//         <button onClick={handleToggleCreateChanel}>Create channel</button>
//       </ul>
//       Channels
//       {/* DISPLAY LIST OF CHANNELS */}
//       <ul>
//         {channels &&
//           channels.map((channel) => {
//             return <Channels key={channel.id} channel={channel} />;
//           })}
//       </ul>
//       Direct Messages
//       {/* DISPLAY LIST OF DIRECT MESSAGES */}
//       <ul>
//         <DirectMessages />
//       </ul>
//     </div>
//   ) : (
//     <div className="border border-black h-screen grow-4">SubMenu</div>
//   );
// };



    return channels !== '' ? (
        <div className="h-screen grow-4 bg-dark p-4">SubMenu<br/>
            <ul>
                <li>Threads</li>
                <li>Mentions & reactions</li>
                <li>Drafts</li>
                <li>More</li>
            </ul>
            <span className="text-gray-500 font-bold">Channels</span> 
            {/* DISPLAY LIST OF CHANNELS */}
            <ul className="ml-4 h-fit w-fit">
                {channels && channels.map(channel => {
                    return <Channels key={channel.id} channel={channel}/> 
                })}
                {/* <li className="w-fit ml-5">Add Channel</li> */}
                <button className="w-fit ml-5" onClick={handleToggleCreateChanel}>Add Channel</button>
            </ul>
            <span className="text-gray-500 font-bold">Direct Messages</span>
            {/* DISPLAY LIST OF DIRECT MESSAGES */}
            <ul className="ml-4 w-fit">
                <DirectMessages/>
            </ul>
        </div>
    ):(
        <div className="border border-black h-screen grow-4">SubMenu</div>
    )
        
}
 
export default SubMenu;
