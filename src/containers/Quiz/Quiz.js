import React, {Component} from 'react'
import styles from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import axiosQuiz from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'

class Quiz extends Component {
  state = {
    activeQuestionNumber: 1,
    answerState: null, //{[id]: 'success' | 'error'}
    isFinished: false,
    results: {}, //{[id]: success | error}
    quiz: [],
    loading: true
  }

  async componentDidMount() {

    try {
      const response = await axiosQuiz.get(`/quizes/${this.props.match.params.id}.json`)
      const quiz = response.data

      this.setState({
        quiz, loading: false
      })
    } catch (error) {
      console.log(error)
    }

  }

  onAnswerClickHandler = (answerId) => {

    if(this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if(this.state.answerState[key] === 'success') {
        return
      } 
    }

    const question = this.state.quiz[this.state.activeQuestionNumber-1]

    const results = this.state.results

    if(question.rightAnswerId === answerId) {
      results[question.id] = 'success'

      this.setState({
        answerState: {[answerId]: 'success'},
        results
      })

    } else {
      results[question.id] = 'error'
      this.setState({
        answerState: {[answerId]: 'error'},
        results
      })
    }

    const timeout = window.setTimeout(() => {
      if (this.isQuizFinished()) {
        this.setState({
          isFinished: true
        })
      } else {
        this.setState({
          activeQuestionNumber: this.state.activeQuestionNumber + 1,
          answerState: null
        })
      }
      window.clearTimeout(timeout)
    }, 2000)


    console.log(this.state.results)

  }

  isQuizFinished() {
    return this.state.activeQuestionNumber === this.state.quiz.length
  }

  retryHandler = () => {
    this.setState({
      activeQuestionNumber: 1,
      answerState: null,
      isFinished: false,
      results: {}
    })
  }

  render() {
    return (
      <div className={styles.Quiz}>
        <div className={styles.QuizWrapper}>
        <h1>Ответьте на все вопросы</h1>
        {this.state.loading 
          ? <Loader/> 
          : this.state.isFinished 
            ? <FinishedQuiz results={this.state.results} quiz={this.state.quiz} onRetry={this.retryHandler}/> 
            : <ActiveQuiz {...this.state.quiz[this.state.activeQuestionNumber-1]} 
                      onAnswerClickHandler={this.onAnswerClickHandler}
                      activeQuestionNumber={this.state.activeQuestionNumber} 
                      quizLength={this.state.quiz.length}
                      answerState={this.state.answerState}/>
        }
        </div>
      </div>
    )
  }
}

export default Quiz