import { Component, OnInit } from '@angular/core';
import { GetUserService, UpdateUserService, DeleteFavoriteService, DeleteUserService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  constructor(
    public fetchApiData1: GetUserService,
    public fetchApiData2: UpdateUserService,
    public fetchApiData3: DeleteFavoriteService,
    public fetchApiData4: DeleteUserService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.fetchApiData1.getUser().subscribe((res: any) => {
      this.user = res;
      console.log(this.user);
      return this.user;
    });
  }

}
