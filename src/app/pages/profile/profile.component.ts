import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { HighlightModule } from 'ngx-highlightjs';
import { map } from 'rxjs/operators';
import { User } from '../../shared/models/identity-models/user-interface';
import { UserService } from 'src/app/shared/services/identity-services/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [HighlightModule, AsyncPipe, NgIf],
})
export class ProfileComponent implements OnInit {
  profileJson: string = null;
  test: any;
  user: User = null;

  constructor(public auth: AuthService) {}

  ngOnInit() {
    this.auth.user$.subscribe((profile) => {
      this.profileJson = JSON.stringify(profile, null, 2);
      this.user = {
        auth0UserId: profile.sub,
        email: profile.email,
        familyName: profile.family_name,
        givenName: profile.given_name,
        nickname: profile.nickname,
      } as User;
    });
    console.log(this.user);
  }
}
