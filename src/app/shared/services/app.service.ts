import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

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
      navigator.sendBeacon(`https://localhost:7199/api/User/deleteUser?id=${sessionId}`);
      console.log("Session user deletion triggered.");
    } else {
      console.log("No session user to delete, or not applicable.");
    }
  }
}
