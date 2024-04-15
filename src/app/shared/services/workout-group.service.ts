import { Injectable } from '@angular/core';
import config from '../../../../auth_config.json';
import { HttpClient } from '@angular/common/http';
import { Equipment } from '../models/equipment-interface';

@Injectable({
  providedIn: 'root'
})
export class WorkoutGroupService {

  constructor(private http: HttpClient) { }


}
