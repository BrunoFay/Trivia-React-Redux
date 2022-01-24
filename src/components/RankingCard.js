import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BsTrophy } from 'react-icons/bs';
import { FaMedal } from 'react-icons/fa';
import { RiMedalLine } from 'react-icons/ri';

const TOP_3 = 3;
export default class RankingCard extends Component {
  switchFunction = (posi) => {
    switch (posi) {
    case 1:
      return <BsTrophy />;
    case 2:
      return <FaMedal />;
    case TOP_3:
      return <RiMedalLine />;
    default:
      return null;
    }
  }

  render() {
    const { picture, key, name, score, position } = this.props;

    return (
      <div>
        <div id={ `rank${position}` }>
          {this.switchFunction(position)}

          <span>
            {' '}
            #
            {position}
          </span>
        </div>
        <img src={ picture } alt="gravatar" />
        <span id="name-rank" data-testid={ `player-name-${key}` }>{name}</span>
        <span id="score-rank" data-testid={ `player-score-${key}` }>{score}</span>
      </div>
    );
  }
}

RankingCard.propTypes = {
  key: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
};
