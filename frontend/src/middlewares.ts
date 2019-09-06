import { Middleware } from "redux";

export const localStorageMiddleware: Middleware = (api) => (next) => (action) => {
    switch (action.type) {
        case 'SAVE_SHOPPING_ITEMS':
            localStorage.setItem('shoppingList', JSON.stringify(api.getState().shopping.shoppingList));
            break;
        case 'LOAD_SHOPPING_ITEMS':
            const shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
            if (shoppingList !== null){
                api.getState().shopping.shoppingList = [...shoppingList];
            }
            break;
    }
    return next(action)
};
