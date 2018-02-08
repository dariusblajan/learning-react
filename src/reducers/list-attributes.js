import Immutable from 'immutable';

const initialState = Immutable.Map({editModeId: null, showCompleted: false});

const listAttributes = (state = initialState, action) => {
    switch (action.type) {
        case 'EDIT_MODE_TODO':
            return Immutable.Map({
                ...state,
                editModeId: action.id === state.get('editModeId')? null : action.id
            });
        case 'TOGGLE_COMPLETED_LIST':
            return Immutable.Map({
                ...state,
                showCompleted: !state.get('showCompleted')
            });
        default:
            return state;
    }
}

export default listAttributes;