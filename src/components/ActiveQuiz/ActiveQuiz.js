import styles from './ActiveQuiz.module.css'
import React from 'react'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = (props) => (
  <div className={styles.ActiveQuiz}>
    <p className={styles.Question}>
      <span>
        <strong>{props.activeQuestionNumber }.</strong>&nbsp;
        {props.question}
      </span>
      <small>
        { props.activeQuestionNumber } из {props.quizLength}
      </small>
    </p>
    <AnswersList answers={props.answers}
                onAnswerClickHandler={props.onAnswerClickHandler} 
                answerState={props.answerState}/>
  </div>
)

export default ActiveQuiz