import React from 'react';
import './app.scss';

const App = () => {
  return <div className="app">React works!!!</div>;
};
export function testFunction(test: number) {
  return test + 1;
}

console.log(testFunction(2));
export default App;
