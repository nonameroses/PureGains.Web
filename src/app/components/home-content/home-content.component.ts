import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Equipment } from 'src/app/shared/models/equipment-interface';
import { User } from 'src/app/shared/models/identity-models/user-interface';
import { MuscleGroup } from 'src/app/shared/models/muscle-group.interface';
import { PageSelectionModel } from 'src/app/shared/models/pageSelectionModel-interface';
import { WorkoutExercise } from 'src/app/shared/models/workout-exercise.interface';
import { Workout } from 'src/app/shared/models/workout.interface';
import { EquipmentService } from 'src/app/shared/services/equipment.service';
import { UserService } from 'src/app/shared/services/identity-services/user.service';
import { MuscleGroupService } from 'src/app/shared/services/muscle-group.service';
import { WorkoutExerciseService } from 'src/app/shared/services/workout-exercise.service';
import { WorkoutService } from 'src/app/shared/services/workout.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ExerciseService } from 'src/app/shared/services/exercise.service';
import { Exercise } from 'src/app/shared/models/exercise.interface';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./test.scss'],
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, NavBarComponent],
})
export class HomeContentComponent {
  user: User = null;
  userSubscription: Subscription;
  test: User;
  pages: PageSelectionModel[] = [
    {
      pageId: 'equipment',
    },
    {
      pageId: 'muscleGroupSelection',
    },
    {
      pageId: 'workoutPage',
    },
  ];
  faLink = faLink;
  active: boolean = false;

  selectedEquipment: Equipment[] = [];
  selectedMuscleGroups: MuscleGroup[] = [];

  equipment: Equipment[] = [];
  muscleGroups: MuscleGroup[] = [];


  exercises : Exercise[] = []; 

  workoutInProgress: Workout;

  

  workoutExercises: WorkoutExercise[] = [
    {
      id: 1,
      exerciseId: 1,
      workoutId: 1,
      name: 'Pull-Up',
      isSelected: false,
    },
    {
      id: 1,
      exerciseId: 4,
      workoutId: 1,
      name: 'Chin-Up',
      isSelected: false,
    },
    {
      id: 1,
      exerciseId: 3,
      workoutId: 1,
      name: 'Swing',
      isSelected: false,
    },
    {
      id: 1,
      exerciseId: 2,
      workoutId: 1,
      name: 'Dada',
      isSelected: false,
    },
  ];
  id: any;
  // activeWorkout: Workout = {
  //   id:1,
  //   exercises: this.workoutExercises
  // }

  constructor(
    private equipmentService: EquipmentService,
    private muscleGroupService: MuscleGroupService,
    private workoutService: WorkoutService,
    private workoutExerciseService :WorkoutExerciseService,
    private exerciseService :ExerciseService,
    public auth: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.equipmentService
      .getEquipment()
      .subscribe((response) =>
        (this.equipment = response).map((x) => (x.isSelected = false))
      );

    this.muscleGroupService
      .getMuscleGroups()
      .subscribe((response) =>
        (this.muscleGroups = response).map((x) => (x.isSelected = false))
      );

    this.auth.user$.subscribe({
      next: (profile) => {
        this.user = {
          auth0UserId: profile.sub,
          email: profile.email,
          familyName: profile.family_name,
          givenName: profile.given_name,
          nickname: profile.nickname,
          isProfileCreated: true,
          createdAt: new Date(2012, 0, 1),
        } as User;
        this.checkOrInsertUser(this.user);
        this.userService.getUserByAuthId(this.user.auth0UserId).subscribe({
          next: (response) => {
            console.log(response)
            this.user = response;
          }
        })
        //this.initialiseWorkout(this.user.id);
      },
      error: (error) => {
        console.error('Error fetching user', error);
      },
    });
   
  }
  checkOrInsertUser(user: User){
    if(!this.user.isProfileCreated){
      this.userService.addUser(user).subscribe({
        next: response => {
          console.log(response)
          return
        }
      });
    }
    //this.userService.getUserById()
  }
  // initialiseWorkout(id: number){
  //   this.workoutService.addWorkout(id).subscribe({
  //     next: (response) => {
  //       this.workout = response
  //     }
  //   })
  // }

  buildWorkout() {
    this.workoutService.addWorkout(this.user.id).subscribe({
      next: (response) => {
        this.workoutInProgress = response

       // this.workoutExerciseService.addWorkoutExercise(this.workoutInProgress.)


       this.exerciseService.getExercisesForUser(this.selectedEquipment.map(e => e.id), this.selectedMuscleGroups.map(m => m.id)).subscribe({
        next: (response) => {
          this.exercises = response
          console.log(this.exercises);
        }
       })

       
      }
      


      
    })

    //this.ex
  }
  getSelectedEquipment(): Equipment[] {
    this.selectedEquipment = this.equipment.filter((e) => e.isSelected);
    return this.selectedEquipment;
  }
  getSelectedMuscleGroup(event: any): MuscleGroup[] {
    var currentSelection = event?.target.id;

    this.selectedMuscleGroups = this.muscleGroups.filter((e) => e.isSelected);

    if (
      currentSelection === 'Full-Body' &&
      this.selectedMuscleGroups.length > 1
    ) {
      this.selectedMuscleGroups
        .filter((x) => x.name !== 'Full-Body')
        .map((x) => (x.isSelected = false));

      this.selectedMuscleGroups
        .filter((x) => x.name === 'Full-Body')
        .map((x) => (x.isSelected = true));

      this.selectedMuscleGroups = this.selectedMuscleGroups.filter(
        (x) => x.name === 'Full-Body'
      );
    } else {
      this.selectedMuscleGroups
        .filter((x) => x.name === 'Full-Body')
        .map((x) => (x.isSelected = false));
      this.selectedMuscleGroups = this.selectedMuscleGroups.filter(
        (x) => x.name !== 'Full-Body'
      );
    }
    console.log(this.selectedMuscleGroups);
    return this.selectedMuscleGroups;
  }

  progressSelection() {
    if (this.selectedEquipment.length > 0) {
      this.active = true;
    }
  }

  public waitAndGoDown(id: string) {
    if (this.selectedEquipment.length > 0) {
      this.waitForElement(id);
      this.active = true;
    }
  }

  public waitAndGoUp(id: string) {
    this.waitForElement(id);
  }

  waitForElement(selector: any) {
    let element = document.getElementById(selector);
    if (element) {
      scroll(selector);
      return;
    }
    let observer = new MutationObserver((mutations) => {
      mutations.forEach(function (mutation) {
        let nodes = Array.from(mutation.addedNodes);
        for (var node of nodes) {
          if (node.contains(document.getElementById(selector))) {
            scroll(selector);
            observer.disconnect();
            return;
          }
        }
      });
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  }
}

function scroll(selector: string) {
  const element = document.getElementById(selector);

  if (element !== null) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}
