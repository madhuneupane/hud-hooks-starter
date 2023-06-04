import React from 'react';
import './App.css';
import Character from './components/Character';

const charArray = [
  {
    name: 'Mark',
    race: 'Human',
    status: 'Full-Health',
    comment: ''
  },
  {
    name: 'Goerge',
    race: 'Demon',
    status: 'Enraged',
    comment: 'I\'m so ANGRY!!!!'
  },
  {
    name: 'Angela',
    race: 'Fairy',
    status: 'Full-Health',
    comment: ''
  }
];

const listComp = () => {
  return charArray.map(item => <Character name={item.name} race={item.race} status={item.status} comment={item.comment} />);
}

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        {listComp()}
      </header>
    </div>
  );
}