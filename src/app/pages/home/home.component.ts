import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HomeContentComponent } from './../../components/home-content/home-content.component';
import { HeroComponent } from './../../components/hero/hero.component';
import { LoadingComponent } from './../../components/loading/loading.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { ProfileComponent } from '../profile/profile.component';
import { User } from 'src/app/shared/models/identity-models/user-interface';
import { UserService } from 'src/app/shared/services/identity-services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    HomeContentComponent,
    HeroComponent,
    ProfileComponent,
    LoadingComponent,
    AsyncPipe,
    NgIf
  ]
})
export class HomeComponent implements OnInit {
  user: User = null;
  userSubscription: Subscription;
  
  constructor(public auth: AuthService, private userService: UserService) { }
  
  ngOnInit() {
    // this.userService.getUserById('string');
    // Check If user created his profile TODO:
    // this.userSubscription = this.auth.user$.subscribe({
    //   next: (profile) => {
    //     this.user = {
    //       auth0UserId: profile.sub,
    //       email: profile.email,
    //       familyName: profile.family_name,
    //       givenName: profile.given_name,
    //       nickname: profile.nickname,
    //       isProfileCreated: true,
    //       createdAt: new Date(2012, 0, 1),
    //     }
    //     this.checkOrInsertUser(this.user);

    //   },
    //   error: (error) => {
    //     console.error('Error fetching user', error);
    //   }
    // });

    // console.log(this.user);
  }
  
  checkOrInsertUser(user: User){
    if(!this.user.isProfileCreated){
      this.userService.addUser(user).subscribe({
        next: response => {
          console.log(response)
          return
        }
      });
    }
    //this.userService.getUserById()
  }
}
