import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
  render() {
    return (
      <div id='todos'>
      <h1>Todo App:</h1>
      {
      this.props.todos.reduce((acc, todo) => {
        if(this.props.displayCompletedTasks || !todo.completed) return acc.concat(
          <Todo
            key={todo.id}
            toggleCompletedStatus={this.props.toggleCompletedStatus}
            todo={todo}
          />
        )
        return acc
       }, [])
       // Go over reduce method. Why this and not filter?
      } 
    </div>
    )
  }
}
