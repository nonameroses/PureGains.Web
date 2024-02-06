import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Equipment } from '../models/equipment-interface';
import { User } from '../models/identity-models/user-interface';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private http: HttpClient) { }

  getEquipment() {
    return this.http.get<Equipment[]>('https://localhost:7199/Equipment/getEquipment');
  }
  getUserById(id: string) {
    return this.http.get<User>("https://localhost:7199/MuscleGroups/getMuscleGroups");
  }
}
