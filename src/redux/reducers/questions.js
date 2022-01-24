import { CLEAN_STATE, NEXT_QUESTION, SAVE_QUESTIONS, TIMER } from '../actions';

const INITIAL_STATE = {
  resultApi: {},
  index: 0,
  timer: 30,
};

const maxLength = 4;

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case NEXT_QUESTION:
    return {
      ...state,
      index: state.index < maxLength && state.index + 1,
    };
  case SAVE_QUESTIONS:
    return {
      ...state,
      resultApi: action.questions,
    };
  case CLEAN_STATE:
    return INITIAL_STATE;
  case TIMER:
    return {
      ...state,
      timer: action.count,
    };
  default:
    return state;
  }
};

export default questions;
