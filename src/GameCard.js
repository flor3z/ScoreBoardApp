import React from 'react';
import TeamCard from './TeamCard.js';

class GameCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
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
    this.onEnterPress = this.onEnterPress.bind(this);
    this.onSubmitMaxScore = this.onSubmitMaxScore.bind(this);
  }

  // winningTeam() {
  //   if (this.state.score1 === this.state.maxScore) {
  //     return `Team ${team[1]} wins!`
  //   } else if (this.state.score2 === this.state.maxScore){
  //     return `Team ${team[2]} wins!`
  //   }
  // }
  //1 compared current score with max score (CS: 0 | MS: 1)

  //2 set the winner if CS = MS

  //a set winnner

  //b increment score if MS hasnt been reached
  //RUN THROUGH THE FUNCTION BELOW AGAIN AND AGAIN
  incrementScore(num) {
    const teamScoreNum = 'score' + num;
    const incrementedScore = this.state[teamScoreNum] + 1;
    console.log(incrementedScore, 'incremented score');
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
    // console.log(this.state[teamScoreNum]);
    // () => {
    //   if (this.state[teamScoreNum] === this.state.maxScore) {
    //     this.setState({ winner: [teamScoreNum] });
    //   }
    // }

    // if ([teamScoreNum] === this.state.maxScore) {
    //   return this.setState({ winner: true });
    // }
  }

  decrementScore(num) {
    const teamScoreNum = 'score' + num;
    // if (this.state[teamScoreNum] === 0) {
    this.setState({
      [teamScoreNum]: Math.max(0, this.state[teamScoreNum] - 1),
    });

    // } else {
    //   this.setState({
    //     [teamName]: this.state[teamName] - 1,
    //   });
    // }
  }
  //The Key Press event is being shown, however not sure how to display Input text on screen from the Enter key press??
  onEnterPress = (event, teamNum) => {
    if (event.key === 'Enter') {
      this.setState({
        [`displayName${teamNum}`]: this.state[`team${teamNum}`],
      });
    }
  };

  onSubmitMaxScore(event) {
    if (event.key === 'Enter') {
      const scoreValue = event.target.value;
      // console.log(scoreValue);
      this.setState({
        maxScore: Number(scoreValue),
      });
    }
  }
  //How do i get the input value to display as the max score value?
  onTeamNameChange(team, e) {
    //this needs fixing!!!!!!!!!!!!!!!!!!! figure out how to pass text from parent to child, and back up to parent!

    const { value } = e.target;
    // console.log(team, value);

    this.setState({
      [`team${team}`]: value,
    });
  }
  //I have to make a function in this parent component, pass it into the TeamCard component (child) then pull the data I want (current teams points)
  //The pass it back up to the parent and change state to render the files again.
  render() {
    return (
      <div>
        <div className="team-cards-container">
          <TeamCard
            enterPress={this.onEnterPress}
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
            enterPress={this.onEnterPress}
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
            // onChange={this.onInputChange}
          />
        </div>
      </div>
    );
  }
}
export default GameCard;
