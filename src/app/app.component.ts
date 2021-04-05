import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { Router } from '@angular/router';

//import { MovieCardComponent } from './movie-card/movie-card.component';
//import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'myFlix-Angular-client';
  username: any = localStorage.getItem('user');

  @ViewChild(MovieCardComponent) child: any;

  constructor(public router: Router) { }

  displayNav: boolean = true;

  ngAfterViewInit() {
    this.displayNav = this.child.displayNav;
  }
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
  //function to open dialog for movies display
  // openMoviesDialog(): void {
  //   this.dialog.open(MovieCardComponent, {
  //     width: '500px'
  //   });
  // }
}
