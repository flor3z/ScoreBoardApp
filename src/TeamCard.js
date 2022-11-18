import React from 'react';

class TeamCard extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    const winnerClass = this.props.winner ? 'victory' : null;
    return (
      <div className="team-content">
        <h1
          className={
            this.props.score === this.props.maxScore ? winnerClass : null
          }
        >
          {this.props.score}
        </h1>

        <button
          className="butn button-increment"
          onClick={() => this.props.addPoints(this.props.team)}
        >
          +
        </button>
        <button
          className="butn button-decrement"
          onClick={() => this.props.subtractPoints(this.props.team)}
        >
          -
        </button>
        <br />
        <input
          className="team-content-input"
          placeholder="Team Name"
          type="text"
          name={this.props.displayName}
          onKeyPress={(e) => this.props.onTeamNameChange(this.props.team, e)}
        />
        <br />
        <span className="team-name">
          {this.props.displayName.length === 0
            ? this.props.name
            : this.props.displayName}
        </span>
        {/* continue here tomorrow */}
      </div>
    );
  }
}

export default TeamCard;
