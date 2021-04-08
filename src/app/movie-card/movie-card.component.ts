import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService, AddFavoriteService, DeleteFavoriteService, GetUserService } from '../fetch-api-data.service';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  faves: string[] = [];
  constructor(
    public fetchApiData: GetAllMoviesService,
    public fetchApiData1: AddFavoriteService,
    public fetchApiData2: DeleteFavoriteService,
    public fetchApiData3: GetUserService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * getMovies() function is run when the view is initialized. 
   * It gets the movies from the database and stores them in an array
   * getFaves() is also run here
   */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.getFaves();
      return this.movies;
    });
  }

  /**
   * getFaves() gets the user's info from the database, extracts the Ids of the user's favorite movies, and stores them in an array
   */

  getFaves(): void {
    this.fetchApiData3.getUser().subscribe((res: any) => {
      this.faves = res.Favorites;
      return this.faves;
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
   * addFavorite takes the ID of a movie and adds that movie to the user's favorites in the database
   * addFavorite also adds the movie the local "faves" array so that the view can be updated instantly 
   * @param MovieId 
   */

  addFavorite(MovieId: string) {
    this.fetchApiData1.addFavorite(MovieId).subscribe(() => {
      this.snackbar.open('Movie Added to Favorites', 'OK', {
        duration: 1000,
      });
    });
    this.faves.push(MovieId);
  }

  /**
   * deleteFavorite takes the ID of a movie and deletes that movie from the user's favorites in the database
   * deleteFavorite also deletes the movie from the local "faves" array so that the view can be updated instantly 
   * @param MovieId 
   */

  deleteFavorite(MovieId: string): void {
    this.fetchApiData2.deleteFavorite(MovieId).subscribe(() => {
      this.snackbar.open('Movie Deleted from Favorites', 'OK', {
        duration: 1000,
      });
    });
    this.faves = this.faves.filter((id: string) => id !== MovieId);
  }

  /**
   * displayFavesButton determines whether 'Add to' or 'Delete from Favorites' button is displayed
   * @param MovieId 
   * @returns boolean value: true if Movie is in user's Favorites, false if not
   */

  displayFavesButton(MovieId: string) {
    return this.faves.includes(MovieId);
  }

}
