import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  username: any = localStorage.getItem('user');

  constructor(
    public router: Router,
    public snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  /**
   * logOut() clears the user's info from user storage and returns to the welcome screen
   * User must reenter username and password to access the app
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.snackbar.open("Successfully Logged Out", "OK", {
      duration: 2000,
    });
  }
}
