import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise.interface';
import config from '../../../../auth_config.json';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private http: HttpClient) { }

  getInitialExercisesForUser(equipmentIds: number[], muscleGroupIds: number[]) {
    const request = {'equipmentIds': equipmentIds, 'muscleGroupIds': muscleGroupIds };

    return this.http.post<Exercise[]>(`${config.apiUri}/Exercises/getInitialExercisesForUser`, request);
  }

  getExercisesForUserWorkout(exerciseIds: number[]) {
    return this.http.post<Exercise[]>(`${config.apiUri}/Exercises/getExercisesForUserWorkout`, exerciseIds);
  }
}
