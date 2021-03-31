import { Component, OnInit } from '@angular/core';
import { GetUserService, UpdateUserService, DeleteFavoriteService, DeleteUserService, GetAllMoviesService } from '../fetch-api-data.service';

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
    public fetchApiData5: GetAllMoviesService
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
    }
    )
  }

}
