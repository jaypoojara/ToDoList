import moment from 'moment';

export const FIELDS = {
  TABLE_NAME: 'to_do_list',
  ID: 'id',
  TASK: 'task',
  IS_FINISHED: 'is_finished',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at'
};

export const CREATE_TO_DO_LIST_TABLE =
  'CREATE TABLE IF NOT EXISTS "to_do_list" (\n' +
  '\t"id"\tINTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\n' +
  '\t"task"\tTEXT,\n' +
  '\t"is_finished"\tINTEGER DEFAULT 0,\n' +
  '\t"created_at"\tTEXT,\n' +
  '\t"updated_at"\tTEXT\n' +
  ');';

export const QUERIES = {
  selectAll: `SELECT * FROM ${FIELDS.TABLE_NAME}`,
  addToDo: `INSERT INTO to_do_list VALUES (NULL, ?, 0, ?, ?)`,
  updateToDo: `UPDATE to_do_list SET ${FIELDS.IS_FINISHED} = ?, ${FIELDS.UPDATED_AT} = ? WHERE ${FIELDS.ID} = ?`
};
