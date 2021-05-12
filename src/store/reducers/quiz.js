import {
  FETCH_QUIZES_ERROR, 
  FETCH_QUIZES_START, 
  FETCH_QUIZES_SUCCESS, 
  FETCH_QUIZ_SUCCESS,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_SET_STATE,
  RETRY_QUIZ
} from "../actions/actionTypes"

const initialState = {
  quizes: [],
  loading: false,
  error: null,

  activeQuestionNumber: 1,
  answerState: null, //{[id]: 'success' | 'error'}
  isFinished: false,
  results: {}, //{[id]: success | error}
  quiz: null
}

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {...state, loading: true}
    case FETCH_QUIZES_SUCCESS:
      return {...state, quizes: action.quizes,  loading: false}
    case FETCH_QUIZES_ERROR:
      return {...state, error: action.error, loading: false}   
    case FETCH_QUIZ_SUCCESS:
      return {...state, quiz: action.quiz, loading: false}
    case QUIZ_SET_STATE:
      return {...state, 
        answerState: action.answerState, 
        results: action.results}
    case FINISH_QUIZ:
      return {...state, isFinished: true}
    case QUIZ_NEXT_QUESTION:
      return {...state, 
        activeQuestionNumber: action.activeQuestionNumber,
        answerState: null
      }
    case RETRY_QUIZ: 
      return {
        ...state,
        activeQuestionNumber: 1,
        answerState: null, //{[id]: 'success' | 'error'}
        isFinished: false,
        results: {}, //{[id]: success | error}
      }
    default:
      return state
  }
}