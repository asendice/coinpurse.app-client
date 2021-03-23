// const portListReducer = (state = [], action) => {
//   switch (action.type) {
//     case "ADD_PORTLIST":
//       return action.payload;
//     default:
//       return state;
//   }
// };

// export default portListReducer;


const portListReducer = (state = { list: [] }, action) => {
  switch (action.type) {
    case "ADD_PORTLIST":
      return { ...state, list: action.payload };
    // case "ADD_PORTLIST":
    //   const item = action.payload;
    //   return { ...state, list: state.list.concat(item) };
    default:
      return state;
  }
};

export default portListReducer;