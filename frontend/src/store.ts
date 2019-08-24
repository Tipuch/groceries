import { createStore, Reducer } from 'redux';
import reducer from './reducers';
import {ShoppingItem} from "./components/ShoppingItem";

export interface GlobalStoreState {
    shopping: {
        shoppingList: ShoppingItem[];
        nextShoppingItemId: number;
    };
}

const initialState = {
    shopping: {
        shoppingList: <ShoppingItem[]>[],
        nextShoppingItemId: 1
    }
};

let store = createStore(reducer, initialState as GlobalStoreState);
export default store;
