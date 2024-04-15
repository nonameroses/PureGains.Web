import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MuscleGroup } from '../models/muscle-group.interface';
import config from '../../../../auth_config.json';

@Injectable({
  providedIn: 'root'
})
export class MuscleGroupService {

  constructor(private http: HttpClient) { }

  getMuscleGroups() {
    return this.http.get<MuscleGroup[]>(`${config.apiUri}/MuscleGroups/getMuscleGroups`);
  }
}
