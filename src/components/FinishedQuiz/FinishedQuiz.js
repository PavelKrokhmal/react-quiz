import React from 'react'
import styles from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'

const FinishedQuiz = props => {
  const successCount = Object.keys(props.results)
    .reduce((acc, item) => props.results[item] === 'success' ? acc + 1 : acc, 0)
  return (
    <div className={styles.FinishedQuiz}>
      <ul>
        { props.quiz.map((q, index) => {
          const stl = ['fa', 
            props.results[index + 1] === 'success' ? 'fa-check':'fa-times',
            styles[props.results[index+1]]]
          return (
            <li key={index}>
              <b>{index + 1}</b>.&nbsp;
              {q.question}
              <i className={stl.join(' ')}></i>
            </li>
          )
        })}
      </ul>
      <p>Правильно {successCount} из {props.quiz.length}</p>
      <div>
        <Button onClick={props.onRetry} type={'primary'}>Повторить?</Button>
        <Link to={'/'}>   
          <Button type={'success'}>Перейти в список тестов</Button>
        </Link>
      </div>
    </div>  
  )
}

export default FinishedQuiz