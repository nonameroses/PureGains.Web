import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workout } from '../models/workout.interface';
import { User } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import config from '../../../../auth_config.json';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient) { }

  getWorkouts(userId : number) {
    return this.http.get<Workout[]>(`${config.apiUri}/Workout/getWorkouts?userId=`+userId);
  }


  addWorkout(userId: number) : Observable<any> {
   

    return this.http.put<User>(`${config.apiUri}/Workout/addWorkout?id=`+ userId, userId);
  }
  
}
