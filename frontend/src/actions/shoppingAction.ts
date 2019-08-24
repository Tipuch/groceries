export interface AddShoppingItemAction {
    type: 'ADD_SHOPPING_ITEM';
    payload: {
        item: string;
    };
}

export interface RemoveShoppingItemAction {
    type: 'REMOVE_SHOPPING_ITEM';
    payload: {
        id: number;
    };
}

export type ShoppingAction = RemoveShoppingItemAction | AddShoppingItemAction;

export function addShoppingItem(item: string) {
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
