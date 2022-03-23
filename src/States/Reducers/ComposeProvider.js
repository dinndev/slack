import React, { useContext, useReducer } from "react";

export const composeMessageContext = React.createContext();

export const composeMessageInitialState = {
  composeDescription: {},
  isCreateMode: false,
  error: "",
};
const ACTIONS = {
  set_compose_body: "SET_COMPOSE_BODY",
  set_reciever_id: "SET_STEP_TWO",
  set_create_mode: "SET_COMPOSE_MODE",
  reset_channel_data: "RESET_COMPOSE_DATA",
  set_error: "SET_ERROR",
};

function composeMessageReducer(state, action) {
  const {
    set_compose_body,
    set_reciever_id,
    set_compose_mode,
    reset_compose_data,
    set_error,
  } = ACTIONS;
  switch (action.type) {
    case set_compose_body:
      return {
        ...state,
        composeDescription: {
          ...state.composeDescription,
          body: action.body,
        },
      };
    case set_reciever_id:
      return {
        ...state,
        channelDescription: {
          ...state.composeDescription,
          recieverId: action.recieverId,
        },
      };
    case set_compose_mode:
      return {
        ...state,
        isCreateMode: action.toggleCreateMode,
      };
    case reset_compose_data:
      return {
        ...state,
        channelDescription: {},
      };
    case set_error:
      return {
        ...state,
        error: action.error,
      };
  }
}

export default function ComposeMessageProvider({ children }) {
  return (
    <composeMessageContext.Provider
      value={useReducer(composeMessageReducer, composeMessageInitialState)}
    >
      {children}
    </composeMessageContext.Provider>
  );
}
export const useComposeMessageProvider = () =>
  useContext(composeMessageContext);
