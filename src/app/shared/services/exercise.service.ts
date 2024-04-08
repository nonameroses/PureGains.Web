import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise.interface';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) { }

  getInitialExercisesForUser(equipmentIds: number[], muscleGroupIds: number[]) {
    const request = {'equipmentIds': equipmentIds, 'muscleGroupIds': muscleGroupIds };

    return this.http.post<Exercise[]>('https://localhost:7199/Exercises/getInitialExercisesForUser', request);
  }

  getExercisesForUserWorkout(exerciseIds: number[]) {
 

    return this.http.post<Exercise[]>('https://localhost:7199/Exercises/getExercisesForUserWorkout', exerciseIds);
  }
}
