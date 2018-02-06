import uniqueId from 'uuid-v4';

const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: uniqueId(),
    text: text,
    done: false,
    editMode: false
});

const updateTodo = (key, value, id) => ({
    type: 'UPDATE_TODO',
    key, value, id
});

const deleteTodo = (id) => ({
    type: 'DELETE_TODO',
    id
});

const editModeTodo = id => ({
    type: 'EDIT_MODE_TODO',
    id
});

export { addTodo, updateTodo, deleteTodo, editModeTodo };