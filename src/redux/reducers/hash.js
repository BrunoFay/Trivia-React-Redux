import { ADD_HASH, CLEAN_STATE } from '../actions';

const INITIAL_STATE = '';

const hash = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_HASH:
    return action.hash;
  case CLEAN_STATE:
    return INITIAL_STATE;
  default:
    return state;
  }
};

export default hash;
