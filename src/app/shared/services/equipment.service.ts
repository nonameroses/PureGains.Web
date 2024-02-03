import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Equipment } from '../models/equipment-interface';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  constructor(private http: HttpClient) { }

  getEquipment() {
    return this.http.get<Equipment[]>('https://localhost:7199/Equipment/getEquipment');
  }
}
