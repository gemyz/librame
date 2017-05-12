import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {BookService} from '../../services/book.service';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
  public book: any = {};
  public isNew = true;
  public action = 'Add';
  public isoDate = '';

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams,
              private bookService: BookService) {

  }
    ionViewDidLoad(){
      let editBook = this.navParams.get('book');

      if (editBook) {
        this.book = editBook;
        this.isNew = false;
        this.action = 'Edit';
        this.isoDate = this.book.Date.toISOString().slice(0, 10);
      }
    }

    save(){
      this.book.Date = new Date(this.isoDate);

      if (this.isNew) {
        this.bookService.add(this.book)
          .catch(console.error.bind(console));
      } else {
        this.bookService.update(this.book)
          .catch(console.error.bind(console));
      }
      this.dismiss();
    }

    delete(){
      this.bookService.delete(this.book)
        .catch(console.error.bind(console));

      this.dismiss();
    }

    dismiss(){
      this.viewCtrl.dismiss(this.book);
    }
  }
