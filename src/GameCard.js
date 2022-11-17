import React from 'react';
import TeamCard from './TeamCard.js';
import GameResetModal from './GameResetModal.js';

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
    };
    //Set winner from false to true, depending on if the score has reached maxScore
    this.incrementScore = this.incrementScore.bind(this);
    this.decrementScore = this.decrementScore.bind(this);
    this.onTeamNameChange = this.onTeamNameChange.bind(this);
    // this.onEnterPress = this.onEnterPress.bind(this);
    this.onSubmitMaxScore = this.onSubmitMaxScore.bind(this);
    this.onGameReset = this.onGameReset.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
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
    // if (this.state[teamScoreNum] === 0) {
    this.setState({
      [teamScoreNum]: Math.max(0, this.state[teamScoreNum] - 1),
    });
  }

  onSubmitMaxScore(event) {
    if (event.key === 'Enter') {
      const scoreValue = event.target.value;
      // console.log(scoreValue);
      this.setState({
        maxScore: Number(scoreValue),
      });
    }
  }

  onTeamNameChange(team, e) {
    //this needs fixing!!!!!!!!!!!!!!!!!!! figure out how to pass text from parent to child, and back up to parent! --(callback)
    //create Enter Key condition to display input team name only when Enter key is pressed//
    if (e.key === 'Enter') {
      const { value } = e.target;

      this.setState({
        [`displayName${team}`]: value,
      });

      e.target.value = '';
    }
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
        maxScore: 0,
        score1: 0,
        score2: 0,
        team1: 'Home',
        team2: 'Guest',
        displayName1: '',
        displayName2: '',
      });
    }
  }
  ///////////////////////////////////////////////////////////////////

  render() {
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
      </div>
    );
  }
}
export default GameCard;
