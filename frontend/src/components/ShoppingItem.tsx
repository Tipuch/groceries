import React from 'react';
import { connect } from 'react-redux';
import {removeShoppingItem, RemoveShoppingItemAction, SaveShoppingItemsAction} from '../actions/shoppingAction';

interface ShoppingItemProps {
    id: number;
    name: string;
    is_fruit: boolean;
    removeShoppingItem: (id: number) => RemoveShoppingItemAction;
    saveShoppingItems: () => SaveShoppingItemsAction;
}

export interface ShoppingItem {
    id: number;
    name: string;
    is_fruit: boolean;
}

class ShoppingItemComponent extends React.Component<ShoppingItemProps, null> {
    constructor(props: ShoppingItemProps) {
        super(props);
    }

    handleRemoveShoppingItem = () => {
        this.props.removeShoppingItem(this.props.id);
        this.props.saveShoppingItems();
    };

    render() {
        return (
            <li key={this.props.id}>
                <b>{this.props.name}</b>
                <button className="remove-shopping-item" onClick={this.handleRemoveShoppingItem}>
                    X
                </button>
            </li>
        );
    }
}

export default connect(
    null,
    { removeShoppingItem: removeShoppingItem,
    saveShoppingItems: () => {return {type: "SAVE_SHOPPING_ITEMS"}}}
)(ShoppingItemComponent);
