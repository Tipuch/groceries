import React from 'react';
import { connect } from 'react-redux';
import { GlobalStoreState } from '../store';
import {ShoppingItem} from "./ShoppingItem";
import ShoppingItemComponent from "./ShoppingItem";

interface shoppingListProps {
    shoppingList: ShoppingItem[];
}

const ShoppingList = (state: shoppingListProps) => (
    <ul>
        {state.shoppingList && state.shoppingList.length
            ? state.shoppingList.map((item: ShoppingItem, index: number) => {
                  return <ShoppingItemComponent {...item} />;
              })
            : 'No items'}
    </ul>
);

const mapStateToProps = (state: GlobalStoreState) => {
    return { shoppingList: state.shopping.shoppingList };
};

export default connect(mapStateToProps)(ShoppingList);
