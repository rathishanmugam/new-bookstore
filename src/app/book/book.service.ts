import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import {map,tap,catchError} from "rxjs/operators";
import {Book} from "./book";
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private http: HttpClient) { }

  // public getBooks():any[]{
  //   return [
  //     { bookID: 1, title: 'Goodnight Moon', author: 'Margaret Wise Brown', publicationYear: 1953 },
  //     { bookID: 2, title: 'Winnie-the-Pooh', author: 'A. A. Milne', publicationYear: 1926 },
  //      { bookID: 3, title: 'Where the Wild Things Are', author: 'Maurice Sendak', publicationYear: 1963 },
  //     { bookID: 4, title: 'The Hobbit', author: 'J. R. R. Tolkien', publicationYear: 1937 },
  //     { bookID: 5, title: 'Curious George', author: 'H. A. Rey', publicationYear: 1941 },
  //     { bookID: 6, title: 'Alice\'s Adventures in Wonderland', author: 'Lewis Carroll', publicationYear: 1865 },
  //     ];
  // }
  getBooks() {
    return this.http.get<Book[]>('/api/book').pipe(
      tap(data => console.log('All BOOK: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  addBook(book) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post('/api/book', JSON.stringify(book), { headers })
      .pipe(
        tap(data => console.log('Add New Book: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  editBook(book) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put(`/api/book/${book._id}`, JSON.stringify(book), { headers })
      .pipe(
        tap((data) => console.log('update Book: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteBook(book) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.delete(`/api/book/${book._id}`, { headers })
      .pipe(
        tap(data => console.log('delete Book: ' + book._id)),
        catchError(this.handleError)
      );
  }

}
