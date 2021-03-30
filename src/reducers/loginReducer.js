const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOG_RESPONSE":
      return action.payload;
    default:
      return state;
  }
};

export default loginReducer;
