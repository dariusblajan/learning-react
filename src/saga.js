import { ADD_TODO_REQUESTED, ADD_TODO } from './actions';
import { addTodo, addError } from './action-creators';
import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import uniqueId from 'uuid-v4';

const createNewTodo = function* (action) {
    try {
        const results = yield call(
            () => axios.get('https://randomuser.me/api/?results=2000')
        );
        yield put({
            text: action.text,
            id: uniqueId(),
            type: ADD_TODO
        });
    } catch(e) {
        console.warn(e);
    }
}
export default function* rootSaga() {
    yield takeEvery(ADD_TODO_REQUESTED, createNewTodo);
}