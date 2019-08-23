interface AddShoppingItemAction {
    type: 'ADD_SHOPPING_ITEM';
    payload: {
        item: string;
    };
}

export type ShoppingAction = AddShoppingItemAction;

export function addShoppingItem(item: string) {
    return {
        type: 'ADD_SHOPPING_ITEM',
        payload: {
            item: item
        }
    };
}
