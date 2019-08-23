import React from 'react';
import { connect } from 'react-redux';
import { addShoppingItem, ShoppingAction } from '../actions/shoppingAction';

interface AddShoppingItemProps {
    addShoppingItem: (item: string) => ShoppingAction;
}

interface AddShoppingItemState {
    input: string;
}

class AddShoppingItem extends React.Component<AddShoppingItemProps, AddShoppingItemState> {
    constructor(props: AddShoppingItemProps) {
        super(props);
        this.state = { input: '' };
    }

    updateInput = (input: string) => {
        this.setState({ input });
    };

    handleAddShoppingItem = () => {
        this.props.addShoppingItem(this.state.input);
        this.setState({ input: '' });
    };

    render() {
        return (
            <div>
                <input onChange={e => this.updateInput(e.target.value)} value={this.state.input} />
                <button className="add-shopping-item" onClick={this.handleAddShoppingItem}>
                    Add Shopping Item
                </button>
            </div>
        );
    }
}

export default connect(
    null,
    { addShoppingItem }
)(AddShoppingItem);
