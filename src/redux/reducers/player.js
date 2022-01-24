import { CLEAN_STATE, GET_ASSERTION, GET_SCORE, SAVE_LOGIN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_LOGIN:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case GET_SCORE:
    return {
      ...state, score: action.score + state.score,
    };
  case GET_ASSERTION:
    return {
      ...state,
      assertions: state.assertions + 1,
    };
  case CLEAN_STATE:
    return {
      ...state,
      ...INITIAL_STATE,
    };
  default:
    return state;
  }
};

export default player;
