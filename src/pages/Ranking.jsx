import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cleanState } from '../redux/actions';
import RankingCard from '../components/RankingCard';
import { loadLocalStorage } from '../localStorage';

class Ranking extends Component {
  constructor(props) {
    super(props);

    this.btnHandler = this.btnHandler.bind(this);
  }

  btnHandler() {
    const { history, resetState } = this.props;
    resetState();
    history.push('/');
  }

  displayRanking() {
    const rankingStorage = loadLocalStorage('ranking');

    return (rankingStorage
      .sort((a, b) => b.score - a.score)
      .map((player, i) => <RankingCard key={ i } position={ i + 1 } { ...player } />)
    );
  }

  render() {
    return (
      <div id="ranking-container">
        <h1
          id="ranking"
          data-testid="ranking-title"
        >
          <span>R</span>
          anking
        </h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.btnHandler }
        >
          Home
        </button>

        <main id="main-ranking">
          {' '}
          {this.displayRanking()}
        </main>

      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetState: () => dispatch(cleanState()),
});

export default connect(null, mapDispatchToProps)(Ranking);
