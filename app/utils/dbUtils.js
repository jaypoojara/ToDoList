import * as SQLite from 'expo'

function openDatabase() {
  const db = SQLite.openDatabase("db.db");
  return db;
}
