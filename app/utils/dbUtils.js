import * as SQLite from 'expo-sqlite';

export function openDatabase() {
  return SQLite.openDatabase('to_do_list.db');
}

export function dbTransaction(query = '', args = []) {
  const db = openDatabase();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        query,
        args,
        (_, results) => {
          resolve(results);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
}
