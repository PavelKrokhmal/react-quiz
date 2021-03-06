import styles from './Select.module.css'
import React from 'react'

const Select = props => {
  const htmlFor = `${props.label}-${Math.random()}`
  return (
    <div className={styles.Select}>
        <label htmlFor={htmlFor}>
          {props.label}
        </label>
        <select id={htmlFor} onChange={props.onChange}>
          {props.options.map((option, index) => {
            return (
              <option value={option.value} key={option.value + index}>
                { option.text }
              </option>
            )
          })}
        </select>
    </div>
  )
}

export default Select