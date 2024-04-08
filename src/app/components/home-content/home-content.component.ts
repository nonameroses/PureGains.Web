import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
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
import { InputCounter } from 'flowbite';
import type { InputCounterOptions, InputCounterInterface } from 'flowbite';

import { MuscleGroupExercises } from 'src/app/shared/models/muscle-group-exercises';
import {
  ExerciseInProgress,
  WorkoutInProgress,
} from 'src/app/shared/models/workout-exercise-in-progress-interface';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { DataService } from 'src/app/shared/services/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./test.scss'],
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    NavBarComponent,
    FullCalendarModule,
  ],
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
      pageId: 'workoutCustomisePage',
    },
    {
      pageId: 'workoutPage',
    },
  ];
  faLink = faLink;
  isEquipmentSelected: boolean = false;
  isMaximumSetLimitReached = false;
  // Populate from service
  equipment: Equipment[] = [];
  muscleGroups: MuscleGroup[] = [];

  // Populate from user Input
  selectedEquipment: Equipment[] = [];
  selectedMuscleGroups: MuscleGroup[] = [];

  allExercises: Exercise[] = [];
  currentExercises: Exercise[] = [];

  //workoutExercises: WorkoutExercise[] = [];
  id: any;

  // For the Modal
  muscleGroupExercises: MuscleGroupExercises[] = [];

  workoutInProgress: WorkoutInProgress;
  exercisesInProgress: ExerciseInProgress[] = [];

  dummyWorkoutExercises: WorkoutInProgress = {
    id: 1,
    exercises: [
      {
        id: 1,
        name: 'Pull-Up',
        sets: [
          {
            reps: 0,
            isCurrent: true,
            isInProgress: true,
          },
          {
            reps: 0,
            isCurrent: false,
            isInProgress: false,
          },
          {
            reps: 0,
            isCurrent: false,
            isInProgress: false,
          },
        ],
        isFinished: false,
        isCurrent: true,
      },
      {
        id: 2,
        name: 'Deadlift Squats',
        sets: [
          {
            reps: 0,
            isCurrent: false,
            isInProgress: false,
          },
          {
            reps: 0,
            isCurrent: false,
            isInProgress: false,
          },
          {
            reps: 0,
            isCurrent: false,
            isInProgress: false,
          },
        ],
        isFinished: false,
        isCurrent: false,
      },
      {
        id: 3,
        name: 'Push-Up',
        sets: [
          {
            reps: 0,
            isCurrent: false,
            isInProgress: false,
          },
          {
            reps: 0,
            isCurrent: false,
            isInProgress: false,
          },
          {
            reps: 0,
            isCurrent: false,
            isInProgress: false,
          },
        ],
        isFinished: false,
        isCurrent: false,
      },
      {
        id: 4,
        name: 'Swing',
        sets: [
          {
            reps: 0,
            isCurrent: false,
            isInProgress: false,
          },
          {
            reps: 0,
            isCurrent: false,
            isInProgress: false,
          },
          {
            reps: 0,
            isCurrent: false,
            isInProgress: false,
          },
        ],
        isFinished: false,
        isCurrent: false,
      },
      {
        id: 5,
        name: 'Chin-Up',
        sets: [
          {
            reps: 0,
            isCurrent: false,
            isInProgress: false,
          },
          {
            reps: 0,
            isCurrent: false,
            isInProgress: false,
          },
          {
            reps: 0,
            isCurrent: false,
            isInProgress: false,
          },
        ],
        isFinished: false,
        isCurrent: false,
      },
    ],
    isFinished: false,
  };

  showExercises: boolean = false;

  constructor(
    private equipmentService: EquipmentService,
    private muscleGroupService: MuscleGroupService,
    private workoutService: WorkoutService,
    private workoutExerciseService: WorkoutExerciseService,
    private exerciseService: ExerciseService,
    public auth: AuthService,
    private userService: UserService,
    private dataService: DataService,
    private router: Router
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
            this.user = response;
            this.workoutService.getWorkouts(this.user.id).subscribe({
              next: (response) => {
                const events = response.map((workout) => ({
                  title: workout.totalDuration
                    ? `Duration: ${workout.totalDuration} mins`
                    : 'Workout Session',
                  start: workout.date,
                  // You can include other FullCalendar Event Object properties here
                }));

                this.dataService.sendData(events);
              },
            });
          },
        });
        //this.initialiseWorkout(this.user.id);
      },
      error: (error) => {
        console.error('Error fetching user', error);
      },
    });
  }

  initialiseWorkoutExerciseReps() {
    // Select all input elements that include 'increment-input-' in their ID
    const inputElements = document.querySelectorAll('[id^="reps-input-"]');

    // Optional options with default values and callback functions
    const options: InputCounterOptions = {
      minValue: 0,
      maxValue: 30, // Or some other logic to determine the max value dynamically
    };

    // Instance options object
    const instanceOptions: InstanceOptions = {
      override: true,
    };

    // Loop over each matched element and create an InputCounter instance
    inputElements.forEach(($targetEl, index) => {
      // Adjust the instance options id dynamically based on the current element
      const dynamicInstanceOptions = {
        ...instanceOptions,
        id: `reps-input-${index}`,
      };
      console.log(dynamicInstanceOptions);
      // Create a new InputCounter instance for the current element
      const counterInput: InputCounterInterface = new InputCounter(
        $targetEl as HTMLInputElement,
        null,
        null,
        options,
        dynamicInstanceOptions
      );
    });
  }
  populateMuscleGroupExercises() {
    for (let i = 0; i < this.selectedMuscleGroups.length; i++) {
      this.muscleGroupExercises.push({
        name: this.selectedMuscleGroups[i].name,
        exercises: this.allExercises.filter(
          (x) => x.primaryMuscleGroupId == this.selectedMuscleGroups[i].id
        ),
        showExercises: false,
      });
    }
  }
  addExerciseToWorkout(exercise) {
    this.currentExercises.push(exercise);
    this.modal.hide();
  }
  toggleExercises(muscleGroup: any): void {
    muscleGroup.showExercises = !muscleGroup.showExercises;
  }
  limitExerciseNumber(): Exercise[] {
    var limit: number = 5;
    this.currentExercises = this.allExercises.splice(0, limit);

    return this.currentExercises;
  }

  removeExercise(int: any) {
    this.currentExercises.splice(int, 1)[0];
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
  }
  // initialiseWorkout(id: number){
  //   this.workoutService.addWorkout(id).subscribe({
  //     next: (response) => {
  //       this.workout = response
  //     }
  //   })
  // }
  addRepForSet(exerciseIndex) {
    const newSet = {
      reps: 0,
      isCurrent: false,
      isInProgress: false,
    };

    if (
      this.workoutInProgress.exercises[exerciseIndex].sets.filter(
        (x) => x.isCurrent === true
      ).length >= 3
    ) {
      newSet.isCurrent = true;
      this.workoutInProgress.exercises[exerciseIndex].sets.push(newSet);
    } else {
      this.workoutInProgress.exercises[exerciseIndex].sets.push(newSet);
    }

    this.isMaximumSetLimitReached =
      this.workoutInProgress.exercises[exerciseIndex].sets.length >= 5;
  }
  nextExercise(currentExerciseIndex: number): void {
    if (
      currentExerciseIndex <
      this.workoutInProgress.exercises.length - 1
    ) {
      this.isMaximumSetLimitReached = false;
      // Mark the current exercise as not in progress
      this.workoutInProgress.exercises[currentExerciseIndex].isCurrent =
        false;
      this.workoutInProgress.exercises[currentExerciseIndex].isFinished =
        true;
      // Mark the next exercise as in progress
      this.workoutInProgress.exercises[currentExerciseIndex + 1].isCurrent =
        true;
      this.workoutInProgress.exercises[
        currentExerciseIndex + 1
      ].sets[0].isCurrent = true;
    }
  }
  onInputChange(
    inputValue: number,
    setIndex: number,
    exerciseIndex: number
  ): void {
    const currentExercise = this.workoutInProgress.exercises[exerciseIndex];

    if (setIndex < currentExercise.sets.length - 1) {
      // Disable current and enable next set in the current exercise

      currentExercise.sets[setIndex + 1].isCurrent = true;
    } else if (
      exerciseIndex <
      this.workoutInProgress.exercises.length - 1
    ) {
      // If it's the last set of the current exercise, disable it and enable the first set of the next exercise
      //currentExercise.sets[setIndex].isCurrent = false;
      this.workoutInProgress.exercises[
        exerciseIndex + 1
      ].sets[0].isCurrent = true;
    }
    // Force Angular to update the view
    this.workoutInProgress.exercises = [
      ...this.workoutInProgress.exercises,
    ];
  }

  buildWorkout() {
    this.workoutService.addWorkout(this.user.id).subscribe({
      next: (response) => {
        this.workoutInProgress = response;

        this.exerciseService
          .getInitialExercisesForUser(
            this.selectedEquipment.map((e) => e.id),
            this.selectedMuscleGroups.map((m) => m.id)
          )
          .subscribe({
            next: (response) => {
              this.allExercises = response;
              this.limitExerciseNumber();
              this.populateMuscleGroupExercises();
            },
          });
      },
    });
  }

  beginWorkout() {
    this.workoutExerciseService
      .addWorkoutExercise(
        this.workoutInProgress.id,
        this.currentExercises.map((x) => x.id)
      )
      .subscribe({
        next: (exerciseIds) => {
          this.exerciseService
            .getExercisesForUserWorkout(exerciseIds)
            .subscribe({
              next: (response) => {
                const exercisesInProgress: ExerciseInProgress[] = response.map(
                  (exercise) => ({
                    id: exercise.id,
                    name: exercise.name,

                    sets: [
                      {
                        reps: 0,
                        isInProgress: false,
                        isCurrent: false,
                      },
                      {
                        reps: 0,
                        isInProgress: false,
                        isCurrent: false,
                      },
                      {
                        reps: 0,
                        isInProgress: false,
                        isCurrent: false,
                      },
                    ],
                    isCurrent: false,
                    isFinished: false,
                  })
                );

                this.workoutInProgress = {
                  id: this.workoutInProgress.id,
                  exercises: exercisesInProgress,
                  isFinished: false,
                };

                this.workoutInProgress.exercises[0].isCurrent = true;
                this.workoutInProgress.exercises[0].sets[0].isCurrent = true;
                this.workoutInProgress.exercises[0].sets[0].isInProgress = true;
                console.log(this.workoutInProgress);
              },
            });
        },
      });
  }
  ngAfterViewInit() {
    this.initialiseModal();
    this.initialiseWorkoutExerciseReps();
  }

  getSelectedEquipment(): Equipment[] {
    this.selectedEquipment = this.equipment.filter((e) => e.isSelected);
    return this.selectedEquipment;
  }
  getSelectedMuscleGroup(event: any): MuscleGroup[] {
    const currentSelectionId = event?.target.id;

    this.selectedMuscleGroups = this.muscleGroups.filter(
      (muscleGroup) => muscleGroup.isSelected
    );

    const isFullBodySelected =
      currentSelectionId === 'Full-Body' &&
      this.selectedMuscleGroups.length > 1;

    this.selectedMuscleGroups.forEach((muscleGroup) => {
      if (muscleGroup.name === 'Full-Body') {
        muscleGroup.isSelected = isFullBodySelected;
      } else {
        muscleGroup.isSelected = !isFullBodySelected;
      }
    });

    this.selectedMuscleGroups = this.selectedMuscleGroups.filter(
      (muscleGroup) => muscleGroup.isSelected
    );

    return this.selectedMuscleGroups;
  }

  progressSelection() {
    if (this.selectedEquipment.length > 0) {
      this.isEquipmentSelected = true;
    }
  }

  finishWorkout() {
    this.router.navigate(['/calendar']);
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
