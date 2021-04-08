import { Component, OnInit } from '@angular/core';
import { GetUserService, UpdateUserService, DeleteFavoriteService, DeleteUserService, GetAllMoviesService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProfileDialogComponent } from '../update-profile-dialog/update-profile-dialog.component';
import { Router } from '@angular/router';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';

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
      return this.user;
    });
  }

  getFaves(faves: string[]): void {
    this.fetchApiData5.getAllMovies().subscribe((res: any) => {
      this.faves = res.filter((movie: any) => faves.includes(movie._id));
    });
  }

  deleteFavorite(MovieId: string): void {
    this.fetchApiData3.deleteFavorite(MovieId).subscribe(() => {
      this.snackbar.open('Movie Deleted from Favorites', 'OK', {
        duration: 1000,
      });
    });
    this.faves = this.faves.filter((movie: any) => movie._id !== MovieId);
  }

  openUpdateProfileDialog(): void {
    this.dialog.open(UpdateProfileDialogComponent, {
      width: '280px'
    });
  }

  openSynopsis(title: string, description: string, imagepath: string): void {
    this.dialog.open(SynopsisDialogComponent, {
      width: '280px',
      data: { title, description, imagepath }
    });
  }

  openGenre(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      width: '280px',
      data: { name, description }
    });
  }

  openDirector(name: string, bio: string): void {
    this.dialog.open(DirectorDialogComponent, {
      width: '280px',
      data: { name, bio }
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
