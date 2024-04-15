import { Injectable } from '@angular/core';
import { WorkoutExercise } from '../models/workout-exercise.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import config from '../../../../auth_config.json';

@Injectable({
  providedIn: 'root'
})
export class WorkoutExerciseService {

  constructor(private http: HttpClient) { }

  getWorkoutExercise() {
    return this.http.get<WorkoutExercise[]>(`${config.apiUri}/WorkoutExercises/getWorkoutExercises`);
  }

  addWorkoutExercise(workoutId: number, exerciseId: number[]) : Observable<any> {
  
    return this.http.put<WorkoutExercise>(`${config.apiUri}/WorkoutExercises/addWorkoutExercise?workoutId=` + workoutId, exerciseId);
  }
}
