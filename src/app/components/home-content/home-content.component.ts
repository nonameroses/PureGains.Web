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
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Accordion, AccordionItem } from 'flowbite';
@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./test.scss'],
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, NavBarComponent],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*', display: 'table-row' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class HomeContentComponent {
  shouldRotate: boolean = false;
  hasBeenClicked: boolean = false;
  rows = [
    {
      id: 1,
      mainContent: 'Main Content 1',
      detailContent: 'Detail Content 1',
      isExpanded: false,
    },
    {
      id: 2,
      mainContent: 'Main Content 2',
      detailContent: 'Detail Content 2',
      isExpanded: false,
    },
    // Add more rows as needed
  ];

  toggleExpand(row: any): void {
    row.isExpanded = !row.isExpanded;
  }

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

  exercises: Exercise[] = [
    {
      id: 1,
      name: 'Explosive Push-ups',
      description:
        'Using a bench for either hand placement or feet placement, perform a push-up with enough force to lift your body off the ground.',
      youtubeUrl: 'https://www.youtube.com/watch?v=exampleURL',
      isExpandable: false,
    },
    {
      id: 2,
      name: 'Bench Dips',
      description:
        'Facing away from the bench, place your hands on it and lower your body by bending your elbows, then push back up.',
      youtubeUrl: 'https://www.youtube.com/watch?v=FVjtOSA-dz8',
      isExpandable: false,
    },
    {
      id: 3,
      name: 'Single-Arm Kettlebell Curl',
      description:
        'Hold a kettlebell in one hand with a neutral grip and curl it towards your shoulder. Repeat on both sides.',
      youtubeUrl: 'https://www.youtube.com/watch?v=exampleURL',
      isExpandable: false,
    },
    {
      id: 4,
      name: 'Kettlebell Floor Press',
      description:
        'Lie on the floor and press kettlebells upwards, similar to a bench press but with a limited range of motion.',
      youtubeUrl: 'https://www.youtube.com/watch?v=exampleURL',
      isExpandable: false,
    },
    {
      id: 5,
      name: 'Push-up',
      description:
        'Standard push-ups engage the chest, shoulders, and triceps, with hands shoulder-width apart.',
      youtubeUrl: 'https://www.youtube.com/watch?v=sq4VAZ1TtRw',
      isExpandable: false,
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
  // activeWorkout: Workout = {
  //   id:1,
  //   exercises: this.workoutExercises
  // }

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

  zaza() {}
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
              this.exercises = response;
              console.log(this.exercises);
            },
          });
      },
    });

    //this.ex
  }
  ngAfterViewInit() {
    this.da();
    // Your code to initialize the accordion goes here
  }
  da() {
    const accordionElement = document.getElementById('accordion-collapse');
    var accordionItems: AccordionItem[] = [
    
    ];
    // create an array of objects with the id, trigger element (eg. button), and the content element
    for (let i = 0; i < this.exercises.length; i++) {
      accordionItems.push({
        id: `heading-${i + 1}"`, // Increment the id by 1 for each item
        triggerEl: document.querySelector(`#heading-${i + 1}`), // Select the corresponding trigger element
        targetEl: document.querySelector(`#body-${i + 1}`), // Select the corresponding target element
        active: false, // Set the active state
    });
    }
  
    console.log(accordionItems);
    // options with default values
    const options = {
      alwaysOpen: false,
      activeClasses:
        'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white',
      inactiveClasses: 'text-gray-500 dark:text-gray-400',
      onOpen: (item) => {
        console.log('accordion item has been shown');
        console.log(item);
        this.shouldRotate = true;
      },
      onClose: (item) => {
        console.log('accordion item has been hidden');
        console.log(item);
        this.shouldRotate = false;
      },
      onToggle: (item) => {
        console.log('accordion item has been toggled');
        console.log(item);
      },
    };

    // instance options object
    const instanceOptions = {
      id: 'collapse-example',
      override: true,
    };

    const accordion = new Accordion(
      accordionElement,
      accordionItems,
      options,
      instanceOptions
    );
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
