import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateUserService } from '../fetch-api-data.service'
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-profile-dialog',
  templateUrl: './update-profile-dialog.component.html',
  styleUrls: ['./update-profile-dialog.component.scss']
})
export class UpdateProfileDialogComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' }

  constructor(
    public snackbar: MatSnackBar,
    public fetchApiData: UpdateUserService,
    public dialogRef: MatDialogRef<UpdateProfileDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  /**
   * updateUser() takes the data entered by the user and overwrites the info in the database
   * user name is set in local storage in case it has been changed
   */

  updateUser(): void {
    this.fetchApiData.updateUser(this.userData).subscribe((res) => {
      this.dialogRef.close();
      this.snackbar.open('Profile updated', 'OK', {
        duration: 2000,
      });
      localStorage.setItem('user', this.userData.Username);
      setTimeout(function () { window.location.reload() }, 2000);
    },
    )
  }
}
