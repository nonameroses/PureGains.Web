import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise.interface';
import config from '../../../../auth_config.json';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  private muscleGroupImages: Record<number, string> = {
    1: '../assets/exercises/letter-b.png',
    2: '../assets/exercises/letter-b.png',
    3: '../assets/exercises/letter-c.png',
    4: '../assets/exercises/letter-t.png',
    5: '../assets/exercises/letter-s.png',
    6: '../assets/exercises/letter-a.png',
    7: '../assets/exercises/letter-l.png',
    8: '../assets/exercises/letter-f.png',
  };

  constructor(private http: HttpClient) { }

  getInitialExercisesForUser(equipmentIds: number[], muscleGroupIds: number[]) {
    const request = {'equipmentIds': equipmentIds, 'muscleGroupIds': muscleGroupIds };

    return this.http.post<Exercise[]>(`${config.apiUri}/Exercises/getInitialExercisesForUser`, request).pipe(
      map(exercises => this.mapExerciseImage(exercises))
    );;
  }

  getExercisesForUserWorkout(exerciseIds: number[]) {
    return this.http.post<Exercise[]>(`${config.apiUri}/Exercises/getExercisesForUserWorkout`, exerciseIds);
  }

  private mapExerciseImage(exercises: Exercise[]): Exercise[] {
    return exercises.map(exercise => ({
      ...exercise,
      imagePath: this.muscleGroupImages[exercise.primaryMuscleGroupId] || 'path/to/default_image.png'
    }));
  }
  
}
