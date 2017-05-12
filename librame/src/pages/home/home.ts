import { Component, NgZone } from "@angular/core";
import { ModalController, NavController, Platform } from 'ionic-angular';
import { BookService } from '../../services/book.service';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public books = [];

  constructor(private bookService: BookService,
              private nav: NavController,
              private platform: Platform,
              private zone: NgZone,
              private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      this.bookService.initDB();

      this.bookService.getAll()
        .then(data => {
          this.zone.run(() => {
            this.books = data;
          });
        })
        .catch(console.error.bind(console));
    });
  }

  showDetail(book) {
    let modal = this.modalCtrl.create(DetailsPage, { book: book });
    modal.present();
  }
}
