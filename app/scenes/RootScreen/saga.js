import { takeLatest } from 'redux-saga/effects';
import NavigationService from 'app/services/NavigationService';
import { rootScreenTypes } from './reducer';
import { dbTransaction } from '../../utils/dbUtils';
import { CREATE_TO_DO_LIST_TABLE } from '../../database/toDoListTable';

/**
 * The startup saga is the place to define behavior to execute when the application starts.
 */
export function* startup() {
  createTables();
  setTimeout(() => NavigationService.navigateAndReset('MainScreen'), 1000);
}

export default function* startUpSaga() {
  yield takeLatest(rootScreenTypes.STARTUP, startup);
}

function createTables() {
  dbTransaction(CREATE_TO_DO_LIST_TABLE);
}
