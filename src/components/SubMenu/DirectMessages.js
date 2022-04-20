import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from "../../States/MessageContext";
import { useAuthProvider } from "../../States/AuthProvider";
import axios from "axios";
import env from "react-dotenv";
import { ChannelListContext } from "../../States/ChannelListContext";

const DirectMessages = ({ myFunction }) => {
  const [{ user }] = useAuthProvider();
  const { dispatch } = useContext(MessageContext);
  const [messengers, setMessengers] = useState([]);
  const { messageMode } = useContext(MessageContext);
  const [allUsers, setAllUsers] = useState("");
  const [done, setDone] = useState(false);
  const [messengerList, setMessengerList] = useState([]);
  const { channelList, dispatch: channelListDispatch } =
    useContext(ChannelListContext);
  const [channelMembers, setChannelMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const [doneFetchingOfChannelMembers, setDoneFetchingOfChannelMembers] =
    useState(false);
  const [uniqMembers, setUniqMembers] = useState([]);
  const [doneFetchingMemberList, setDoneFetchingMemberList] = useState(false);
  const [uniqMembersUid, setUniqMembersUid] = useState([]);

  useEffect(() => {
    if (channelList !== undefined && channelList.length != 0) {
      // get channel details
      channelList.map((item) => {
        const getUsers = axios({
          url: `/channels/${item.id}`,
          baseURL: `${env.API_URL}`,
          method: "get",
          headers: {
            expiry: user.expiry,
            uid: user.uid,
            "access-token": user["access-token"],
            client: user.client,
          },
        }).then((response) => {
          // get channel members
          let data = response.data.data.channel_members;
          data.map((item) => {
            setChannelMembers([item.user_id]);
          });
        });
      });
      setDoneFetchingOfChannelMembers(true);
    }
  }, [channelList, myFunction]);

  useEffect(() => {
    if (channelMembers.length !== 0) {
      setMembers([...members, ...channelMembers]);
    }
  }, [channelMembers]);

  useEffect(() => {
    if (doneFetchingOfChannelMembers && members.length !== 0) {
      const uniq = [...new Set(members)];
      setUniqMembers(uniq);
      setDone(true);
    }
  }, [doneFetchingOfChannelMembers, members]);

  useEffect(() => {
    if (uniqMembers.length !== 0 && done == true) {
      // get messages for each user ids generated
      uniqMembers.map((theUser) => {
        const responseBody = axios({
          url: "/messages",
          baseURL: `${env.API_URL}`,
          method: "get",
          params: {
            receiver_id: theUser,
            receiver_class: "User",
          },
          headers: {
            expiry: user.expiry,
            uid: user.uid,
            "access-token": user["access-token"],
            client: user.client,
          },
        }).then((response) => {
          if (response.data.data.length !== 0) {
            setMessengers([
              ...messengers,
              {
                id: theUser,
                email:
                  response.data.data[0].receiver.uid == user.uid
                    ? response.data.data[0].sender.uid
                    : response.data.data[0].receiver.uid,
              },
            ]);
          }
        });
      });
      setDoneFetchingMemberList(true);
    }
  }, [uniqMembers, done]);

  useEffect(() => {
    if (messengers.length !== 0) {
      setMessengerList([...messengerList, ...messengers]);
    }
  }, [messengers]);

  useEffect(() => {
    let uniqueListUID = messengerList.filter(
      (value, index, self) =>
        index ===
        self.findIndex((t) => t.id === value.id && t.email === value.email)
    );
    setUniqMembersUid(uniqueListUID);
  }, [doneFetchingMemberList, messengerList]);

  const handleClick = (e) => {
    dispatch({
      type: "SET_MESSAGE_TYPE",
      user: {
        receiver_id: e.target.id,
        receiver_class: "User",
        name: e.target.innerText,
      },
    });
  };

  return uniqMembersUid.length !== 0 ? (
    uniqMembersUid.map((messenger) => {
      return (
        <li
          className={`w-fit px-4 cursor-pointer rounded-md ${
            messenger.email == messageMode.name
              ? "font-bold bg-gray-400 text-zinc-700"
              : ""
          }`}
          key={messenger.id}
          id={messenger.id}
          onClick={handleClick}
        >
          {messenger.email}
        </li>
      );
    })
  ) : (
    <li className="w-fit"></li>
  );
};

export default DirectMessages;
