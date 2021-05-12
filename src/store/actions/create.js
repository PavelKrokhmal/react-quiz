import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATING} from './actionTypes'
import axiosQuiz from '../../axios/axios-quiz'

export function createQuizQuestion(item) {
  return {
    type: CREATE_QUIZ_QUESTION, 
    item
  }
}

export function resetQuizCreating() {
  return {
    type: RESET_QUIZ_CREATING
  }
}

export function finishCreateQuiz() {
  return async (dispatch, getState) => {
    await axiosQuiz.post('/quizes.json', getState().create.quiz)
    dispatch(resetQuizCreating())
  }
}