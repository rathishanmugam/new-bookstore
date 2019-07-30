import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {map,tap,catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import {Reader} from "./reader";

@Injectable({
  providedIn: 'root'
})
export class ReaderService {
  constructor(private http: HttpClient) { }

  // public getReaders():any[]{
  //   return [
  //     { readerID: 1, name: 'Marie', weeklyReadingGoal: 400, totalMinutesRead: 5600 },
  //     { readerID: 2, name: 'Daniel', weeklyReadingGoal: 210, totalMinutesRead: 3000 },
  //     { readerID: 3, name: 'Lanier', weeklyReadingGoal: 140, totalMinutesRead: 600 }
  // ];
  // }
  getReaders() {
    return this.http.get<Reader[]>('/api/reader').pipe(
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

  addReader(reader) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post('/api/reader', JSON.stringify(reader), { headers })
      .pipe(
        tap(data => console.log('Add New Reader: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  editReader(reader) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put(`/api/reader/${reader._id}`, JSON.stringify(reader), { headers })
      .pipe(
        tap((data) => console.log('update Reader: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteReader(reader) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.delete(`/api/reader/${reader._id}`, { headers })
      .pipe(
        tap(data => console.log('delete Reader: ' + reader._id)),
        catchError(this.handleError)
      );
  }

}
