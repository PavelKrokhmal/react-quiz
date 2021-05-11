import React, {Component} from 'react'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import styles from './Auth.module.css'
import { validate, validateForm } from '../../form/formFramework'
import axios from 'axios'

class Auth extends Component { 

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        shouldValidate: true,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        shouldValidate: true,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }
    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDbf6Tp6I7sYPHglzfHm7aGebKtU9gLmMk', authData)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  registerHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }
    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDbf6Tp6I7sYPHglzfHm7aGebKtU9gLmMk', authData)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  submitHandler = event => {
    event.preventDefault()
  }

  onChangeHandler = (event, controlName) => {
    const formControls = {...this.state.formControls}
    const control = { ...formControls[controlName] }

    control.value = event.target.value
    control.touched = true
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control

    this.setState({
      formControls, isFormValid: validateForm(formControls)
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      return <Input {...this.state.formControls[controlName]} 
        key={index} 
        onChange={event => this.onChangeHandler(event, controlName) }/>
    })
  }

  render() {
    return (
      <div className={styles.Auth}>
        <div>
          <h1>Авторизация</h1>
          <form onSubmit={this.submitHandler} className={styles.AuthForm}>
            {this.renderInputs()}
            <Button type="success" onClick={this.loginHandler} disabled={!this.state.isFormValid}>Войти</Button>
            <Button type="primary" onClick={this.registerHandler} disabled={!this.state.isFormValid}>Зарегистрироваться</Button>
          </form>
        </div>
      </div>
    )
  }
}

export default Auth