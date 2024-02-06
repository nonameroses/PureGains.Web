import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../../../auth_config.json';
import { User } from '../../models/identity-models/user-interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserById(id: string) {
    return this.http.get(`${config.apiUri}/api/User?id=` + id);
  }

  addUser(request: User) {
    const user: User = {
      auth0UserId: request.auth0UserId,
      email: request.email,

      givenName: request.givenName,
      familyName: request.familyName,
      nickname: request.nickname,
      createdAt: new Date(2012, 0, 1),
      isProfileCreated: request.isProfileCreated
    };

    return this.http.put<User>(`${config.apiUri}/api/User`, user);
  }
}
