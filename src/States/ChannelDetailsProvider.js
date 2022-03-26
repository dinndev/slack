import React, { useContext, useReducer } from "react";

export const channelDetailsContext = React.createContext();
export default function ChannelDatailsProvider({
  reducer,
  initialState,
  children,
}) {
  return (
    <channelDetailsContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </channelDetailsContext.Provider>
  );
}
export const useChannelDetailsContext = () => useContext(channelDetailsContext);
