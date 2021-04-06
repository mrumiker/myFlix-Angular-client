import { Component, Input, OnInit } from '@angular/core';
import { GetUserService, UpdateUserService, DeleteFavoriteService, DeleteUserService, GetAllMoviesService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProfileDialogComponent } from '../update-profile-dialog/update-profile-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  faves: any[] = [];
  constructor(
    public fetchApiData1: GetUserService,
    public fetchApiData2: UpdateUserService,
    public fetchApiData3: DeleteFavoriteService,
    public fetchApiData4: DeleteUserService,
    public fetchApiData5: GetAllMoviesService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData1.getUser().subscribe((res: any) => {
      this.user = res;
      this.getFaves(res.Favorites);
      console.log(this.user);
      return this.user;
    });
  }

  getFaves(faves: string[]): void {
    this.fetchApiData5.getAllMovies().subscribe((res: any) => {
      this.faves = res.filter((x: any) => faves.includes(x._id));
      console.log(this.faves)
    });
  }

  deleteFavorite(MovieId: string): void {
    this.fetchApiData3.deleteFavorite(MovieId).subscribe(() => {
      setTimeout(function () { window.location.reload() }, 1000);
      this.snackbar.open('Movie Deleted from Favorites', 'OK', {
        duration: 1000,
      });
    })
  }

  openUpdateProfileDialog(): void {
    this.dialog.open(UpdateProfileDialogComponent, {
      width: '280px'
    });
  }

  deleteUserProfile(): void {
    let ok = confirm("Are you sure you want to delete your profile?\nThis action cannot be undone.");
    if (ok) {
      this.fetchApiData4.deleteUser().subscribe(() => {
        console.log('Profile Deleted')
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackbar.open('Profile Deleted', 'OK', {
          duration: 2000
        });
      });
    } else {
      window.location.reload();
    }
  }
}
