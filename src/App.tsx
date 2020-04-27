import React from 'react';
import './App.css';
import GameComponent from './components/game.component';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <GameComponent></GameComponent>
    </Provider>
  );
}

export default App;
