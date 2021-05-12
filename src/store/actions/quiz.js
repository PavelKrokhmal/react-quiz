import axiosQuiz from "../../axios/axios-quiz"
import { 
  FETCH_QUIZES_ERROR, 
  FETCH_QUIZES_START, 
  FETCH_QUIZES_SUCCESS, 
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  RETRY_QUIZ
} from "./actionTypes"

export function fetchQuizes() {
    return async dispatch => {
      dispatch(fetchQuizesStart())
      try {
        const response = await axiosQuiz.get('/quizes.json')
        const quizes = []
        Object.keys(response.data).forEach((key, index) => {
          quizes.push({
            id: key,
            name: `Тест ${ index + 1}`
          })
        })
        dispatch(fetchQuizesSuccess(quizes))
      } catch (error) {
        dispatch(fetchQuizesError(error))
      }
    }
}

export function fetchQuizById(id) {
  return async dispatch => {
    console.log("response.data")
    dispatch(fetchQuizesStart())
    try {
      const response = await axiosQuiz.get(`/quizes/${id}.json`)
      console.log(response.data)
      dispatch(fetchQuizSuccess(response.data))
    } catch (error) {
      dispatch(fetchQuizesError(error))
    }
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  }
}

export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error
  }
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState, 
    results
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ
  }
}

export function quizNextQuestion(activeQuestionNumber) {
  return {
    type: QUIZ_NEXT_QUESTION,
    activeQuestionNumber
  }
}


export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz

    if(state.answerState) {
      const key = Object.keys(state.answerState)[0]
      if(state.answerState[key] === 'success') {
        return
      } 
    }

    const question = state.quiz[state.activeQuestionNumber-1]
    const results = state.results

    if(question.rightAnswerId === answerId) {
      results[question.id] = 'success'
      dispatch(quizSetState({[answerId]: 'success'}, results))
    } else {
      results[question.id] = 'error'
      dispatch(quizSetState({[answerId]: 'error'}, results))
    }

    const timeout = window.setTimeout(() => {
      if (state.activeQuestionNumber === state.quiz.length) {
        dispatch(finishQuiz())
      } else {
        dispatch(quizNextQuestion(state.activeQuestionNumber + 1))
      }
      window.clearTimeout(timeout)
    }, 2000)
  }
}

export function retryQuiz() {
  return {
    type: RETRY_QUIZ
  }
}