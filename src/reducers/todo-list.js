import Immutable from 'immutable';
import { ADD_TODO, UPDATE_TODO, DELETE_TODO, EDIT_MODE_TODO } from '../actions';

const initialState = Immutable.List();

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return state.push(Immutable.Map({
                id: action.id,
                text: action.text,
                done: false,
                editMode: false
            }));
        case DELETE_TODO:
            return state.delete(state.findIndex(item => item.get('id') === action.id));
        case UPDATE_TODO:
            let index = state.findIndex(item => item.get('id') === action.id);

            return state.update(index, item => item.set(action.key, action.value));
        default:
            return state;
    }
}

export default listReducer;