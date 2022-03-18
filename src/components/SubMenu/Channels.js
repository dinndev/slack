import { useContext } from "react";
import { MessageContext } from "../../States/MessageContext";
import env from "react-dotenv";
import { useChannelDetailsContext } from "../../States/ChannelDetailsProvider";
import axios from "axios";
import { useAuthProvider } from "../../States/AuthProvider";

const Channels = ({ channel }) => {
  const [{ channelDetailsData }, channelDispatch] = useChannelDetailsContext();
  const { dispatch } = useContext(MessageContext);
  const [{ user }] = useAuthProvider();
  const handleClick = async (e) => {
    // get the channel messages
    dispatch({
      type: "SET_MESSAGE_TYPE",
      user: { receiver_id: e.target.id, receiver_class: "Channel" },
    });
    // get channel details
    try {
      const channelDetailsData = await axios
        .get(`${env.API_URL}/channels/${e.target.id}`, {
          headers: {
            expiry: user.expiry,
            uid: user.uid,
            "access-token": user["access-token"],
            client: user.client,
          },
        })
        .then(({ data }) => data.data);
      // set the data to channel details state
      channelDispatch({
        type: "SET_CHANNEL_DETAILS",
        channelDetailsData,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <li
      className="w-fit"
      key={channel.id}
      id={channel.id}
      onClick={handleClick}
    >
      {channel.name}
    </li>
  );
};

export default Channels;
