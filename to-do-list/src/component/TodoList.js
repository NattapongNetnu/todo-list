import React, { Component } from 'react';
import 'bulma/css/bulma.css';
import Section from './Section';
import { ListItem } from './ListItem';
import { ListButton } from './ListButton';
import axios from 'axios';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            todo: [
                {_id: 0, text: "No more List", check: true }
            ]
        }
        this.addEvent = this.addEvent.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onClickTask = this.onClickTask.bind(this)
        this.removeTask = this.removeTask.bind(this)
        this._handleKeyPressInput = this._handleKeyPressInput.bind(this)
    }

    componentDidMount() {
        this.getByAxios()
    }

    getByAxios() {
        axios.get('https://mobileparadigmtodoapi.herokuapp.com/todo')
            .then(res => this.setState({
                todo: res.data,
                input: ''
            }))
    }

    putByAxios({ _id, check }) {
        axios.put('https://mobileparadigmtodoapi.herokuapp.com/todo', {
            _id,
            check: !check
        })
            .then(() => this.getByAxios())
    }

    postByAxios({ text, check }) {
        axios.post('https://mobileparadigmtodoapi.herokuapp.com/todo', {
            text,
            check
        }).then(() => this.getByAxios())
    }
    deleteByAxios(_id) {
        axios.delete('https://mobileparadigmtodoapi.herokuapp.com/todo',
            {
                data: {
                    _id
                }
            }).then(() => this.getByAxios())
    }

    onChange(btn) {
        this.setState({ input: btn.target.value })
    }

    addEvent() {
        if (this.state.input !== '') {
            const newTodo = {
                text: this.state.input,
                check: true
            }
            this.postByAxios(newTodo)
        }
    }

    removeTask(task) {
        this.deleteByAxios(task.target.id)
    }

    onClickTask(task) {
        this.putByAxios(this.state.todo.filter(todo => todo._id === task.target.id)[0])
    }

    renderListItem() {
        return (
            this.state.todo.map((todo, index) => {
                return (
                    <ListItem todo={todo} onClick={this.onClickTask} key={index} />
                )
            })
        )
    }

    _handleKeyPressInput = (event) => {
        if (event.key === 'Enter') {
            this.addEvent();
        }
    }

    renderListButton() {
        return (
            this.state.todo.map((todo, index) => {
                return (
                    <ListButton todo={todo} key={index} onClick={this.removeTask} />
                );
            })
        )
    }

    render() {
        console.log(this.state.todo)
        return (
            <div>
                <Section class="hero is-medium is-info is-bold">
                    <div className="hero-body">
                        <div className="container has-text-centered">
                            <h1 className="title">
                                To Do List
                            </h1>
                            <div className="columns is-mobile">
                                <div className="column is-11">
                                    <input
                                        className="input"
                                        value={this.state.input}
                                        type="text"
                                        placeholder="Enter Task"
                                        onChange={this.onChange}
                                        onKeyPress={this._handleKeyPressInput}
                                    />
                                </div>
                                <div className="column">
                                    <a className="button is-danger" onClick={this.addEvent}>Add</a>
                                </div>
                            </div>
                            <div className="columns is-mobile">
                                <div className="column is-11">
                                    <nav className="panel">
                                        {this.renderListItem()}
                                    </nav>
                                </div>
                                <div className="column">
                                    {this.renderListButton()}
                                </div>
                            </div>

                        </div>
                    </div>
                </Section>

            </div>
        );
    }
}

export default TodoList;