import React, {Component} from 'react'
import styles from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button'
import { createControl, validate, validateForm } from '../../form/formFramework'
import Input from '../../components/UI/Input/Input'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Select from '../../components/UI/Select/Select'
import axiosQuiz from '../../axios/axios-quiz'

function createOptionControls(number) {
  return createControl({label: `Вариант ${number}`, errorMessage: 'Значение не может быть пустым!', id: number}, {required: true})
}

function createFormControls() {
  return {
    question: createControl({label: 'Введите вопрос', errorMessage: 'Вопрос не может быть пустым!'}, {required: true}),
    option1: createOptionControls(1),
    option2: createOptionControls(2),
    option3: createOptionControls(3),
    option4: createOptionControls(4),
  }
}

class QuizCreator extends Component { 

  state = {
    quiz: [],
    rightAnswerId: 1,
    isFormValid: false,
    formControls: createFormControls()
  }

  submitHandler = (event) => {
    event.preventDefault()
  }
  
  addQuestionHandler = () => {
    const quiz = [...this.state.quiz]
    const index = quiz.length + 1

    const {question, option1, option2, option3, option4} = this.state.formControls

    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id},
      ]
    }

    quiz.push(questionItem)

    this.setState({quiz, 
      rightAnswerId: 1,
      isFormValid: false,
      formControls: createFormControls()})

  }

  createQuizHandler = async (event) => {
    try {
      await axiosQuiz.post('/quizes.json', this.state.quiz)
      this.setState({quiz: [], 
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls()})
    } catch (error) {
      console.log(error)
    }
  }

  onChangeHandler = (value, controlName) => {
    const formControls = {...this.state.formControls}
    const control = { ...formControls[controlName] }

    control.value = value
    control.touched = true
    control.valid = validate(control.value, control.validation)

    formControls[controlName] = control

    this.setState({
      formControls, isFormValid: validateForm(formControls)
    })
  }


  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (  
        <Auxiliary key={index}>
          <Input {...control} 
            shouldValidate={!!control.validation} 
            onChange={event => this.onChangeHandler(event.target.value, controlName)} />
          { index === 0 && <hr/>}
        </Auxiliary>
      )
    })
  }

  selectChangeHandler = event => {
    this.setState({ rightAnswerId: +event.target.value })
  }

  render() {
    const select = <Select
      label="Выберите правильный ответ"
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        { text: 1, value: 1 },
        { text: 2, value: 2 },
        { text: 3, value: 3 },
        { text: 4, value: 4 },
      ]}
    />

    return (
      <div className={styles.QuizCreator}>
          <div>
            <h1>Создание теста</h1>
            <form onSubmit={this.submitHandler}>
              { this.renderControls() }
              { select }
              <Button onClick={this.addQuestionHandler} type="primary" disabled={!this.state.isFormValid}>
                Добавить вопрос
              </Button>
              <Button onClick={this.createQuizHandler} type="success" disabled={this.state.quiz.length === 0}>
                Создать тест
              </Button>
            </form>
          </div>
      </div>
    )
  }
}

export default QuizCreator