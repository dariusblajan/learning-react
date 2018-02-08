import uniqueId from 'uuid-v4';
import { ADD_TODO, UPDATE_TODO, DELETE_TODO, EDIT_MODE_TODO, TOGGLE_COMPLETED_LIST } from './actions';

const addTodo = (text) => ({
    type: ADD_TODO,
    id: uniqueId(),
    text: text,
    done: false,
    editMode: false
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

export { addTodo, updateTodo, deleteTodo, editModeTodo, toggleCompletedList };