import React, { Component } from 'react';


// todo component - Smart
class Todo extends Component {
  constructor(){
    super();
    this.state = {
      todos: [
        {title: 'Test Todo'},
        {title: 'Another Todo'}
      ],
      isEdit: false,
      todoToEdit: null
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

  updateTodo = (index, todo) => {
    let todos = this.state.todos;
    todos.splice(index, 1, todo);
    this.setState({todos: todos});

    this.hideEditMode();
  }

  hideEditMode = () => {
    this.setState({isEdit: false, todoToEdit: null});
  }

  showEditMode = (todoIndex) => {
    this.setState({isEdit: true, todoToEdit: todoIndex});
  }

  render() {
    return (
      <div>
        <TodoForm 
          isEdit={this.state.isEdit}
          todoToEdit={this.state.todoToEdit}
          addTodo={this.addTodo}
          updateTodo={this.updateTodo}
          todos={this.state.todos}
        />
        <TodoList
          todos={this.state.todos}
          removeTodo={this.removeTodo}
          showEditMode={this.showEditMode}
        />
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

  // what is this?
  componentWillReceiveProps(nextProps) {
    if (nextProps.isEdit) {
      console.log(nextProps.todos);
      let todo = nextProps.todos[nextProps.todoToEdit];
      this.setState({todoTitle: todo.title});
    }
  }

  handleChange = (e) => {
    // track todo title to the state
    this.setState({todoTitle: e.target.value});
  }

  hanldeSubmit = (e) => {
    e.preventDefault();
    
    if (this.props.isEdit) {
      this.props.updateTodo(this.props.todoToEdit, {title: this.state.todoTitle});
    } else {
      this.props.addTodo({title: this.state.todoTitle});
    }
    // console.log(this.state.todoTitle);
    this.setState({todoTitle: ''});
  }

  render(){
    return (
      <form onSubmit={this.hanldeSubmit}>
        <input onChange={this.handleChange} type="text" name="todo-title" placeholder="Todo Title" value={this.state.todoTitle}/>
        <input type="submit" className="btn btn-primary btn-sm" value={this.props.isEdit ? "Edit" : "Add"} />
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
          <a className="btn btn-sm btn-outline-secondary" onClick={(e) => {e.preventDefault(); this.props.showEditMode(index); }}>Edit</a>
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
