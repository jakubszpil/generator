import React from 'react';
import Generator from './Generator/Generator';
import './App.css';
export default function () {
  return (
    <div className="app">
      <header className="app-header">
        <div className="app__layout">
          <h1 className="app-header__title">Nick generator</h1>
        </div>
      </header>
      <main>
        <div className="app__layout">
          <Generator />
        </div>
      </main>
    </div>
  );
}
