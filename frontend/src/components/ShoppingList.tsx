import React from 'react';
import { connect } from 'react-redux';
import { GlobalStoreState } from '../store';
import {ShoppingItem} from "./ShoppingItem";
import ShoppingItemComponent from "./ShoppingItem";

interface shoppingListProps {
    fruits: ShoppingItem[];
    vegetables: ShoppingItem[];
}

const ShoppingList = (state: shoppingListProps) => (
    <div>
        <h3>Fruits</h3>
        <ul>
            {state.fruits && state.fruits.length
                ? state.fruits.map((item: ShoppingItem, _index: number) => {
                    return <ShoppingItemComponent key={item.id} {...item} />;
                  })
                : 'No fruits'}
        </ul>
        <h3>Vegetables</h3>
        <ul>
            {state.vegetables && state.vegetables.length
                ? state.vegetables.map((item: ShoppingItem, _index: number) => {
                    return <ShoppingItemComponent key={item.id} {...item} />;
                  })
                : 'No vegetables'}
        </ul>
    </div>
);

const mapStateToProps = (state: GlobalStoreState) => {
    const fruits = state.shopping.shoppingList.filter((item: ShoppingItem) => item.is_fruit);
    const vegetables = state.shopping.shoppingList.filter((item: ShoppingItem) => !item.is_fruit);
    return {
        fruits: fruits,
        vegetables: vegetables,
    };
};

export default connect(mapStateToProps)(ShoppingList);
