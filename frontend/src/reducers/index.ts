import { combineReducers } from 'redux';
import { shoppingListReducer } from './shoppingReducer';

export default combineReducers({
    shopping: shoppingListReducer
});
