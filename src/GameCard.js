import React from 'react';
import TeamCard from './TeamCard.js';
import GameResetModal from './GameResetModal.js';

const DEFAULT_START_TIME = {
  minutes: 25,
  seconds: 0,
};

class GameCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      show: true,
      maxScore: 0,
      score1: 0,
      score2: 0,
      team1: 'Home',
      team2: 'Guest',
      displayName1: '',
      displayName2: '',
      minutes: DEFAULT_START_TIME.minutes,
      seconds: DEFAULT_START_TIME.seconds,
      isPaused: false,
    };
    this.incrementScore = this.incrementScore.bind(this);
    this.decrementScore = this.decrementScore.bind(this);
    this.onTeamNameChange = this.onTeamNameChange.bind(this);
    this.onSubmitMaxScore = this.onSubmitMaxScore.bind(this);
    this.onGameReset = this.onGameReset.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.onTimerToggle = this.onTimerToggle.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
  }

  incrementScore(num) {
    const teamScoreNum = 'score' + num;
    const incrementedScore = this.state[teamScoreNum] + 1;
    if (incrementedScore === this.state.maxScore) {
      this.setState({
        winner: true,
        [teamScoreNum]: incrementedScore,
      });
    } else {
      this.setState({
        [teamScoreNum]: Math.min(incrementedScore, this.state.maxScore),
      });
    }
  }

  decrementScore(num) {
    const teamScoreNum = 'score' + num;
    this.setState({
      [teamScoreNum]: Math.max(0, this.state[teamScoreNum] - 1),
    });
  }

  onSubmitMaxScore(event) {
    if (event.key === 'Enter') {
      const scoreValue = event.target.value;
      this.setState({
        maxScore: Number(scoreValue),
      });
    }
  }

  onTeamNameChange(team, e) {
    if (e.key === 'Enter') {
      const { value } = e.target;

      this.setState({
        [`displayName${team}`]: value,
      });

      e.target.value = '';
    }
  }

  onTimerToggle() {
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
        } else {
          this.setState({
            seconds: this.state.seconds - 1,
          });
        }
      }, 1000);
    }
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

  ///Modal content within comment slashes///////////////////////

  handleCloseModal() {
    this.setState({
      show: false,
    });
  }

  onGameReset() {
    if (this.state.winner) {
      this.setState({
        winner: null,
        show: true,
        maxScore: 0,
        score1: 0,
        score2: 0,
        team1: 'Home',
        team2: 'Guest',
        displayName1: '',
        displayName2: '',
        isPaused: false,
        minutes: DEFAULT_START_TIME.minutes,
        seconds: DEFAULT_START_TIME.seconds,
      });
      clearInterval(this.timer);
    }
  }
  ///////////////////////////////////////////////////////////////////

  render() {
    const playOrPause = this.state.isPaused === false ? 'Play' : 'Pause';

    return (
      <div>
        {this.state.winner ? (
          <GameResetModal
            show={this.state.show}
            winner={this.state.winner}
            handleCloseModal={this.handleCloseModal}
            gameReset={this.onGameReset}
          />
        ) : null}
        <div className="team-cards-container">
          <TeamCard
            maxScore={this.state.maxScore}
            score={this.state.score1}
            winner={this.state.winner}
            team={1}
            name={this.state.team1}
            displayName={this.state.displayName1}
            addPoints={this.incrementScore}
            subtractPoints={this.decrementScore}
            onTeamNameChange={this.onTeamNameChange}
          />
          <TeamCard
            maxScore={this.state.maxScore}
            score={this.state.score2}
            winner={this.state.winner}
            team={2}
            name={this.state.team2}
            displayName={this.state.displayName2}
            addPoints={this.incrementScore}
            subtractPoints={this.decrementScore}
            onTeamNameChange={this.onTeamNameChange}
          />
        </div>
        <div className="score-limit-container">
          <h2>
            {this.state.maxScore <= 0
              ? 'Enter max points for game'
              : `Game will go up to ${this.state.maxScore} points`}
          </h2>
          <input
            type="number"
            placeholder="Score Limit.."
            onKeyPress={this.onSubmitMaxScore}
          />
        </div>
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
            <button className="butn" onClick={this.onTimerToggle}>
              {playOrPause}
            </button>
            <button className="butn" onClick={this.onClickReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default GameCard;
