import React from 'react';
import logo from '../logo.svg';
import './App.css';
import AddShoppingItem from '../containers/AddShoppingItem';
import ShoppingList from './ShoppingList';

function App() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
                    Edit 
            {' '}
            <code>src/App.tsx</code>
            {' '}
and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
                    Learn React
          </a>
        </header>
        <div>
          <h2>Shopping List</h2>
          <AddShoppingItem />
          <ShoppingList />
        </div>
      </div>
    );
}

export default App;
