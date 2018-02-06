import React from 'react';
import Todo from './Todo.jsx';
import AddTodo from './AddTodo.jsx';
import { connect } from 'react-redux';
import { addTodo, updateTodo, deleteTodo, editModeTodo } from '../action-creators.js';

class TodosList extends React.Component {
    render() {
        return (
            <ul className="actual-list">
                {this.props.data.map(todo => (
                    <Todo
                        key={`task-${todo.id}`}
                        done={todo.done}
                        text={todo.text}
                        id={todo.id}
                        editMode={todo.editMode}
                        toggleEditMode={this.props.toggleEditMode}
                        moveCaretAtEnd={this.props.moveCaretAtEnd}
                        updateTodo={this.props.updateList}
                        deleteTask={this.props.deleteTask}
                    />)
                )}
            </ul>
        );
    }
};

export default @connect(
    state => ({data: state}),
    dispatch => ({
        addTodo(value) {
            return dispatch(addTodo(value));
        },
        updateTodo(id, key, value) {
            return dispatch(updateTodo(key, value, id));
        },
        deleteTodo(id) {
            return dispatch(deleteTodo(id));
        },
        toggleEditTodo(id) {
            return dispatch(editModeTodo(id));
        }
    })
)
class Todos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showCompleted: false, data: []};
    }
    moveCaretAtEnd(e) {
        let tempValue = e.target.value;
        e.target.value = '';
        e.target.value = tempValue;
    }
    createNewTask = (e) => {
        if ((e.which === 13 || !e.which) && e.target.value) {
            this.props.addTodo(e.target.value);
            
            e.target.value = '';
        }
    }
    deleteTask = (id) => e => {
        this.props.deleteTodo(id);
    }
    toggleEditMode = (id) => e => {
        let key = e.target.name;
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        
        this.props.toggleEditTodo(id);
    }
    updateList = (id) => e => {
        let key = e.target.name;
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        
        this.props.updateTodo(id, key, value);
    }
    toggleCompletedList = () => {
        this.setState({showCompleted: !this.state.showCompleted});
    }
    render() {
        const { showCompleted } = this.state;
        const { data } = this.props;
        const buttonIsDisabled = !showCompleted && (data.filter(item => item.done === true).length? false: true);
        
        return (
            <div className="todos-container">
                <AddTodo createNewTask={this.createNewTask} />
                <TodosList
                    data={data.filter(item => item.done == false)}
                    updateList={this.updateList}
                    toggleEditMode={this.toggleEditMode}
                    moveCaretAtEnd={this.moveCaretAtEnd}
                    deleteTask={this.deleteTask}
                    />
                {showCompleted && <hr/> &&
                <TodosList
                    data={data.filter(item => item.done == true)}
                    className="completed-list"
                    updateList={this.updateList}
                    toggleEditMode={this.toggleEditMode}
                    moveCaretAtEnd={this.moveCaretAtEnd}
                    deleteTask={this.deleteTask}
                />}
                <button className="toggle-completed" disabled={buttonIsDisabled} onClick={this.toggleCompletedList}>
                    {showCompleted? 'Hide' : 'Show'} completed todos
                </button>
            </div>
        );
    }
};