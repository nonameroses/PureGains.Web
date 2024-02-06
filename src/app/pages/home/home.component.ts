import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HomeContentComponent } from './../../components/home-content/home-content.component';
import { HeroComponent } from './../../components/hero/hero.component';
import { LoadingComponent } from './../../components/loading/loading.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { ProfileComponent } from '../profile/profile.component';
import { User } from 'src/app/shared/models/identity-models/user-interface';

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

  constructor(public auth: AuthService) { }
  
  ngOnInit() {
    // Check If user created his profile TODO:

    
    this.auth.user$.subscribe((profile) => {
      this.user = {
        auth0UserId: profile.sub,
        email: profile.email,
        familyName: profile.family_name,
        givenName: profile.given_name,
        nickname: profile.nickname,
      } as User;
      console.log(this.user);
    });

  }
}
