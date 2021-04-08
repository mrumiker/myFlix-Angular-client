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

  /**
   * getUser() is called on view initialization
   * It takes the User info from the database and provides it to the view
   * getFaves is also called
   */
  getUser(): void {
    this.fetchApiData1.getUser().subscribe((res: any) => {
      this.user = res;
      this.getFaves(res.Favorites);
      return this.user;
    });
  }

  /**
   * getFaves takes the array of Movie Ids that represent the user's favorite movies
   * It searches for the Id numbers in the array of All Movies and sets an Array of objects representing all the info on the user's favorite movies 
   * @param faves 
   */
  getFaves(faves: string[]): void {
    this.fetchApiData5.getAllMovies().subscribe((res: any) => {
      this.faves = res.filter((movie: any) => faves.includes(movie._id));
    });
  }

  /**
   * deleteFavorite takes the ID of a movie and deletes that movie from the user's favorites in the database
   * deleteFavorite also deletes the movie from the local "faves" array so that the view can be updated instantly 
   * @param MovieId 
   */

  deleteFavorite(MovieId: string): void {
    this.fetchApiData3.deleteFavorite(MovieId).subscribe(() => {
      this.snackbar.open('Movie Deleted from Favorites', 'OK', {
        duration: 1000,
      });
    });
    this.faves = this.faves.filter((movie: any) => movie._id !== MovieId);
  }

  /**
   * openUpdateProfileDialog() opens a dialog where the user can update user info
   */

  openUpdateProfileDialog(): void {
    this.dialog.open(UpdateProfileDialogComponent, {
      width: '280px'
    });
  }

  /**
   * openSynopsis passes a summary of the movie to a dialog and opens that dialog
   * @param title 
   * @param description 
   * @param imagepath 
   */

  openSynopsis(title: string, description: string, imagepath: string): void {
    this.dialog.open(SynopsisDialogComponent, {
      width: '280px',
      data: { title, description, imagepath }
    });
  }

  /**
   * openGenre passes information about a movie's genre to a dialog and opens that dialog
   * @param name 
   * @param description 
   */

  openGenre(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      width: '280px',
      data: { name, description }
    });
  }

  /**
   * openDirector passes information about a movie's director to a dialog and opens that dialog
   * @param name 
   * @param bio 
   * @param birth 
   * @param death 
   */

  openDirector(name: string, bio: string, birth: string, death: string): void {
    this.dialog.open(DirectorDialogComponent, {
      width: '280px',
      data: { name, bio, birth, death }
    });
  }

  /**
   * deleteUserProfile() deletes the user's profile on the database
   * User info is also cleared from local storage and the user is sent back to the welcome page
   * A dialog is provided to double check whether the user wants to delete profile
   */

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
