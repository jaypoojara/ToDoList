import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { PropTypes } from 'prop-types';
import styled from 'styled-components/native';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import {
  List,
  Checkbox,
  Divider,
  TextInput,
  Button,
  HelperText
} from 'react-native-paper';

import AppContainer from '@atoms/Container';

import { selectIsToDoAdded, selectToDoList } from './selectors';
import { toDoListScreenActions } from './reducer';
import colors from '../../themes/colors';
import { FIELDS } from '../../database/toDoListTable';

/**
 * This is an example of a container component.
 *
 * This screen displays a little help message and informations about a fake user.
 * Feel free to remove it.
 */

const CustomTextInput = styled(TextInput)`
  background-color: ${colors.transparent};
`;

const TaskInputContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

function ToDoListScreen({
  addToDo,
  updateToDo,
  toDoList,
  intl,
  fetchToDoList,
  isToDoAdded
}) {
  const [task, setTask] = React.useState('');
  const [error, setError] = React.useState(null);

  useEffect(() => {
    fetchToDoList();
  }, []);

  useEffect(() => {
    if (isToDoAdded) setTask('');
  }, [isToDoAdded]);

  const validateTask = taskDetails => {
    setError(taskDetails.length === 0);
    return taskDetails.length > 0;
  };

  const addTask = () => {
    if (!validateTask(task)) {
      return;
    }
    addToDo(task);
  };

  const updateStatusOfTheToDo = taskObject => {
    updateToDo(taskObject);
  };

  return (
    <AppContainer>
      <TaskInputContainer>
        <View style={{ flex: 1, marginRight: 10 }}>
          <CustomTextInput
            label={intl.formatMessage({ id: 'task' })}
            placeholder={intl.formatMessage({
              id: 'submit_assignment_to_gsquad'
            })}
            value={task}
            onChangeText={text => {
              setTask(text);
              validateTask(text);
            }}
          />
          <HelperText type="error" visible={error}>
            Please enter task details
          </HelperText>
        </View>
        <Button
          compact
          style={{ alignSelf: 'center' }}
          mode="contained"
          onPress={addTask}
        >
          {intl.formatMessage({ id: 'add_task' })}
        </Button>
      </TaskInputContainer>
      <FlatList
        ItemSeparatorComponent={() => <Divider />}
        keyExtractor={(item, index) => `${index} - ${item[FIELDS.CREATED_AT]}`}
        data={toDoList}
        renderItem={({ item }) => (
          <List.Item
            onPress={() => updateStatusOfTheToDo(item)}
            title={item[FIELDS.TASK]}
            left={() => (
              <Checkbox.Android
                status={
                  item[FIELDS.IS_FINISHED] === 1 ? 'checked' : 'unchecked'
                }
              />
            )}
          />
        )}
      />
    </AppContainer>
  );
}

ToDoListScreen.propTypes = {
  fetchToDoList: PropTypes.func,
  addToDo: PropTypes.func,
  updateToDo: PropTypes.func,
  toDoList: PropTypes.array,
  intl: PropTypes.object,
  isToDoAdded: PropTypes.bool,
  clearToDoFlag: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  toDoList: selectToDoList(),
  isToDoAdded: selectIsToDoAdded()
});

const mapDispatchToProps = dispatch => ({
  fetchToDoList: () => dispatch(toDoListScreenActions.requestToDoList()),
  addToDo: task => dispatch(toDoListScreenActions.addToDo(task)),
  updateToDo: taskObject =>
    dispatch(toDoListScreenActions.updateToDo(taskObject))
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, injectIntl)(ToDoListScreen);
