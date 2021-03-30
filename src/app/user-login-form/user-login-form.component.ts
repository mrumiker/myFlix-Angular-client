import { Component, Input, OnInit } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { UserLoginService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

//This import allows you to navigate to movies from login
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-login-form', //custom HTML element defined here
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  logUserIn(): void {
    this.fetchApiData.UserLogin(this.userData).subscribe((result) => {
      this.dialogRef.close(); //closes modal on success
      console.log(result);
      localStorage.setItem('user', result.user.Username);
      localStorage.setItem('token', result.token);
      this.snackBar.open(`${result.user.Username} is logged in`, 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);

    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}
