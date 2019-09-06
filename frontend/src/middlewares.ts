import { Middleware } from "redux";

export const sessionStorageMiddleware: Middleware = (api) => (next) => (action) => {
    switch (action.type) {
        case 'SAVE_SHOPPING_ITEMS':
            sessionStorage.setItem('shoppingList', JSON.stringify(api.getState().shopping.shoppingList));
            break;
        case 'LOAD_SHOPPING_ITEMS':
            const shoppingList = JSON.parse(sessionStorage.getItem('shoppingList'));
            if (shoppingList !== null){
                api.getState().shopping.shoppingList = [...shoppingList];
            }
            break;
    }
    return next(action)
};
