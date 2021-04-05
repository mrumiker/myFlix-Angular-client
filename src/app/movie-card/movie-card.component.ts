import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService, AddFavoriteService, DeleteFavoriteService } from '../fetch-api-data.service';
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
  displayNav = true;
  constructor(
    public fetchApiData: GetAllMoviesService,
    public fetchApiData1: AddFavoriteService,
    public fetchApiData2: DeleteFavoriteService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      console.log(this.movies);
      return this.movies;
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
    this.fetchApiData1.addFavorite(MovieId).subscribe((res) => {
      console.log(res);
      this.snackbar.open('Movie Added to Favorites', 'OK', {
        duration: 2000
      });
    });

  }

}
