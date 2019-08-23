import { createStore, Reducer } from 'redux';
import reducer from './reducers';

export interface GlobalStoreState {
    shopping: {
        shoppingList: string[];
    };
}

const initialState = {
    shopping: {
        shoppingList: <string[]>[]
    }
};

let store = createStore(reducer, initialState as GlobalStoreState);
export default store;
