import React, { useContext, useReducer } from "react";

export const CreateChannelContext = React.createContext();

export const channelInitialState = {
  // set the initial state if the user is in local storage
  channelDescription: {},
  isCreateMode: false,
  users: {},
  error: "",
};
const ACTIONS = {
  set_step_one: "SET_STEP_ONE",
  set_step_two: "SET_STEP_TWO",
  set_create_mode: "SET_CREATE_MODE",
  reset_channel_data: "RESET_CHANNEL_DATA",
  get_all_users: "GET_ALL_USERS",
  set_error: "SET_ERROR",
};

function newChannelReducer(state, action) {
  const {
    set_step_one,
    set_step_two,
    set_create_mode,
    reset_channel_data,
    get_all_users,
    set_error,
  } = ACTIONS;
  switch (action.type) {
    case set_step_one:
      return {
        ...state,
        channelDescription: {
          ...state.channelDescription,
          channelName: action.channelName,
        },
      };
    case set_step_two:
      return {
        ...state,
        channelDescription: {
          ...state.channelDescription,
          channelMembers: action.channelMembers,
        },
      };
    case set_create_mode:
      return {
        ...state,
        isCreateMode: action.toggleCreateMode,
      };
    case reset_channel_data:
      return {
        ...state,
        channelDescription: {},
      };
    case get_all_users:
      return {
        ...state,
        users: action.users,
      };
    case set_error:
      return {
        ...state,
        error: action.error,
      };
  }
}

export default function CreateChannelProvider({ children }) {
  return (
    <CreateChannelContext.Provider
      value={useReducer(newChannelReducer, channelInitialState)}
    >
      {children}
    </CreateChannelContext.Provider>
  );
}
export const useCreateChannelProvider = () => useContext(CreateChannelContext);
