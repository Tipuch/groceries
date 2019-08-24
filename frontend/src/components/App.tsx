import React from 'react';
import logo from '../logo.svg';
import './App.css';
import AddShoppingItem from '../containers/AddShoppingItem';
import ShoppingList from './ShoppingList';

function App() {
    return (
      <div className="App">
          <h2>Shopping List</h2>
          <AddShoppingItem />
          <ShoppingList />
      </div>
    );
}

export default App;
