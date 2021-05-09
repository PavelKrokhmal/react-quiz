import React from 'react'
import styles from './Button.module.css'

const Button = props => {
  const cls = [
    styles.Button,
    styles[props.type]
  ]
  return (
    <button className={cls.join(' ')} onClick={props.onClick} disabled={props.disabled}>
        {props.children}
    </button>
  )
}

export default Button