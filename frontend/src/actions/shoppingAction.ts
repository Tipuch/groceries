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

export type ShoppingAction = RemoveShoppingItemAction | AddShoppingItemAction;

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
