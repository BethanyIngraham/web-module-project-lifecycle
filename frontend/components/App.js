import React from 'react'
import axios from 'axios';


const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  
  state = {
      todos: [],
      error: '',
      todoNameInput: '',
      completed: false
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

  resetForm = () =>  this.setState({ ...this.state, todoNameInput: '' })

  setAxiosResponseError = (err) =>  this.setState({ ...this.state, error: err.response.data.message })

  postATodo = () => {
    axios
    .post(URL, { name: this.state.todoNameInput })
    .then((res) => {
      this.getAllTodos()
      this.resetForm()
    })
    .catch(this.setAxiosResponseError)
  }

  handleFormSubmit = (evt) => {
    evt.preventDefault()
    this.postATodo()
  }

  toggleCompleted = () => {
  
  }

  filterOutCompletedTasks = () => {
   
  }

  render() {
    return (
      <div>
        <div id='error'>{this.state.error}</div>
        <div id='todo'>
          <h1>Todo App:</h1>
          {this.state.todos.map((todo) => {
          return <div key={todo.id}>{todo.name}</div>
          })}
        </div>
        <form onSubmit={this.handleFormSubmit}>
          <input value={this.state.todoNameInput} onChange={this.onInputChange} type='text' placeholder='type task here'/>
          <button type='submit'>Add Todo</button>
          <button>Clear Completed</button>
         </form>
     {/** TodoList component with props */}
     {/** Form component with props */}
      </div>
    )
  }
}
