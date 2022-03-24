import React from 'react';
import TimerComponent from './TimerComponent';
import GameCard from './GameCard';
import './style.css';

export default class App extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <>
        <GameCard />
        <TimerComponent />
      </>
    );
  }
}
