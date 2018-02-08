import React from 'react';
import Immutable from 'immutable';
import Todo from './Todo.jsx';
import AddTodo from './AddTodo.jsx';
import { connect } from 'react-redux';
import { addTodo, updateTodo, deleteTodo, editModeTodo, toggleCompletedList } from '../action-creators.js';

class TodosList extends React.Component {
    render() {
        return (
            <ul className="actual-list">
                {this.props.data.map(todo => (
                    <Todo
                        key={`task-${todo.get('id')}`}
                        done={todo.get('done')}
                        text={todo.get('text')}
                        id={todo.get('id')}
                        editModeId={this.props.editModeId}
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
    state => ({
        data: state.todoList,
        editModeId: state.listAttributes.get('editModeId'),
        showCompleted: state.listAttributes.get('showCompleted')
    }),
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
        },
        toggleCompletedList() {
            return dispatch(toggleCompletedList());
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
        this.props.toggleEditTodo(id);
    }
    updateList = (id) => e => {
        let key = e.target.name;
        let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        
        this.props.updateTodo(id, key, value);
    }
    render() {
        const { data, editModeId, showCompleted } = this.props;
        const buttonIsDisabled = !showCompleted && (data.filter(item => item.get('done') === true).size? false: true);
        
        return (
            <div className="todos-container">
                <AddTodo createNewTask={this.createNewTask} />
                <TodosList
                    data={data.filter(item => item.get('done') === false)}
                    editModeId={editModeId}
                    updateList={this.updateList}
                    toggleEditMode={this.toggleEditMode}
                    moveCaretAtEnd={this.moveCaretAtEnd}
                    deleteTask={this.deleteTask}
                    />
                {showCompleted && <hr/> &&
                <TodosList
                    data={data.filter(item => item.get('done') === true)}
                    editModeId={editModeId}
                    className="completed-list"
                    updateList={this.updateList}
                    toggleEditMode={this.toggleEditMode}
                    moveCaretAtEnd={this.moveCaretAtEnd}
                    deleteTask={this.deleteTask}
                />}
                <button className="toggle-completed" disabled={buttonIsDisabled} onClick={this.props.toggleCompletedList}>
                    {showCompleted? 'Hide' : 'Show'} completed todos
                </button>
            </div>
        );
    }
};