import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

export const selectExampleDomain = state =>
  (state.example || initialState).toJS();

export const selectToDoList = () =>
  createSelector(selectExampleDomain, substate => get(substate, 'toDoList', []));

export const selectErrorMessage = () =>
  createSelector(selectExampleDomain, substate =>
    get(substate, 'errorMessage', null)
  );

export const selectIsToDoAdded = () =>
  createSelector(selectExampleDomain, substate =>
    get(substate, 'isToDoAdded', null)
  );
