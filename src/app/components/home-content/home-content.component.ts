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
import { InstanceOptions, Modal, ModalInterface, ModalOptions } from 'flowbite';
@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./test.scss'],
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, NavBarComponent],
})
export class HomeContentComponent {
  modal: ModalInterface;
  activeTab: number = 0;

  user: User = null;
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
  isEquipmentSelected: boolean = false;

  // Populate from service
  equipment: Equipment[] = [];
  muscleGroups: MuscleGroup[] = [];

  // Populate from user Input
  selectedEquipment: Equipment[] = [];
  selectedMuscleGroups: MuscleGroup[] = [];

  currentExercises: Exercise[] = [];
  allExercises: Exercise[] = [
    {
      id: 1,
      name: 'Explosive Push-ups',
      description:
        'Using a bench for either hand placement or feet placement, perform a push-up with enough force to lift your body off the ground.',
      youtubeUrl: 'https://www.youtube.com/watch?v=exampleURL',
    },
    {
      id: 2,
      name: 'Bench Dips',
      description:
        'Facing away from the bench, place your hands on it and lower your body by bending your elbows, then push back up.',
      youtubeUrl: 'https://www.youtube.com/watch?v=FVjtOSA-dz8',
    },
    {
      id: 3,
      name: 'Single-Arm Kettlebell Curl',
      description:
        'Hold a kettlebell in one hand with a neutral grip and curl it towards your shoulder. Repeat on both sides.',
      youtubeUrl: 'https://www.youtube.com/watch?v=exampleURL',
    },
    {
      id: 4,
      name: 'Kettlebell Floor Press',
      description:
        'Lie on the floor and press kettlebells upwards, similar to a bench press but with a limited range of motion.',
      youtubeUrl: 'https://www.youtube.com/watch?v=exampleURL',
    },
    {
      id: 5,
      name: 'Push-up',
      description:
        'Standard push-ups engage the chest, shoulders, and triceps, with hands shoulder-width apart.',
      youtubeUrl: 'https://www.youtube.com/watch?v=sq4VAZ1TtRw',
    },
    {
      id: 6,
      name: 'Papa',
      description:
        'Using a bench for either hand placement or feet placement, perform a push-up with enough force to lift your body off the ground.',
      youtubeUrl: 'https://www.youtube.com/watch?v=exampleURL',
    },
    {
      id: 7,
      name: 'Baba',
      description:
        'Facing away from the bench, place your hands on it and lower your body by bending your elbows, then push back up.',
      youtubeUrl: 'https://www.youtube.com/watch?v=FVjtOSA-dz8',
    },
    {
      id: 8,
      name: 'Dadad',
      description:
        'Hold a kettlebell in one hand with a neutral grip and curl it towards your shoulder. Repeat on both sides.',
      youtubeUrl: 'https://www.youtube.com/watch?v=exampleURL',
    },
    {
      id: 9,
      name: 'Xaxa',
      description:
        'Lie on the floor and press kettlebells upwards, similar to a bench press but with a limited range of motion.',
      youtubeUrl: 'https://www.youtube.com/watch?v=exampleURL',
    },
    {
      id: 10,
      name: 'Zazaz',
      description:
        'Standard push-ups engage the chest, shoulders, and triceps, with hands shoulder-width apart.',
      youtubeUrl: 'https://www.youtube.com/watch?v=sq4VAZ1TtRw',
    },
  ];

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

  constructor(
    private equipmentService: EquipmentService,
    private muscleGroupService: MuscleGroupService,
    private workoutService: WorkoutService,
    private workoutExerciseService: WorkoutExerciseService,
    private exerciseService: ExerciseService,
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
            console.log(response);
            this.user = response;
          },
        });
        //this.initialiseWorkout(this.user.id);
      },
      error: (error) => {
        console.error('Error fetching user', error);
      },
    });

    this.limitExerciseNumber();
  }

  limitExerciseNumber(): Exercise[] {
    var limit: number = 5;
    this.currentExercises = this.allExercises.splice(0, limit);

    return this.currentExercises;
  }

  removeExercise(int: any) {
    this.currentExercises.splice(int, 1);
    console.log(this.currentExercises);
  }
  checkOrInsertUser(user: User) {
    if (!this.user.isProfileCreated) {
      this.userService.addUser(user).subscribe({
        next: (response) => {
          console.log(response);
          return;
        },
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
        this.workoutInProgress = response;

        // this.workoutExerciseService.addWorkoutExercise(this.workoutInProgress.)

        this.exerciseService
          .getExercisesForUser(
            this.selectedEquipment.map((e) => e.id),
            this.selectedMuscleGroups.map((m) => m.id)
          )
          .subscribe({
            next: (response) => {
              this.allExercises = response;
              console.log(this.allExercises);
            },
          });
      },
    });
  }

  ngAfterViewInit() {
    this.initialiseModal();
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
    return this.selectedMuscleGroups;
  }

  progressSelection() {
    if (this.selectedEquipment.length > 0) {
      this.isEquipmentSelected = true;
    }
  }

  public waitAndGoDown(id: string) {
    if (this.selectedEquipment.length > 0) {
      this.waitForElement(id);
      this.isEquipmentSelected = true;
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

  toggleTab(idx: number): void {
    this.activeTab = this.activeTab === idx ? 0 : idx;
    console.log(idx);
    console.log(this.activeTab);
  }

  isTabActive(idx: number): boolean {
    return this.activeTab === idx;
  }
  openModal() {
    this.modal.show();
  }
  initialiseModal() {
    const $modalElement: HTMLElement = document.querySelector('#modalEl');

    const modalOptions: ModalOptions = {
      placement: 'bottom-right',
      backdrop: 'dynamic',
      backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
      closable: true,
      onHide: () => {
        console.log('modal is hidden');
      },
      onShow: () => {
        console.log('modal is shown');
      },
      onToggle: () => {
        console.log('modal has been toggled');
      },
    };

    // instance options object
    const instanceOptions: InstanceOptions = {
      id: 'modalEl',
      override: true,
    };

    this.modal = new Modal($modalElement, modalOptions, instanceOptions);
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
