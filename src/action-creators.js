import { delay } from 'redux-saga';
import { put, takeEvery, all } from 'redux-saga/effects';
import { ADD_TODO_REQUESTED, ADD_ERROR, ADD_TODO, UPDATE_TODO, DELETE_TODO, EDIT_MODE_TODO, TOGGLE_COMPLETED_LIST } from './actions';

const addTodo = (text, id) => ({
    type: ADD_TODO,
    id, text,
    done: false,
    editMode: false
});

const addTodoRequested = (text) => ({
    type: ADD_TODO_REQUESTED,
    text
});

const addError = (message) => ({
    type: ADD_ERROR,
    message
});

const updateTodo = (key, value, id) => ({
    type: UPDATE_TODO,
    key, value, id
});

const deleteTodo = (id) => ({
    type: DELETE_TODO,
    id
});

const editModeTodo = id => ({
    type: EDIT_MODE_TODO,
    id
});

const toggleCompletedList = () => ({
    type: TOGGLE_COMPLETED_LIST
});

export { addTodo, addTodoRequested, updateTodo, deleteTodo, editModeTodo, toggleCompletedList };