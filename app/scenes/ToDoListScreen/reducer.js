import { createActions } from 'reduxsauce';
import { fromJS } from 'immutable';
import produce from 'immer';
export const {
  Types: toDoListScreenTypes,
  Creators: toDoListScreenActions
} = createActions({
  requestToDoList: null,
  successToDoList: ['toDoList'],
  failureToDoList: ['errorMessage'],

  addToDo: ['task'],
  successAddToDo: [],
  failureAddToDo: ['errorMessage'],

  updateToDo: ['task'],
  successUpdateToDo: [],
  failureUpdateToDo: ['errorMessage']
});

export const initialState = fromJS({
  toDoList: [],
  isToDoAdded: null,
  isToDoUpdated: null
});

export const fetchToDoList = state => state.set('errorMessage', null);

export const successFetchToDoList = (state, { toDoList = [] }) =>
  state.set('toDoList', toDoList).set('errorMessage', null);

export const failureFetchToDoList = (state, { errorMessage }) =>
  state.set('toDoList', []).set('errorMessage', errorMessage);

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const exampleContainerReducer = (state = initialState, action) =>
  produce(state, () => {
    switch (action.type) {
      case toDoListScreenTypes.REQUEST_TO_DO_LIST:
        return fetchToDoList(state, action);
      case toDoListScreenTypes.SUCCESS_TO_DO_LIST:
        return successFetchToDoList(state, action);
      case toDoListScreenTypes.FAILURE_TO_DO_LIST:
        return failureFetchToDoList(state, action);
      case toDoListScreenTypes.ADD_TO_DO:
        return state.set('isToDoAdded', null).set('errorMessage', null);
      case toDoListScreenTypes.SUCCESS_ADD_TO_DO:
        return state.set('isToDoAdded', true).set('errorMessage', null);
      case toDoListScreenTypes.FAILURE_ADD_TO_DO:
        return state
          .set('isToDoAdded', false)
          .set('errorMessage', action.error);

      case toDoListScreenTypes.UPDATE_TO_DO:
        return state.set('isToDoUpdated', null).set('errorMessage', null);
      case toDoListScreenTypes.SUCCESS_UPDATE_TO_DO:
        return state.set('isToDoUpdated', true).set('errorMessage', null);
      case toDoListScreenTypes.FAILURE_UPDATE_TO_DO:
        return state
          .set('isToDoUpdated', false)
          .set('errorMessage', action.error);

      default:
        return state;
    }
  });
