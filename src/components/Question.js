import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { getAssertion, getScore, nextQuestion, timer } from '../redux/actions';
import { addLocalStorage, loadLocalStorage } from '../localStorage';

const INITIAL_STATE = {
  count: 30,
  answers: [],
  counterFinished: false,
  wasAnswered: false,
};

class Question extends Component {
  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;

    this.counter = 0;

    this.randomAnswer = this.randomAnswer.bind(this);
    this.timer = this.timer.bind(this);
    this.changeTime = this.changeTime.bind(this);
    this.sortAnswers = this.sortAnswers.bind(this);
    this.btnHandle = this.btnHandle.bind(this);
    this.score = this.score.bind(this);
    this.nextHandle = this.nextHandle.bind(this);
  }

  componentDidMount() {
    this.sortAnswers();
    this.timer();
  }

  sortAnswers() {
    const {
      result: {
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      },
    } = this.props;

    const sortAnswers = [...incorrectAnswers, correctAnswer].sort(
      this.randomAnswer,
    );

    this.setState({ answers: sortAnswers });
  }

  randomAnswer() {
    const testNumber = 0.5;
    return testNumber - Math.random();
  }

  // ref: https://stackoverflow.com/questions/40885923/countdown-timer-in-react
  changeTime() {
    const { state: { count }, props: { handleTimer } } = this;
    if (count > 0) {
      this.setState((prevState) => ({ count: prevState.count - 1 }));
      handleTimer(count);
    } else if (count === 0) {
      clearInterval(this.counter);
      this.setState({ counterFinished: true, wasAnswered: true });
      handleTimer(count);
    }
  }

  timer() {
    const seconds = 1000;
    this.counter = setInterval(this.changeTime, seconds);
  }

  styleBtn(nameId) {
    const btns = document.querySelectorAll('.btn-game');

    btns.forEach((btn) => {
      const testId = btn.getAttribute('data-testid');

      if (testId === nameId) {
        btn.style.border = '3px solid rgb(6, 240, 15)';
      } else {
        btn.style.border = '3px solid rgb(255, 0, 0)';
      }
    });
  }

  btnHandle(event) {
    const nameId = 'correct-answer';
    this.styleBtn(nameId);
    this.score(event, nameId);
    this.setState({ wasAnswered: true });
  }

  nextHandle() {
    const {
      nextButtomAction,
      index,
      history,
    } = this.props;
    const maxLength = 4;
    nextButtomAction();
    this.setState(INITIAL_STATE, this.sortAnswers);
    this.timer();
    if (index === maxLength) {
      history.push('/feedback');
    }
    clearInterval(this.counter);
  }

  score({ target }, nameId) {
    const {
      props: {
        result: { difficulty },
        getScoreAction, assertionDispatch,
      },
      state: { count },
    } = this;
    const testId = target.getAttribute('data-testid');
    if (testId === nameId) {
      const difficultyTypes = { hard: 3, medium: 2, easy: 1 };
      const initialScore = 10;
      const score = initialScore + count * difficultyTypes[difficulty];
      getScoreAction(score);
      assertionDispatch();
      const prevLocalStorage = loadLocalStorage('score');
      addLocalStorage('score', score + prevLocalStorage);
    }
  }

  render() {
    const {
      result: {
        category,
        question,
        incorrect_answers: incorrectAnswers },
      index: indexQuestions,
    } = this.props;

    const { answers, counterFinished, wasAnswered } = this.state;

    return (
      <main id="trivia-game">
        <section id="questionSection">
          <span id="category" data-testid="question-category">{category}</span>

          <span id="question" data-testid="question-text">{question}</span>
          <span id="num-question">
            {indexQuestions + 1}
            /5
          </span>

        </section>
        {<section id="answers" data-testid="answer-options">

          {answers.map((answer, index) => (
            <button
              id={ `Answer${index}` }
              type="button"
              className="btn-game"
              key={answer}
              disabled={counterFinished || wasAnswered}
              onClick={this.btnHandle}
              data-testid={
                incorrectAnswers.includes(answer)
                  ? `wrong-answer-${index}`
                  : 'correct-answer'
              }
            >
              {answer}
            </button>
          ))}
        </section>}
        {wasAnswered && (
          <button
            id="btn-next"
            data-testid="btn-next"
            type="button"
            onClick={ this.nextHandle }
          >
            Next
            <AiOutlineDoubleRight />
          </button>)}
      </main>
    );
  }
}

Question.propTypes = {
  getScoreAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  index: PropTypes.number.isRequired,
  nextButtomAction: PropTypes.func.isRequired,
  result: PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.shape([]),
    difficulty: PropTypes.string,
  }).isRequired,
  assertionDispatch: PropTypes.func.isRequired,
  handleTimer: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getScoreAction: (score) => dispatch(getScore(score)),
  nextButtomAction: () => dispatch(nextQuestion()),
  assertionDispatch: () => dispatch(getAssertion()),
  timerDispatch: (count) => dispatch(timer(count)),
});

export default connect(null, mapDispatchToProps)(Question);
