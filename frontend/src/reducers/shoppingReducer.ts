import { ShoppingAction } from '../actions/shoppingAction';
import {ShoppingItem} from "../components/ShoppingItem";

export const shoppingListReducer = (
    state = {
        shoppingList: <ShoppingItem[]>[],
        nextShoppingItemId: 1
    },
    action: ShoppingAction
) => {
    switch (action.type) {
        case 'ADD_SHOPPING_ITEM': {
            const newItem = {name: action.payload.item, id: state.nextShoppingItemId};
            return { ...state, nextId: state.nextShoppingItemId + 1, shoppingList: [...state.shoppingList, newItem] };
        }
        case 'REMOVE_SHOPPING_ITEM': {
            let newShoppingList = [];
            for (let i = 0; i < state.shoppingList.length; i++) {
                if (state.shoppingList[i].id != action.payload.id) {
                    newShoppingList.push({...state.shoppingList[i]});
                }
            }
            return { ...state, shoppingList: newShoppingList };
        }
    }
    return state;
};
