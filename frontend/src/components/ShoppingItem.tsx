import React from 'react';
import { connect } from 'react-redux';
import {removeShoppingItem, RemoveShoppingItemAction} from '../actions/shoppingAction';

interface ShoppingItemProps {
    id: number;
    name: string;
    removeShoppingItem: (id: number) => RemoveShoppingItemAction;
}

export interface ShoppingItem {
    id: number;
    name: string;
}

class ShoppingItemComponent extends React.Component<ShoppingItemProps, null> {
    constructor(props: ShoppingItemProps) {
        super(props);
    }

    handleRemoveShoppingItem = () => {
        this.props.removeShoppingItem(this.props.id);
    };

    render() {
        return (
            <li key={this.props.id}>
                <b>{this.props.name}</b>   <i>{this.props.id}</i>
                <button className="remove-shopping-item" onClick={this.handleRemoveShoppingItem}>
                    Remove Shopping Item
                </button>
            </li>
        );
    }
}


export default connect(
    null,
    { removeShoppingItem }
)(ShoppingItemComponent);
