import React from 'react'

export default class Form extends React.Component {
  render() {
    
    return (
    <>
     <form onSubmit={this.props.handleFormSubmit}>
        <input 
        value={this.props.todoNameInput} 
        onChange={this.props.onInputChange} 
        type='text' 
        placeholder='type task here'
        />
        <button type='submit'>Add Todo</button>
     </form>
     <button onClick={this.props.toggleCompletedTasks}>
       {this.props.displayCompletedTasks ? 'Hide' : 'Show'} Completed
     </button>
    </>
    )
  }
  // Everything with a 'this' comes from props
  // this.state is changed to this.props because it becomes stateless once moved from App to Form Component
  // It receives everything from props now - 5 
}
