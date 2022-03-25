export const channelListReducer = (state, action) =>{
    switch(action.type){
        case 'SET_USER_CHANNEL_LIST': 
            return action.userChannels
        default: 
            return 
    }
}