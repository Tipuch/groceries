import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import { ShoppingItem } from './components/ShoppingItem';
import {sessionStorageMiddleware} from "./middlewares";

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

const middleware = applyMiddleware(sessionStorageMiddleware);

let store = createStore(reducer, initialState as GlobalStoreState, middleware);
export default store;
