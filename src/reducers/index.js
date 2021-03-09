import { combineReducers } from 'redux';
import marketReducer from './marketReducer';

// combines all of the reducers that are imported then exports default 
// still have to use {} when importing to react components 
export default combineReducers({
  market: marketReducer
});