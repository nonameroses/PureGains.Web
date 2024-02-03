import { Injectable } from '@angular/core';
import { WorkoutExercise } from '../models/workout-exercise.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkoutExerciseService {

  constructor(private http: HttpClient) { }

  getWorkoutExercise() {
    return this.http.get<WorkoutExercise[]>('https://localhost:7199/WorkoutExercises/getWorkoutExercises');
  }
}
