const coinSelectedReducer = (state = {}, action) => {
  switch (action.type) {
    case "COIN_SELECTED":
      return action.payload;
    default:
      return state;
  }
};

export default coinSelectedReducer;