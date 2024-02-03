import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MuscleGroup } from '../models/muscle-group.interface';

@Injectable({
  providedIn: 'root'
})
export class MuscleGroupService {

  constructor(private http: HttpClient) { }

  getMuscleGroups() {
    return this.http.get<MuscleGroup[]>('https://localhost:7199/MuscleGroups/getMuscleGroups');
  }
}
