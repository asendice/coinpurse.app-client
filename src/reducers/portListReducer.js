const portListReducer = (state = { list: [] }, action) => {
  switch (action.type) {
    case "ADD_PORTLIST":
      return {  list: action.payload };
    case "ADD_PORTLISTS":
      const item = action.payload;
      return { list: action.payload };
    default:
      return state;
  }
};

export default portListReducer;
