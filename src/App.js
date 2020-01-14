import React from 'react';
import logo from './logo.svg';
import './App.css';
import Comments from './containers/Comments';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Comments />
    </div>
  );
}

export default App;
