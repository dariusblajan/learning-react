import { combineReducers } from 'redux';
import listAttributes from './list-attributes';
import todoList from './todo-list';

export default combineReducers({
    todoList, listAttributes
}); 