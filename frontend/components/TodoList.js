import React from 'react'

export default class TodoList extends React.Component {
  render() {
    return (
      <div id='todos'>
      <h1>Todo App:</h1>
      {
      this.props.todos.reduce((acc, todo) => {
        if(this.props.displayCompletedTasks || !todo.completed) return acc.concat(
          <div onClick={this.props.toggleCompletedStatus(todo.id)} key={todo.id}>{todo.name} {todo.completed ? '✓' : ''}</div>
        )
        return acc
       }, [])
       // Go over reduce method. Why this and not filter?
      } 
    </div>
    )
  }
}
