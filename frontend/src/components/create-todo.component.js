import React from 'react'
import axios from 'axios'

export default class CreateTodo extends React.Component {

    state = {
        title: '',
        description: '',
        priority: '',
        status: false
    }

    onChangeTitle = e => {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription = e => {
        this.setState({
            description: e.target.value
        });
    }

    onChangePriority = e => {
        this.setState({
            priority: e.target.value
        });
    }

    onSubmit = e => {
        e.preventDefault()

        console.log(`Form submitted:`)
        console.log(`Todo Title: ${this.state.todo_description}`)
        console.log(`Todo Description: ${this.state.todo_responsible}`)
        console.log(`Todo Priority: ${this.state.todo_priority}`)

        axios.post('http://localhost:4000/todos/add', this.state)
            .then(res => {
                console.log(res.data)
                this.setState({
                    title: '',
                    description: '',
                    priority: '',
                    status: false
                })
                this.props.history.push('/')
            })
    }

    render() {
        return <div style={{ marginTop: 10 }}>
            <h3>Create New Todo</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Title: </label>
                    <input type="text"
                        className="form-control"
                        value={this.state.title}
                        onChange={this.onChangeTitle}
                    />
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityLow"
                            value="Low"
                            checked={this.state.priority === 'Low'}
                            onChange={this.onChangePriority}
                        />
                        <label className="form-check-label">Low</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityMedium"
                            value="Medium"
                            checked={this.state.priority === 'Medium'}
                            onChange={this.onChangePriority}
                        />
                        <label className="form-check-label">Medium</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityHigh"
                            value="High"
                            checked={this.state.priority === 'High'}
                            onChange={this.onChangePriority}
                        />
                        <label className="form-check-label">High</label>
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Create Todo" className="btn btn-primary" />
                </div>
            </form>
        </div>
    }
}