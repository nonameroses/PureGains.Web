import { Component, Inject } from '@angular/core';
import { faUser, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe, DOCUMENT, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  NgbCollapse,
  NgbDropdown,
  NgbDropdownMenu,
  NgbDropdownToggle,
} from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterLink } from '@angular/router';
import { WorkoutService } from 'src/app/shared/services/workout.service';
import { DataService } from 'src/app/shared/services/data.service';
import { UserService } from 'src/app/shared/services/identity-services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: true,
  imports: [
    FontAwesomeModule,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdown,
    NgbCollapse,
    AsyncPipe,
    NgIf,
    RouterLink,
  ],
})
export class NavBarComponent {
  isCollapsed = true;
  faUser = faUser;
  faPowerOff = faPowerOff;

  constructor(
    public auth: AuthService,
    private router: Router,
    private workoutService: WorkoutService,
    private dataService: DataService,
    private userService: UserService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  loginWithRedirect() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
  }

  navigateToHome(){
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
  navigateToCalendar(){

    this.loadUserWorkouts();
    this.router.navigate(['/calendar']);
  }
  
  loadUserWorkouts() {
    this.auth.user$.subscribe({
      next: (profile) => {
        this.userService.getUserByAuthId(profile.sub).subscribe({
          next: (response) => {
            this.workoutService.getWorkouts(response.id).subscribe({
              next: (workoutResponse) => {
                const events = workoutResponse.map((workout) => ({
                  title: workout.totalDuration ? `Duration: ${workout.totalDuration} mins` : 'Workout Session',
                  start: workout.date,
                }));
               this.dataService.sendData(events);
              },
            });
          },
        });

     
      }});

    
  }
}
