// const Reducer = (state = {showCompleted: false, data: []}, action = {type: ''}) => {
//     switch (action.type) {
//         case 'ADD_TODO':
//             return {
//                 ...state,
//                 data: listReducer(state.data, action)
//             };
//         case 'DELETE_TODO':            
//             return {
//                 ...state,
//                 data: listReducer(state.data, action)
//             };
//         case 'UPDATE_TODO':
//             return {
//                 ...state,
//                 data: listReducer(state.data, action)
//             };
//         case 'TOGGLE_COMPLETED_LIST':
//             return {
//                 ...state,
//                 showCompleted: !state.showCompleted
//             };
//         default:
//             return state;
//     }
// }

const listReducer = (state = [], action) => {
    let index;

    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todoReducer(state, action)
            ]
        case 'DELETE_TODO':
            index = state.findIndex(item => item.id === action.id);

            return [
                ...state.slice(0, index),
                ...state.slice(index + 1)
            ];
        case 'UPDATE_TODO':
            index = state.findIndex(item => item.id === action.id);

            return [
                ...state.slice(0, index),
                todoReducer(Object.assign({}, state[index]), action),
                ...state.slice(index + 1)
            ];
        case 'EDIT_MODE_TODO':
            return state.map(item => {
                return item.id === action.id?
                    {
                        ...item,
                        editMode: !item.editMode
                    } : {
                        ...item,
                        editMode: false
                    }
            })
        default:
            return state;
    }
}

const todoReducer = (state = {
    id: 0,
    text: '',
    done: false,
    editMode: false
}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                done: false,
                editMode: false
            };
        case 'UPDATE_TODO':
            const { key, value } = action;
            let todo = Object.assign({}, state);
            todo[key] = value;
            
            return todo;
        default:
            return state
    }
}

export default listReducer;
