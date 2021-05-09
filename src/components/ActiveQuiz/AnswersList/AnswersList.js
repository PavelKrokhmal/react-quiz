import React from 'react'
import styles from './AnswersList.module.css'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswersList = props => (
  <ul className={styles.AnswersList}>
    { props.answers.map((answer, index) => {
      return <AnswerItem answer={answer} 
              key={index}
              onAnswerClickHandler={props.onAnswerClickHandler} 
              answerState={props.answerState ? props.answerState[answer.id] : null}
              />
    })}
  </ul>
)

export default AnswersList