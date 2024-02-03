import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkoutGroupService {

  constructor(private http: HttpClient) { }

  getEquipment() {
    return this.http.get<Equipment[]>('https://localhost:7199/Equipment/getEquipment');
  }
}
