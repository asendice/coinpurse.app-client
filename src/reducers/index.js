import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import marketReducer from "./marketReducer";
import selectCoinReducer from "./selectCoinReducer";
import modalInfoReducer from "./modalInfoReducer";
import favoriteReducer from "./favoriteReducer";
import transactionReducer from "./transactionReducer";
// combines all of the reducers that are imported then exports default
// still have to use {} when importing to react components
export default combineReducers({
  market: marketReducer,
  selectedCoin: selectCoinReducer,
  info: modalInfoReducer,
  favorites: favoriteReducer,
  transactions: transactionReducer,
  form: formReducer,
});
