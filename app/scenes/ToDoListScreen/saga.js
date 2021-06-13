import { put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import { toDoListScreenActions, toDoListScreenTypes } from './reducer';
import { dbTransaction } from '../../utils/dbUtils';
import { FIELDS, QUERIES } from '../../database/toDoListTable';

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
export function* fetchToDoList() {
  // const response = yield call(getUser);
  // if (response.ok) {
  //   const { data } = response;
  //   yield put(toDoListScreenActions.successFetchUser(get(data, '0')));
  // } else {
  //   yield put(
  //     toDoListScreenActions.failureFetchUser(
  //       'There was an error while fetching user informations.'
  //     )
  //   );
  // }
  try {
    const {
      rows: { _array }
    } = yield dbTransaction(QUERIES.selectAll, []);
    yield put(toDoListScreenActions.successToDoList(_array));
  } catch (error) {
    yield put(toDoListScreenActions.failureFetchToDoList(error));
  }
}

export function* addToDo(action) {
  try {
    yield dbTransaction(QUERIES.addToDo, [
      action.task,
      moment().valueOf(),
      moment().valueOf()
    ]);
    yield put(toDoListScreenActions.successAddToDo());
    yield fetchToDoList();
  } catch (error) {
    yield put(toDoListScreenActions.failureAddToDo(error));
  }
}

export function* updateToDo(action) {
  const { task } = action;
  try {
    yield dbTransaction(QUERIES.updateToDo, [
      task[FIELDS.IS_FINISHED] === 1 ? 0 : 1,
      moment().valueOf(),
      task[FIELDS.ID]
    ]);
    yield put(toDoListScreenActions.successUpdateToDo());
    yield fetchToDoList();
  } catch (error) {
    yield put(toDoListScreenActions.failureUpdateToDo(error));
  }
}

export default function* searchListContainerSaga() {
  yield takeLatest(toDoListScreenTypes.REQUEST_TO_DO_LIST, fetchToDoList);
  yield takeLatest(toDoListScreenTypes.ADD_TO_DO, addToDo);
  yield takeLatest(toDoListScreenTypes.UPDATE_TO_DO, updateToDo);
}
