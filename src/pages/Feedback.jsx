import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { addLocalStorage, loadLocalStorage } from '../localStorage';
import { cleanState } from '../redux/actions';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.btnHandler = this.btnHandler.bind(this);
  }

  componentDidMount() {
    const { name, score, hash } = this.props;
    const rankingObj = {
      name,
      score,
      picture: `https://www.gravatar.com/avatar/${hash}`,
    };

    let rankingStorage = loadLocalStorage('ranking');

    if (rankingStorage === null) {
      addLocalStorage('ranking', []);
      rankingStorage = loadLocalStorage('ranking');
    }

    const newRanking = rankingStorage.concat(rankingObj);
    addLocalStorage('ranking', newRanking);
  }

  btnHandler() {
    const { history, resetState } = this.props;
    resetState();
    history.push('/');
  }

  render() {
    const { assertions, history/* score */ } = this.props;
    const minAssertion = 3;
    return (
      <main id="feedback-card">
        <Header />
        <section id="feedback">
          <span
            id="feedback-message"
            data-testid="feedback-text"
          >
            {assertions < minAssertion ? 'Could be better...' : 'Well Done!'}
          </span>
          {/* <span
            id='feedback-score'
            data-testid="feedback-total-score">{score}</span> */}
          <span
            id="feedback-assertions"
            data-testid="feedback-total-question"
          >
            Assertions:
            <span id="assertions-num">{assertions}</span>
          </span>
        </section>
        <section id="feedback-buttons">
          <button
            id="btn-playagain"
            type="button"
            data-testid="btn-play-again"
            onClick={ this.btnHandler }
          >
            Play Again
          </button>

          <button
            id="btn-ranking"
            type="button"
            data-testid="btn-ranking"
            onClick={ () => history.push('/ranking') }
          >
            Ranking
          </button>
        </section>
      </main>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.func.isRequired,
  hash: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  resetState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  hash: state.hash,
  name: state.player.name,
});

const mapDispatchToProps = (dispatch) => ({
  resetState: () => dispatch(cleanState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
