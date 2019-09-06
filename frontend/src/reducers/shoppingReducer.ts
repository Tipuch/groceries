import { ShoppingAction } from '../actions/shoppingAction';
import { ShoppingItem } from '../components/ShoppingItem';

export const shoppingListReducer = (
    state = {
        shoppingList: <ShoppingItem[]>[]
    },
    action: ShoppingAction
) => {
    switch (action.type) {
        case 'ADD_SHOPPING_ITEM': {
            const newItem = { ...action.payload.item };
            // we don't want to have duplicates, so we ignore changes if it's the same item.
            const index = state.shoppingList.findIndex(item => item.id === newItem.id);
            if (index === -1) {
                return { ...state, shoppingList: [...state.shoppingList, newItem] };
            }
            return { ...state };
        }
        case 'REMOVE_SHOPPING_ITEM': {
            let newShoppingList = [];
            for (let i = 0; i < state.shoppingList.length; i++) {
                if (state.shoppingList[i].id != action.payload.id) {
                    newShoppingList.push({ ...state.shoppingList[i] });
                }
            }
            return { ...state, shoppingList: newShoppingList };
        }
        case 'LOAD_SHOPPING_ITEMS': {
            return { ...state }
        }
        case 'SAVE_SHOPPING_ITEMS': {
            return { ...state }
        }
    }
    return { ...state };
};
