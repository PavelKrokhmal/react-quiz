import React from 'react'
import styles from './AnswerItem.module.css'

const AnswerItem = props => {
  const stl = [styles.AnswerItem]

  if (props.answerState) {
    stl.push(styles[props.answerState])
  }
  
  return (
    <li className={stl.join(' ')} onClick={() => props.onAnswerClickHandler(props.answer.id)}>
      { props.answer.text}
    </li>
  )
}

export default AnswerItem