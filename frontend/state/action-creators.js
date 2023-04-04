// ❗ You don't need to add extra action creators to achieve MVP
import * as types from './action-types';
import axios from 'axios';

export function moveClockwise() {
  return { type: types.MOVE_CLOCKWISE }
}

export function moveCounterClockwise() {
  return { type: types.MOVE_COUNTERCLOCKWISE }
}

export function selectAnswer(answer_id) {
  const payload = answer_id
  return { type: types.SET_SELECTED_ANSWER, payload }
}

export function setMessage(message) {
  const payload = message
  return { type: types.SET_INFO_MESSAGE, payload }
}

export function setQuiz(quiz) {
  const payload = quiz
  return { type: types.SET_QUIZ_INTO_STATE, payload }
}

export function inputChange() { }

export function resetForm() {
  const payload = initial
}

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    dispatch(setQuiz())
    axios.get('http://localhost:9000/api/quiz/next')
      .then(res => {
        dispatch(setQuiz(res.data))
      })
      .catch(err => {
        console.log(err)
      })
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  }
}
export function postAnswer({ quiz_id, answer_id }) {
  return function (dispatch) {
    dispatch(setQuiz())
    axios.post(
      'http://localhost:9000/api/quiz/answer',
      { quiz_id, answer_id }
    )
      .then(res => {
        dispatch(setMessage(res.data.message))
        dispatch(fetchQuiz())
      })
      .catch(err => {
        dispatch(setMessage(err.response.data.message))
      })
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  }
}
export function postQuiz() {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
