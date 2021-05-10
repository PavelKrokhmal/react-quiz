import React from 'react'
import styles from './Input.module.css'

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched
}

const Input = props => {
  const type = props.type || 'text'
  const cls = [styles.Input]
  const htmlFor = `${type}-${Math.random()}`
  if (isInvalid(props)) {
    cls.push(styles.invalid)
  }
  
  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input id={htmlFor} type={type} value={props.value} onChange={props.onChange}/>
      { isInvalid(props) && <span>{props.errorMessage}</span> }  
    </div>
  )
}

export default Input
