import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import config from '../../../../auth_config.json';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private router: Router) {
    this.listenToRouting();
  }

  private listenToRouting(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.handleNavigation();
      }
    });
  }

  private handleNavigation(): void {
    const sessionId = sessionStorage.getItem('sessionId');
    const isSessionUser = sessionStorage.getItem('isSessionUser');
    
    if (sessionId && isSessionUser === 'true') {
      navigator.sendBeacon(`${config.apiUri}/api/User/deleteUser?id=` + sessionId);
      console.log("Session user deletion triggered.");
    }
  }
}
