import React from 'react';

class TeamCard extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    //Tried to make conditional syling based on whether or not team reached maxScore...still not working properly//
    const winnerClass = this.props.winner ? 'victory' : null;
    console.log(this.props.winner);
    return (
      <div
        className="team-content"
        onKeyPress={(e) => this.props.enterPress(e, this.props.team)}
      >
        {/* Below is the code for conditional styling based on Winning the game or Not */}

        <h1
          className={
            this.props.score === this.props.maxScore ? winnerClass : null
          }
        >
          {this.props.score}
        </h1>

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
        <span>
          {this.props.displayName === ''
            ? this.props.name
            : this.props.displayName}
        </span>
        {/* continue here tomorrow */}
      </div>
    );
  }
}

export default TeamCard;
