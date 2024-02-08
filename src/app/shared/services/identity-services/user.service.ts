import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../../../auth_config.json';
import { User } from '../../models/identity-models/user-interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserByAuthId(id: string) {
    return this.http.get<User>(`${config.apiUri}/api/User?id=` + id);
  }

  addUser(request: User) : Observable<any> {
    return this.http.put<User>('https://localhost:7199/api/User', request);
  }
}
