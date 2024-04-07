import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

private dataSource = new BehaviorSubject<any>('initial data');
  data = this.dataSource.asObservable();

  sendData(data: any) {
    this.dataSource.next(data);
  }
}
