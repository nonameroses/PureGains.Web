import { Injectable } from '@angular/core';
import { WorkoutExercise } from '../models/workout-exercise.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutExerciseService {

  constructor(private http: HttpClient) { }

  getWorkoutExercise() {
    return this.http.get<WorkoutExercise[]>('https://localhost:7199/WorkoutExercises/getWorkoutExercises');
  }

  addWorkoutExercise(workoutId: number, exerciseId: number) : Observable<any> {
  
    return this.http.put<WorkoutExercise>('https://localhost:7199/WorkoutExercises/addWorkoutExercise?workoutId=' + workoutId +'&exerciseId=' + exerciseId, exerciseId);
  }
}
