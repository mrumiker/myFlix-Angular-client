import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService, AddFavoriteService, DeleteFavoriteService, GetFavoritesService, GetUserService } from '../fetch-api-data.service';
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
  user: any = {};
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

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.getFaves();
      return this.movies;
    });
  }

  getFaves(): void {
    this.fetchApiData3.getUser().subscribe((res: any) => {
      this.faves = res.Favorites;
      return this.faves;
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

  addFavorite(MovieId: string) {
    this.fetchApiData1.addFavorite(MovieId).subscribe(() => {
      setTimeout(function () { window.location.reload() }, 500);
      this.snackbar.open('Movie Added to Favorites', 'OK', {
        duration: 500
      });
    });
  }

  deleteFavorite(MovieId: string): void {
    this.fetchApiData2.deleteFavorite(MovieId).subscribe(() => {
      setTimeout(function () { window.location.reload() }, 500);
      this.snackbar.open('Movie Deleted from Favorites', 'OK', {
        duration: 500,
      });
    })
  }

  displayFavesButton(MovieId: string) { //determine whether 'Add to' or 'Delete from Favorites button displayed'
    return this.faves.includes(MovieId);
  }

}
