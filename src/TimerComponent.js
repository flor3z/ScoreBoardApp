import React from 'react';

const DEFAULT_START_TIME = {
  minutes: 25,
  seconds: 0,
};

export default class TimerComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      minutes: DEFAULT_START_TIME.minutes,
      seconds: DEFAULT_START_TIME.seconds,
      isPaused: false,
    };
    //isPaused Logic may need to be swtiched
    this.onTimerToggle = this.onTimerToggle.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
  }

  onTimerToggle() {
    //Inital if statement means timer has PAUSED (!isPaused == True)//
    if (!this.state.isPaused) {
      this.timer = setInterval(() => {
        if (this.state.seconds === 0 && this.state.minutes === 0) {
          this.setState({
            seconds: 0,
            minutes: 0,
          });
        } else if (this.state.seconds <= 0) {
          this.setState((prevState) => ({
            seconds: 59,
            minutes: prevState.minutes - 1,
          }));
          //this needs work the else if part -- Complete
        } else {
          this.setState({
            seconds: this.state.seconds - 1,
          });
        }
      }, 1000);
    }

    //I want to make one BUTTON with both Pause and Play functionality...figured out the play part, not yet the pause...
    // UPDATE --- I THINK I FIGURED IT OUT!
    this.setState({
      isPaused: !this.state.isPaused,
    });
    if (this.state.isPaused) {
      clearInterval(this.timer);
    }
  }

  onClickReset() {
    this.setState({
      isPaused: false,
      minutes: DEFAULT_START_TIME.minutes,
      seconds: DEFAULT_START_TIME.seconds,
    });

    clearInterval(this.timer);
  }

  render() {
    const playOrPause = this.state.isPaused === false ? 'Play' : 'Pause';
    return (
      <div className="timer-container">
        <div className="time">
          <h1>
            {this.state.minutes === 0
              ? '00'
              : this.state.minutes < 10
              ? '0' + this.state.minutes
              : this.state.minutes}
            :
            {this.state.seconds === 0
              ? '00'
              : this.state.seconds < 10
              ? '0' + this.state.seconds
              : this.state.seconds}
          </h1>
        </div>
        <div className="time-controls">
          <button className="btn" onClick={this.onTimerToggle}>
            {playOrPause}
          </button>
          <button className="btn" onClick={this.onClickReset}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}
