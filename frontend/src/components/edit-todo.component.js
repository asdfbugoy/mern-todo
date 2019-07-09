import React from 'react'
import axios from 'axios'

export default class EditTodo extends React.Component {

    state = {
        title: '',
        description: '',
        priority: '',
        status: false
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    description: response.data.description,
                    priority: response.data.priority,
                    status: response.data.status
                })
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    onChangeTitle = e => {
        this.setState({
            title: e.target.value
        })
    }

    onChangeDescription = e => {
        this.setState({
            description: e.target.value
        })
    }

    onChangePriority = e => {
        this.setState({
            priority: e.target.value
        })
    }

    onChangeStatus = e => {
        this.setState({
            status: !this.state.status
        })
    }

    onSubmit = e => {
        e.preventDefault();
        console.log(this.state);
        axios.post('http://localhost:4000/todos/update/' + this.props.match.params.id, this.state)
            .then(res => {
                console.log(res.data)
                this.props.history.push('/')
            })


    }

    render() {
        const onClick = e => {
            e.preventDefault()
            axios.post('http://localhost:4000/todos/delete/' + this.props.match.params.id)
                .then(res => {
                    console.log(res.data)
                    this.props.history.push('/')
                })
        }
        return <React.Fragment>
            <h3 align="center">Update Todo</h3>
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
                <div className="form-check">
                    <input className="form-check-input"
                        id="completedCheckbox"
                        type="checkbox"
                        name="completedCheckbox"
                        onChange={this.onChangeStatus}
                        checked={this.state.status}
                        value={this.state.status}
                    />
                    <label className="form-check-label" htmlFor="completedCheckbox">
                        Completed
                        </label>
                </div>

                <br />

                <div className="form-group">
                    <input type="submit" value="Update Todo" className="btn btn-primary mr-2" />
                    <a onClick={onClick} href="" className="btn btn-danger">Delete</a>
                </div>
            </form>
        </React.Fragment>
    }
}