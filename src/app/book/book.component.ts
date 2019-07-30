import {Component, OnInit} from '@angular/core';
import {BookService} from "./book.service";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  private books = [];
  private book = [];
  private tot = 0;
  private isEditing = false;
  private isAddNew = false;
  private infoMsg = {body: "", type: "info"};

  constructor(public bookService: BookService,
              private fb: FormBuilder) {
  }

  addBookForm = this.fb.group({
     // bookID: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    publicationYear: new FormControl('', Validators.required)
  });
  editBookForm = this.fb.group({
     // bookID: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    publicationYear: new FormControl('', Validators.minLength(4))
  });
  get bookID() {
    return this.addBookForm.get('bookID');
  }

  get title() {
    return this.addBookForm.get('title');
  }

  get author() {
    return this.addBookForm.get('author');
  }

  get publicationYear() {
    return this.addBookForm.get('publicationYear');
  }


  addBook() {
    let bookID = Math.max.apply(null, this.books.map(s => s.bookID));
    if (bookID > 0) {
      bookID++;
    } else {
      bookID = 1;
    }
    console.log('the id', bookID);
    this.bookService.addBook({...this.addBookForm.value, bookID}).subscribe(
      res => {
        const newItem = res.toString();
        console.log('the new item added is',newItem);
        // this.books.push(newItem);
        this.getBooks();

        this.addBookForm.reset();
        this.sendInfoMsg("item added successfully.", "success");
      },
      error => console.log(error)
    );
    this.isAddNew = false;
  }

  //   console.log('the book',this.addBookForm.value);
  //
  //   let id = Math.max.apply(null, this.books.map(s => s.bookID));
  //   if(id > 0){
  //     id++;
  //   }else{ id = 1;}
  //   console.log('the id',id);
  //   this.books.push({...this.addBookForm.value,id});
  //   this.addBookForm.reset();
  //   this.sendInfoMsg("book added successfully.", "success");
  //   this.isAddNew = false;
  // }

  enableEditing(book) {
    this.isEditing = true;
    this.book = book;
  }

  cancelEditing() {
    this.isEditing = false;
    this.book = [];
    this.sendInfoMsg("book editing cancelled.", "warning");
  }

  editBook(book) {
    this.bookService.editBook(book).subscribe(
      res => {
        this.isEditing = false;
        // this.books = book;
        this.getBooks();
        this.sendInfoMsg("item edited successfully.", "success");
      },
      error => console.log(error)
    );

    // let index = this.books.findIndex(x => x.bookID = book.bookID)
    // this.books[index] = book;
    // console.log('the update record', this.books);
    // this.isEditing = false;
    // this.sendInfoMsg("books edited successfully.", "success");
  }

  deleteBook(book) {
    if (window.confirm("Are you really sure you want to permanently delete this book?")) {

      this.bookService.deleteBook(book).subscribe(
        res => {
          const pos = this.books.map(item => {
            return item._id}).indexOf(book._id);
          this.books.splice(pos, 1);
          this.sendInfoMsg("item deleted successfully.", "success");

        },
        error => console.log(error)
      );
    }
    // if (window.confirm("Are you really sure you want to permanently delete this book?")) {
    //   var pos = this.books.map(book => {
    //     return book.bookID
    //   }).indexOf(book.bookID);
    //   this.books.splice(pos, 1);
    //   this.sendInfoMsg("book deleted successfully.", "success");
    // }
  }

  sendInfoMsg(body, type, time = 1000) {
    this.infoMsg.body = body;
    this.infoMsg.type = type;
    window.setTimeout(() => this.infoMsg.body = "", time);
  }

  enableAddNew() {
    this.isAddNew = true;
  }

  cancelAddNew() {
    this.isAddNew = false;
    this.addBookForm.reset();
    this.book = [];
  }

  getBooks() {
    this.bookService.getBooks().subscribe(
      data => this.books = data,
      error => console.log(error)
    );
    console.log('the book', this.books);
  }

  ngOnInit() {
    this.getBooks();
    // this.books = this.bookService.getBooks();
  }

}
