import React, {Component} from 'react'
import styles from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/quiz'

class Quiz extends Component {

  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id)
  }

  componentWillUnmount() {
    this.props.retryQuiz()
  }

  render() {
    return (
      <div className={styles.Quiz}>
        <div className={styles.QuizWrapper}>
        <h1>Ответьте на все вопросы</h1>
        {this.props.loading || !this.props.quiz
          ? <Loader/> 
          : this.props.isFinished 
            ? <FinishedQuiz 
                results={this.props.results} 
                quiz={this.props.quiz} 
                onRetry={this.props.retryQuiz}/> 
            : <ActiveQuiz 
                      {...this.props.quiz[this.props.activeQuestionNumber-1]} 
                      onAnswerClickHandler={this.props.quizAnswerClick}
                      activeQuestionNumber={this.props.activeQuestionNumber} 
                      quizLength={this.props.quiz.length}
                      answerState={this.props.answerState}/>
        }
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    activeQuestionNumber: state.quiz.activeQuestionNumber,
    answerState: state.quiz.answerState, //{[id]: 'success' | 'error'}
    isFinished: state.quiz.isFinished,
    results: state.quiz.results, //{[id]: success | error}
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(retryQuiz())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)