export default (state = [], action) => {
  switch(action.type){
    case 'FETCH_MARKET':
      return action.payload;
    default:
      return state;
  }
}