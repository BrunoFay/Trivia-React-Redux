import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';
import { addLocalStorage } from '../localStorage';

class Trivia extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
    };

    this.callback = this.callback.bind(this);
  }

  componentDidMount() {
    this.callback();
    addLocalStorage('score', 0);
  }

  callback = () => {
    const { results } = this.props;
    this.setState({ questions: results });
  }

  handleTimer = (tim) => {
    this.setState({
      timer: tim,
    });
  }
  

  render() {
    const { state: { questions, timer }, props: { index, history } } = this;
 
    return (
      <main id="trivia">
        <Header timer={timer} />
        {questions.length > 0
          && <Question
            handleTimer={this.handleTimer}
            result={questions[index]}
            index={index}
            history={history}
          />}
      </main>
    );
  }
}

Trivia.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  index: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  results: state.questions.resultApi.results,
  index: state.questions.index,
});

export default connect(mapStateToProps)(Trivia);
