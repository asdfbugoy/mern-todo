import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => {
    const onClick = e => {
        e.preventDefault()
        console.log(props)
        axios.post('http://localhost:4000/todos/remove/' + props.todo._id)
            .then(res => {
                console.log(res.data)
                props.fetchTodos()
            })
    }
    return <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_responsible}</td>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_priority}</td>
        <td>
            <Link to={"/edit/" + props.todo._id}>Edit</Link>
            <a className="ml-3" href="" onClick={onClick}>Remove</a>
        </td>
    </tr>
}


export default class TodoList extends React.Component {

    state = {
        todos: []
    }

    componentDidMount() {
        console.log(this.props)
        this.fetchTodos()
    }

    fetchTodos = () => {
        axios.get('http://localhost:4000/todos/')
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    todoList() {
        return this.state.todos.map((d, i) => <Todo fetchTodos={this.fetchTodos} history={this.props.history} todo={d} key={i} />)
    }

    render() {
        return <React.Fragment>
            <h3>Todos List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }} >
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Responsible</th>
                        <th>Priority</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{this.todoList()}</tbody>
            </table>
        </React.Fragment>
    }
}