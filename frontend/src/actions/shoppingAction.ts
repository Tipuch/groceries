import { ShoppingItem } from '../components/ShoppingItem';

export interface AddShoppingItemAction {
    type: 'ADD_SHOPPING_ITEM';
    payload: {
        item: ShoppingItem;
    };
}

export interface RemoveShoppingItemAction {
    type: 'REMOVE_SHOPPING_ITEM';
    payload: {
        id: number;
    };
}

export interface SaveShoppingItemsAction {
    type: 'SAVE_SHOPPING_ITEMS';
}

export interface LoadShoppingItemsAction {
    type: 'LOAD_SHOPPING_ITEMS';
}

export type ShoppingAction = RemoveShoppingItemAction | AddShoppingItemAction | SaveShoppingItemsAction | LoadShoppingItemsAction;

export function addShoppingItem(item: ShoppingItem) {
    return {
        type: 'ADD_SHOPPING_ITEM',
        payload: {
            item: item
        }
    };
}

export function removeShoppingItem(id: number) {
    return {
        type: 'REMOVE_SHOPPING_ITEM',
        payload: {
            id: id
        }
    };
}
