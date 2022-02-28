import React from 'react';

class TeamCard extends React.Component {
  constructor(props) {
    super();

    // this.state = {
    //   teamName: '',
    // };

    //   this.state = {
    //     score: 0,
    //   };

    //   this.incrementScore = this.incrementScore.bind(this);
    //   this.decrementScore = this.decrementScore.bind(this);
    // this.onInputChange = this.onInputChange.bind(this);
  }

  // incrementScore() {

  //   // this.setState({
  //   //   score: this.state.score + 1,
  //   // });
  // }

  // decrementScore() {
  //   if (this.state.score === 0) {
  //     this.setState({
  //       score: 0,
  //     });
  //   } else {
  //     this.setState({ score: this.state.score - 1 });
  //   }
  // }

  // componentDidUpdate(prevProps) {
  //   if (Number(this.props.maxScore) === this.props.score) {
  //     console.log('winner', `Team ${this.props.team} wins.`);
  //     console.log(this.props);
  //   }
  // }

  // onInputChange = (e) => {
  //   const inputValue = e.target.value;
  //   this.setState({ teamName: inputValue });
  // };

  render() {
    return (
      <div
        className="team-content"
        onKeyPress={(e) => this.props.enterPress(e, this.props.team)}
      >
        <h1>{this.props.score}</h1>

        <br />
        <button
          className="btn button-increment"
          onClick={() => this.props.addPoints(this.props.team)}
        >
          +
        </button>
        <button
          className="btn button-decrement"
          onClick={() => this.props.subtractPoints(this.props.team)}
        >
          -
        </button>
        <br />
        <label>Enter Team Name Below</label>
        <br />
        <input
          placeholder={`Team ${this.props.team}`}
          type="text"
          name={this.props.name}
          // value={this.props.name} ---> this is not required here//
          onChange={(e) => this.props.onTeamNameChange(this.props.team, e)}
        />
        <br />
        <span>{this.props.displayName}</span>
        {/* continue here tomorrow */}
      </div>
    );
  }
}

export default TeamCard;
