import { useChannelDetailsContext } from "../States/ChannelDetailsProvider";
import { useCreateChannelProvider } from "../States/Reducers/CreateChannelProvider";

const ChannelDetails = () => {
  const [{ channelDetailsData }] = useChannelDetailsContext();
  const [{ users }] = useCreateChannelProvider();
  const { name, owner_id, channel_members } = channelDetailsData;
  const channelMembersID =
    channelDetailsData.id && channel_members.map(({ user_id }) => user_id);
  const hostName =
    users.length > 0 ? users.filter(({ id }) => id === owner_id)[0]?.email : "";
  console.log(channelMembersID);
  console.log(users);
  return (
    <div className="bg-primary flex flex-col items-center grow-4 p-5 h-screen w-44">
      <h2 className="text-md text-gray-300">Channel details</h2>
      <div className="rounded-xl items-center flex flex-col p-5 bg-gray-700 text-center w-full mt-10 h-full">
        <h1 className="text-xl font-bold">{name}</h1>
        <div className="flex mt-5 items-center ">
          <p className=" mr-1 text-xs font-bold">host:</p>
          <p className=" text-xs">{hostName && hostName}</p>
        </div>
      </div>
    </div>
  );
};

export default ChannelDetails;
