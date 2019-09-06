import api from '../index';
import React from 'react';
import { connect } from 'react-redux';
import {addShoppingItem, AddShoppingItemAction, SaveShoppingItemsAction} from '../actions/shoppingAction';
import AsyncSelect from 'react-select/async';
import { ShoppingItem } from '../components/ShoppingItem';

interface AddShoppingItemProps {
    addShoppingItem: (item: ShoppingItem) => AddShoppingItemAction;
    saveShoppingItems: () => SaveShoppingItemsAction;
}

interface AddShoppingItemState {
    vegetableOption: ShoppingItem | null;
}

function loadVegetables(inputValue: string) {
    return api.get(`shopping/vegetables/?q=${inputValue}`).then(res => {
        return res.data.data;
    });
}

class AddShoppingItem extends React.Component<AddShoppingItemProps, AddShoppingItemState> {
    constructor(props: AddShoppingItemProps) {
        super(props);
        this.state = { vegetableOption: null };
    }

    updateInput = (vegetableOption: ShoppingItem) => {
        this.setState({ vegetableOption });
        return vegetableOption;
    };

    handleAddShoppingItem = () => {
        if (this.state.vegetableOption !== null) {
            this.props.addShoppingItem(this.state.vegetableOption);
            this.setState({ vegetableOption: null });
            this.props.saveShoppingItems();
        }
    };

    render() {
        return (
            <div>
                <AsyncSelect
                    value={this.state.vegetableOption}
                    matchPos="any"
                    getOptionValue={(option: ShoppingItem) => {
                        return option.id.toString();
                    }}
                    getOptionLabel={(option: ShoppingItem) => {
                        return option.name;
                    }}
                    defaultOptions={true}
                    onChange={(value: ShoppingItem) => this.updateInput(value)}
                    loadOptions={loadVegetables}
                    cacheOptions={true}
                />
                <button className="add-shopping-item" onClick={this.handleAddShoppingItem}>
                    Add Shopping Item
                </button>
            </div>
        );
    }
}

export default connect(
    null,
    { addShoppingItem: addShoppingItem,
    saveShoppingItems: () => {return {type: "SAVE_SHOPPING_ITEMS"}}}
)(AddShoppingItem);
