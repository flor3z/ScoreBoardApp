import React from 'react';

class TeamCard extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    const winnerClass = this.props.winner ? 'victory' : null;
    return (
      <div
        className="team-content"
        // onKeyPress={(e) => this.props.enterPress(e, this.props.team)}
      >
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
        <input
          placeholder="Team Name"
          type="text"
          name={this.props.displayName}
          onKeyPress={(e) => this.props.onTeamNameChange(this.props.team, e)}
        />
        <br />
        <span>
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
