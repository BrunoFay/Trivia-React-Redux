import { CLEAN_STATE, GET_TOKEN } from '../actions';

const INITIAL_STATE = '';

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN:
    return action.token;
  case CLEAN_STATE:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default token;
