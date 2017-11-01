import React from 'react';
import ReactDOM from 'react-dom';
import Task from './Task.jsx';
import FontAwesome from 'react-fontawesome';

class TodosList extends React.Component {
    parseList = () => {
        let i = -1;
        console.log('data received in list', JSON.stringify(this.props.data.map(item => item.title)));
        let listItems = this.props.data.filter(item => item.done == this.props.completed);
        listItems = listItems.map(
            todo => (
                <Task
                    key={++i}
                    done={todo.done}
                    title={todo.title}
                    index={i}
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
            list.push({
                title: '',
                done: false,
                index: list.length
            });
            this.setState({
                data: list
            });
        } else if (notDoneList.length && !notDoneList[notDoneList.length - 1].title.length) {
            document.getElementById(`todo-title-${notDoneList.length - 1}`).focus();
        }
    }
    deleteTask = (index) => {
        return (e) => {
            if (this.state.data[index]) {
                console.log('deleting from index ' + index, this.state.data[index].title);
                console.log('state before delete', JSON.stringify(this.state.data.map(item => item.title)));

                this.state.data.splice(index, 1);
                console.log('state after delete', JSON.stringify(this.state.data.map(item => item.title)));
                let newData = [].concat(this.state.data);
                this.setState({
                    data: newData
                });
            } else {
                console.log('nothing to delete');
            }
        }
    }
    removeLastEmpty = (index, self) => {
        return (e) => {
            let target = this.state.data.find(item => item.index === index);
            if (target && !target.title && index == this.state.data.length - 1 && index) {
                console.log('removed last empty');
                this.state.data.splice(this.state.data.length - 1, 1);
                this.setState(this.state);
            } else if (!target.title && index != this.state.data.length - 1) {
                self.titleInput.focus();
            }
        }
    }
    toggleCompleted = () => {
        this.setState({showCompleted: !this.state.showCompleted});
    }
    updateList = (index, self) => {
        return (e) => {
            let target = this.state.data.find(item => item.index === index);
            
            target[e.target.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
            this.state.data[index] = target;

            // self.setState({
            //     [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
            // });
            this.setState(this.state);
        }
    }
    render() {
        console.log('rendering list component');
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