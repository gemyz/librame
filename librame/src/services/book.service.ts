import { Injectable } from '@angular/core';
import * as PouchDB from 'pouchdb';
import cordovaSqlitePlugin from 'pouchdb-adapter-cordova-sqlite';

@Injectable()
export class BookService {
  private _db;
  private _books;

  initDB() {
    PouchDB.plugin(cordovaSqlitePlugin);
    this._db = new PouchDB('books.db', {adapter: 'cordova-sqlite'});
  }

  add(book) {
    return this._db.post(book);
  }

  update(book) {
    return this._db.put(book);
  }

  delete(book) {
    return this._db.remove(book);
  }

  getAll() {

    if (!this._books) {
      return this._db.allDocs({ include_docs: true})
        .then(docs => {

          // Each row has a .doc object and we just want to send an
          // array of book objects back to the calling controller,
          // so let's map the array to contain just the .doc objects.

          this._books = docs.rows.map(row => {
            // Dates are not automatically converted from a string.
            row.doc.Date = new Date(row.doc.Date);
            return row.doc;
          });

          // Listen for changes on the database.
          this._db.changes({ live: true, since: 'now', include_docs: true})
            .on('change', this.onDatabaseChange);

          return this._books;
        });
    } else {
      // Return cached data as a promise
      return Promise.resolve(this._books);
    }
  }
