import React, { Component } from 'react';


// todo component - Smart
class Todo extends Component {
  constructor(){
    super();
    this.state = {
      todos: [
        {title: 'Test Todo'},
        {title: 'Another Todo'}
      ]
    };
  }

  addTodo = (todo) => {
    let todos = this.state.todos;
    todos.push(todo);
    this.setState({todos: todos});
  }

  removeTodo = (index) => {
    let todos = this.state.todos;
    todos.splice(index, 1);
    this.setState({todos: todos});
  }

  render() {
    return (
      <div>
        <TodoForm addTodo={this.addTodo}/>
        <TodoList todos={this.state.todos} removeTodo={this.removeTodo}/>
      </div>
    );
  }
}



// form component
class TodoForm extends Component{
  constructor(){
    super()
    // set initial state on initiliaze (super)
    this.state = {todoTitle: ''};
  }

  handleChange = (e) => {
    // track todo title to the state
    this.setState({todoTitle: e.target.value});
  }

  hanldeSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo({title: this.state.todoTitle});
    console.log(this.state.todoTitle);
    this.setState({todoTitle: ''});
  }

  render(){
    return (
      <form onSubmit={this.hanldeSubmit}>
        <input onChange={this.handleChange} type="text" name="todo-title" placeholder="Todo Title" value={this.state.todoTitle}/>
        <input type="submit" className="btn btn-primary btn-sm" value="Add Todo" />
      </form>
    );
  }
}



// list component
class TodoList extends Component{
  
  render(){
    let todosHtml = this.props.todos.map((todo, index) => {
      return (
        <li className="list-group-item" key={todo.title}>
          {todo.title} <a className="btn btn-danger btn-sm text-white" onClick={this.props.removeTodo.bind(this, index)}>Delete</a>
        </li>
      );
    });

    return (
      <ul className="list-group">
        {todosHtml}
      </ul>
    );
  }
}

export default Todo;
