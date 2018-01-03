import React from 'react';
import ReactDOM from 'react-dom';
import Task from './Task.jsx';
import FontAwesome from 'react-fontawesome';

class TodosList extends React.Component {
    parseList = () => {
        let listItems = this.props.data.filter(item => item.done == this.props.completed);
        listItems = listItems.map(
            todo => (
                <Task
                    key={`task-${todo.id}`}
                    done={todo.done}
                    title={todo.title}
                    id={todo.id}
                    updateTodo={this.props.updateList}
                    createNewTask={this.props.createNewTask}
                    removeLastEmpty={this.props.removeLastEmpty}
                    deleteTask={this.props.deleteTask}
                />
            )
        );

        return listItems;
    }
    render() {
        return (
            <ul className="actual-list">{this.parseList()}</ul>
        );
    }
};

export default class Todos extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [], showCompleted: false };
    }
    createNewTask = (e) => {
        let list = this.state.data;
        let notDoneList = this.state.data.filter(item => item.done != true);
        if ((!notDoneList.length || notDoneList[notDoneList.length - 1].title) && !e.which || e.which === 13 && notDoneList[notDoneList.length - 1].title) {
            let newID = this.props.getID(this.state.data);
            list.push({
                title: '',
                done: false,
                id: newID
            });
            this.setState({
                data: list
            });
        } else if (notDoneList.length && !notDoneList[notDoneList.length - 1].title.length) {
            document.getElementById(`todo-title-${notDoneList[notDoneList.length - 1].id}`).focus();
        }
    }
    deleteTask = (id) => {
        return (e) => {
            if (this.state.data.find(item => item.id === id)) {
                this.setState(prevState => ({
                    data: prevState.data.filter(el => el.id !== id)
                }));
            }
        }
    }
    removeLastEmpty = (id, self) => {
        return (e) => {
            let target = this.state.data.find(item => item.id === id);
            if (e.type.indexOf('key') !== -1 || !target || target.title !== '') {
                return;
            }
            if (id == this.state.data[this.state.data.length - 1].id && id !== 0) {
                this.state.data.splice(this.state.data.length - 1, 1);
                this.setState(this.state);
            } else if (id != this.state.data[this.state.data.length - 1].id) {
                self.titleInput.focus();
            }
        }
    }
    toggleCompleted = () => {
        this.setState({showCompleted: !this.state.showCompleted});
    }
    updateList = (id, self) => {
        return (e) => {
            let target = this.state.data.find(item => item.id === id);
            
            target[e.target.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

            this.setState(this.state);
        }
    }
    render() {
        return (
            <div className="todos-container">
                <div className="add-button">
                    <FontAwesome className="add-todo" onClick={this.createNewTask} tag="i" name="plus" />
                </div>
                <TodosList
                    data={this.state.data}
                    completed={false}
                    updateList={this.updateList}
                    createNewTask={this.createNewTask}
                    removeLastEmpty={this.removeLastEmpty}
                    deleteTask={this.deleteTask}
                />
                {this.state.showCompleted &&
                <TodosList
                    className="completed-list"
                    data={this.state.data}
                    completed={true}
                    updateList={this.updateList}
                    createNewTask={this.createNewTask}
                    removeLastEmpty={this.removeLastEmpty}
                    deleteTask={this.deleteTask}
                />}
                {this.state.data.filter(item => item.done == true).length?
                <button className="toggle-completed" onClick={this.toggleCompleted}>{this.state.showCompleted? 'Hide' : 'Show'} completed todos</button> : ''
                }
            </div>
        );
    }
};