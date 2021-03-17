const favoriteReducer = (state = { favorites: [] }, action) => {
  switch (action.type) {
    case "ADD_FAVORITES":
      return { ...state, favorites: action.payload };
    case "ADD_FAVORITE":
      const favorite = action.payload;
      return { ...state,  favorites: [favorite]  };
    default:
      return state;
  }
};

export default favoriteReducer;
