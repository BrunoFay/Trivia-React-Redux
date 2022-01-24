import { combineReducers } from 'redux';
import token from './token';
import player from './player';
import questions from './questions';
import hash from './hash';

const rootReducer = combineReducers({ token, player, questions, hash });

export default rootReducer;
