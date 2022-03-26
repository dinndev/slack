export const channelDetailsInitialState = {
  channelDetailsData: {},
};
const ACTIONS = {
  set_channel_details: "SET_CHANNEL_DETAILS",
};

export function channelReducer(state, action) {
  const { set_channel_details } = ACTIONS;
  switch (action.type) {
    case set_channel_details:
      return {
        ...state,
        channelDetailsData: action.channelDetailsData,
      };
    default:
      return state;
  }
}
