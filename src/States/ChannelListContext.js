import React, {createContext, useReducer} from "react";
import { channelListReducer } from "./Reducers/channelListReducer";

export const ChannelListContext = createContext();

const ChannelListContextProvider = (props) => {
    const [channelList, dispatch] = useReducer(channelListReducer, []);
    return ( 
        <ChannelListContext.Provider value={{channelList, dispatch}}>
            {props.children}
        </ChannelListContext.Provider>
     );
}
 
export default ChannelListContextProvider;