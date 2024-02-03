import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Workout } from '../models/workout.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private http: HttpClient) { }

  getWorkouts() {
    return this.http.get<Workout[]>('https://localhost:7199/Workout/getWorkouts');
  }



  
}
