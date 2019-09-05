import api from '../index';
import React from 'react';
import {connect} from 'react-redux';
import {addShoppingItem, AddShoppingItemAction} from '../actions/shoppingAction';
import AsyncSelect from 'react-select/async';

interface AddShoppingItemProps {
    addShoppingItem: (item: string) => AddShoppingItemAction;
}

interface AddShoppingItemState {
    vegetableOption: VegetableOption | null;
}

interface VegetableOption {
    id: number;
    name: string;
    is_fruit: boolean;
}

function loadVegetables(inputValue: string) {
    return api.get(`shopping/vegetables/?q=${inputValue}`)
        .then(res => {
            console.log(res.data.data);
            return res.data.data;
        });
}

class AddShoppingItem extends React.Component<AddShoppingItemProps, AddShoppingItemState> {
    constructor(props: AddShoppingItemProps) {
        super(props);
        this.state = {vegetableOption: null};
    }

    updateInput = (vegetableOption: VegetableOption) => {
        this.setState({ vegetableOption });
        return vegetableOption;
    };

    handleAddShoppingItem = () => {
        this.props.addShoppingItem(this.state.vegetableOption.name);
        this.setState({vegetableOption: null});
    };

    render() {
        return (
            <div>
                <AsyncSelect
                    value={this.state.vegetableOption} matchPos="any"
                    getOptionValue={(option: VegetableOption) => {return option.id.toString()}}
                    getOptionLabel={(option: VegetableOption) => {return option.name}}
                    defaultOptions={true}
                    onChange={(value: VegetableOption) => this.updateInput(value)}
                    loadOptions={loadVegetables} cacheOptions={true}/>
                <button className="add-shopping-item" onClick={this.handleAddShoppingItem}>
                    Add Shopping Item
                </button>
            </div>
        );
    }
}

export default connect(
    null,
    {addShoppingItem}
)(AddShoppingItem);
