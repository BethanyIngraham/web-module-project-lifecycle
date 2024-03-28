import React from 'react'
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  
  state = {
      todos: [],
      error: ''
  }

  componentDidMount() {
    axios
    .get(URL)
    .then((res) => this.setState({...this.state, todos: res.data.data}))
    .catch((err) => this.setState({...this.state, error: err.response.data.message}))
  }

  toggleCompleted() {

  }

  handleSubmit() {

  }

  render() {
    return (
      <div>
        <div id='error'>Error: {this.state.error}</div>
        <div id='todo'>
          <h1>Todo App:</h1>
          {this.state.todos.map((todo) => {
          return <div key={todo.id}>{todo.name}</div>
          })}
        </div>
       <form onSubmit={this.handleSubmit}>
        <input type='text' placeholder='type task here'/>
        <button type='submit'>Add Todo</button>
        <button>Clear Completed</button>
       </form>
      </div>
    )
  }
}
