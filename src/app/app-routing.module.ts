import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookComponent} from "./book/book.component";
import {ReaderComponent} from "./reader/reader.component";


const routes: Routes = [
  {path:'book',component:BookComponent},
  {path:'reader',component:ReaderComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
