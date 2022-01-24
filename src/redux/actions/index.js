import { getQuestionsApi, getTokenApi } from '../../api';
import { addLocalStorage } from '../../localStorage';

export const GET_TOKEN = 'GET_TOKEN';
export const SAVE_LOGIN = 'SAVE_LOGIN';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const GET_SCORE = 'GET_SCORE';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const GET_ASSERTION = 'GET_ASSERTION';
export const ADD_HASH = 'ADD_HASH';
export const TIMER = 'TIMER';
export const CLEAN_STATE = 'CLEAN_STATE';

export const cleanState = () => ({
  type: CLEAN_STATE,
});

export const addHash = (hash) => ({
  type: ADD_HASH,
  hash,
});

export const getAssertion = () => ({
  type: GET_ASSERTION,
});

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});

export const getToken = (token) => ({
  type: GET_TOKEN,
  token,
});

export const getScore = (score) => ({
  type: GET_SCORE,
  score,
});

export const saveQuestions = (questions) => ({
  type: SAVE_QUESTIONS,
  questions,
});

export const addToken = () => (
  async (dispatch) => {
    let response = await getTokenApi();
    let questions = await getQuestionsApi(response.token);

    if (questions.response_code !== 0) {
      response = await getTokenApi();
      questions = await getQuestionsApi(response.token);
    }

    dispatch(getToken(response.token));
    addLocalStorage('token', response.token);
    dispatch(saveQuestions(questions));
  }
);
export const timer = (count) => ({
  type: TIMER,
  count,
});

export const saveLogin = (name, email) => ({
  type: SAVE_LOGIN,
  name,
  email,
});
