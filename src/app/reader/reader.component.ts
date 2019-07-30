import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ReaderService} from "./reader.service";

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {
  private readers = [];
  private reader = [];
  private  tot = 0;
  private isEditing = false;
  private isAddNew = false;
  private estValueSum;
  private infoMsg = { body: "", type: "info"};
  constructor(public readerService: ReaderService,
              private fb: FormBuilder){}
  addReaderForm = this.fb.group({
    name: new FormControl('', Validators.required),
    weeklyReadingGoal: new FormControl('', Validators.required),
    totalMinutesRead: new FormControl('', Validators.minLength(4))
  });
  editReaderForm = this.fb.group({
    name: new FormControl('', Validators.required),
    weeklyReadingGoal: new FormControl('', Validators.required),
    totalMinutesRead: new FormControl('', Validators.minLength(1))
  });


  addReader() {
    let readerID = Math.max.apply(null, this.readers.map(s => s.readerID));
    if (readerID > 0) {
      readerID++;
    } else {
      readerID = 1;
    }
    console.log('the id', readerID);
    this.readerService.addReader({...this.addReaderForm.value, readerID}).subscribe(
      res => {
        const newItem = res.toString();
        console.log('the new item added is',newItem);

        // this.readers.push(newItem);
        this.getReaders();
        this.addReaderForm.reset();
        this.sendInfoMsg("item added successfully.", "success");
      },
      error => console.log(error)
    );
    this.isAddNew = false;
    console.log('the book', this.addReaderForm.value);

    // let id = Math.max.apply(null, this.readers.map(s => s.readerID));
    // if(id > 0){
    //   id++;
    // }else{ id = 1;}
    // console.log('the id',id);
    // this.readers.push({...this.addReaderForm.value,id});
    // this.addReaderForm.reset();
    // this.sendInfoMsg("Reader added successfully.", "success");
    // this.isAddNew = false;
  }

  enableEditing(reader) {
    this.isEditing = true;
    this.reader = reader;
  }

  cancelEditing() {
    this.isEditing = false;
    this.reader = [];
    this.sendInfoMsg("reader editing cancelled.", "warning");
  }
  editReader(reader) {
    this.readerService.editReader(reader).subscribe(
      res => {
        this.isEditing = false;
        // this.readers = reader;
        this.getReaders();
        this.sendInfoMsg("reader edited successfully.", "success");
      },
      error => console.log(error)
    );

    // let index = this.readers.findIndex(x => x.readerID = reader.readerID)
    // this.readers[index] = reader;
    // console.log('the update record',this.readers);
    // this.isEditing = false;
    // this.sendInfoMsg("readers edited successfully.", "success");
  }

  deleteReader(reader) {
    if (window.confirm("Are you really sure you want to permanently delete this reader?")) {

      this.readerService.deleteReader(reader).subscribe(
        res => {
          const pos = this.readers.map(item => {
            return item._id }).indexOf(reader._id);

          this.readers.splice(pos, 1);
          this.sendInfoMsg("reader deleted successfully.", "success");

        },
        error => console.log(error)
      );
    }
  }
  //   if (window.confirm("Are you really sure you want to permanently delete this reader?")) {
  //     var pos = this.readers.map(reader => {
  //       return reader.readerID
  //     }).indexOf(reader.readerID);
  //     this.readers.splice(pos, 1);
  //     this.sendInfoMsg("reader deleted successfully.", "success");
  //   }
  // }
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
    this.addReaderForm.reset();
    this.reader = [];
  }
  getReaders() {
    this.readerService.getReaders().subscribe(
      data => this.readers = data,
      error => console.log(error)
    );
    console.log('the readers are',this.readers);
  }
  ngOnInit() {
    this.getReaders();
    // this.readers = this.readerService.getReaders();
  }

}
