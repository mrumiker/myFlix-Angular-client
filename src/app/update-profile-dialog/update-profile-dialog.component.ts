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

  updateUser(): void {
    this.fetchApiData.updateUser(this.userData).subscribe((res) => {
      this.dialogRef.close();
      this.snackbar.open('Profile updated', 'OK', {
        duration: 2000,
      });
      localStorage.setItem('user', this.userData.Username);
      window.location.reload();
    },
    )
  }
}
