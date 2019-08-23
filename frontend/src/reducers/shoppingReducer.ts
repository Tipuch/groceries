import { ShoppingAction } from '../actions/shoppingAction';

export interface ShoppingState {
    shoppingList: string[];
}

export const shoppingListReducer = (
    state = {
        shoppingList: <string[]>[]
    },
    action: ShoppingAction
) => {
    switch (action.type) {
        case 'ADD_SHOPPING_ITEM': {
            return { ...state, shoppingList: [...state.shoppingList, action.payload.item] };
        }
    }
    return state;
};
