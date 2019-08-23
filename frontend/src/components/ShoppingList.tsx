import React from 'react';
import { connect } from 'react-redux';
import { GlobalStoreState } from '../store';

interface shoppingListProps {
    shoppingList: string[];
}

const ShoppingList = (state: shoppingListProps) => (
    <ul>
        {state.shoppingList && state.shoppingList.length
            ? state.shoppingList.map((item: string, index: number) => {
                  return <li>{item}</li>;
              })
            : 'No items'}
    </ul>
);

const mapStateToProps = (state: GlobalStoreState) => {
    return { shoppingList: state.shopping.shoppingList };
};

export default connect(mapStateToProps)(ShoppingList);
