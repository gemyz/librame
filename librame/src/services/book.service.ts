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
