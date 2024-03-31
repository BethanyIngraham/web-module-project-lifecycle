import React from 'react'
import axios from 'axios'
import Form from './Form'


const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  
  state = {
      todos: [],
      error: '',
      todoNameInput: '', 
      displayCompletedTasks: true
  }

  getAllTodos = () => {
    axios
    .get(URL)
    .then((res) => {
      this.setState({ ...this.state, todos: res.data.data })
    })
    .catch(this.setAxiosResponseError)
  }

  componentDidMount() {
    this.getAllTodos()
   }

  onInputChange = (evt) => {
    const { value } = evt.target
    this.setState({ ...this.state, todoNameInput: value })
  }

  // Keep code dry by using helper functions / variables

  resetForm = () =>  this.setState({ ...this.state, todoNameInput: '' })

  setAxiosResponseError = (err) =>  this.setState({ ...this.state, error: err.response.data.message })

  postATodo = () => {
    axios
    .post(URL, { name: this.state.todoNameInput })
    .then((res) => {
      this.setState({...this.state, todos: this.state.todos.concat(res.data.data)})
      this.resetForm()
    })
    .catch(this.setAxiosResponseError)
  }

  handleFormSubmit = (evt) => {
    evt.preventDefault()
    this.postATodo()
  } 
  // postATodo so you don't have to make a request twice?

  toggleCompletedStatus = id => () => {
   axios
   .patch(`${URL}/${id}`)
   .then(res => {
    this.setState({ ...this.state, todos: this.state.todos.map((todo) => {
      if(todo.id !== id) return todo
      return res.data.data
    })})
   })
   .catch(this.setAxiosResponseError)
  } 
  // What is partial application? Explain this piece of code

  toggleCompletedTasks = () => {
   this.setState({ ...this.state, displayCompletedTasks: !this.state.displayCompletedTasks })
  } 
  

  render() {
    return (
      <div>
        <div id='error'>{this.state.error}</div>
        <div id='todo'>
          <h1>Todo App:</h1>
          {
          this.state.todos.reduce((acc, todo) => {
            if(this.state.displayCompletedTasks || !todo.completed) return acc.concat(
              <div onClick={this.toggleCompletedStatus(todo.id)} key={todo.id}>{todo.name} {todo.completed ? '✓' : ''}</div>
            )
            return acc
           }, [])
           // Go over reduce method. Why this and not filter?
          } 
        </div>
       <Form
        handleFormSubmit={this.handleFormSubmit}
        onInputChange={this.onInputChange}
        toggleCompletedTasks={this.toggleCompletedTasks}
        todoNameInput={this.state.todoNameInput}
        displayCompletedTasks={this.state.displayCompletedTasks}
       />
     {/** TodoList component with props */}
      </div>
    )
  }
}
