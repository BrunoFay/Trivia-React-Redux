import PropTypes from 'prop-types';
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { addHash } from '../redux/actions';

const DEFAULT_TIMER = 30;
class Header extends Component {
  componentDidMount() {
    const { email, hashDispatch } = this.props;
    const hash = md5(email).toString();
    hashDispatch(hash);
  }

  render() {
    const { props: { name, score, timer, hash } } = this;

    return (
      <header>
        <div id="user">
          <img
            src={ `https://www.gravatar.com/avatar/${hash}` }
            alt="avatar"
            data-testid="header-profile-picture"
          />
          <span
            data-testid="header-player-name"
            id="name-header"
          >
            {name}
          </span>
        </div>
        <span id="timer">{timer || DEFAULT_TIMER}</span>
        <span data-testid="header-score">
          <span id="score">Score:</span>
          <span id="score-num">
            {' '}
            {score}
          </span>
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
  hash: state.hash,
});

const mapDispatchToProps = (dispatch) => ({
  hashDispatch: (hash) => dispatch(addHash(hash)),
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  hashDispatch: PropTypes.func.isRequired,
  hash: PropTypes.number.isRequired,
  timer: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
