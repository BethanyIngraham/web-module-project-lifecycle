import React from 'react'
import axios from 'axios';
import TodoList from './TodoList';
import Form from './Form';

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
      this.setState({ ...this.state, todos: res.data.data });
    })
    .catch((err) => {
      this.setState({ ...this.state, error: err.response.data.message });
    })
  }

  componentDidMount() {
    this.getAllTodos();
   }

   onInputChange = evt => {
    const { value } = evt.target;
    this.setState({ ...this.state, todoNameInput: value });
  }

  postATodo = () => {
    axios
    .post(URL, { name: this.state.todoNameInput })
    .then((res) => {
      this.getAllTodos();
      this.setState({ ...this.state, todoNameInput: '' })
    })
    .catch((err) => {
      this.setState({ ...this.state, error: err.response.data.message });
    })
  }

  handleFormSubmit = (evt) => {
    evt.preventDefault();
    this.postATodo();
  }

  toggleCompleted = () => {
    // a todos completed status toggles from false to true and vice versa when clicked
    // PATCH -> deals with the id of the todo
  }

  filterOutCompletedTasks = () => {
    /* when a todos status of completed is set to true, click the hide button and every 
      todo that fits this category will be removed from the list. clicking the button again
      will put them back in the list to show on the page
    */
   
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
