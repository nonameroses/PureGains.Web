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
import { InputCounter } from 'flowbite';
import type { InputCounterOptions, InputCounterInterface } from 'flowbite';

import { MuscleGroupExercises } from 'src/app/shared/models/muscle-group-exercises';
import { WorkoutInProgress } from 'src/app/shared/models/workout-exercise-in-progress-interface';
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
      pageId: 'workoutCustomisePage',
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

  allExercises: Exercise[] = [];
  currentExercises: Exercise[] = [];

  workoutInProgress: Workout;

  workoutExercises: WorkoutExercise[] = [];
  id: any;
  muscleGroupExercises: MuscleGroupExercises[] = [];

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

  repsInputControl(){
   // this.dummyWorkoutExercises.exercises.forEach(x => x.)
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
  }

  limitExerciseNumber(): Exercise[] {
    var limit: number = 5;
    this.currentExercises = this.allExercises.splice(0, limit);
    console.log(this.currentExercises);
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
  addRepForSet(exerciseIndex){
    this.dummyWorkoutExercises.exercises[exerciseIndex].sets.push({
      reps: 0,
      isCurrent: false,
      isInProgress: false,
    },)
  }
  onInputChange(inputValue: number, setIndex: number, exerciseIndex: number): void {
      const currentExercise = this.dummyWorkoutExercises.exercises[exerciseIndex];

      if (setIndex < currentExercise.sets.length - 1) {
        // Disable current and enable next set in the current exercise
        
        currentExercise.sets[setIndex + 1].isCurrent = true;
      } else if (exerciseIndex < this.dummyWorkoutExercises.exercises.length - 1) {
        // If it's the last set of the current exercise, disable it and enable the first set of the next exercise
        currentExercise.sets[setIndex].isCurrent = false;
        this.dummyWorkoutExercises.exercises[exerciseIndex + 1].sets[0].isCurrent = true;
      }
      // Force Angular to update the view
      this.dummyWorkoutExercises.exercises = [...this.dummyWorkoutExercises.exercises];

  }


  // onInputChange(value: any,setIndex: number, exerciseIndex: number) {
  //   // Convert the input value to a number and check your condition
  //   const inputValue = value;
  
  //   // Assuming you want to set isCurrent to true if the number is within a specific range
  //   // Change the condition based on your specific needs


  //   if ( inputValue > 0) {
  //     const nextSetIndex = setIndex + 1;
      
  //     if (nextSetIndex < this.dummyWorkoutExercises.exercises[exerciseIndex].sets.length) {
    


  //       this.dummyWorkoutExercises.exercises[exerciseIndex].sets[nextSetIndex].isCurrent = true;
  //     } else{
  //       const nextSetIndex = setIndex + 0;
  //       const nextExerciseIndex = exerciseIndex + 1;
  //       this.dummyWorkoutExercises.exercises[nextExerciseIndex].sets[nextSetIndex].isCurrent = true;
  //     }


  //     //this.dummyWorkoutExercises.exercises[e + 1].isCurrent = true;
  //   }
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
              this.limitExerciseNumber();
              this.populateMuscleGroupExercises();
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
