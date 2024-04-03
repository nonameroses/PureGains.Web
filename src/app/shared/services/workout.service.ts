import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workout } from '../models/workout.interface';
import { User } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient) { }

  getWorkouts(userId : number) {
    return this.http.get<Workout[]>('https://localhost:7199/Workout/getWorkouts?userId=' +userId);
  }


  addWorkout(userId: number) : Observable<any> {
   

    return this.http.put<User>('https://localhost:7199/Workout/addWorkout?id=' + userId, userId);
  }
  
}
