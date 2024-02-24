import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HomeContentComponent } from './home-content.component';
import { Exercise } from 'src/app/shared/models/exercise.interface';
import { MuscleGroup } from 'src/app/shared/models/muscle-group.interface';
import { WorkoutExercise } from 'src/app/shared/models/workout-exercise.interface';

describe('HomeContentComponent', () => {
  let component: HomeContentComponent;
  let fixture: ComponentFixture<HomeContentComponent>;
  
  let   allExercises: Exercise[] = [
    {
      id: 1,
      name: 'Bench-Press',
      description:
        'Using a bench for either hand placement or feet placement, perform a push-up with enough force to lift your body off the ground.',
      youtubeUrl: 'https://www.youtube.com/watch?v=exampleURL',
      primaryMuscleGroupId: 3,
    },
    {
      id: 2,
      name: 'Bench Dips',
      description:
        'Facing away from the bench, place your hands on it and lower your body by bending your elbows, then push back up.',
      youtubeUrl: 'https://www.youtube.com/watch?v=FVjtOSA-dz8',
      primaryMuscleGroupId: 3,
    },
    {
      id: 3,
      name: 'Single-Arm Kettlebell Curl',
      description:
        'Hold a kettlebell in one hand with a neutral grip and curl it towards your shoulder. Repeat on both sides.',
      youtubeUrl: 'https://www.youtube.com/watch?v=exampleURL',
      primaryMuscleGroupId: 2,
    },
    {
      id: 4,
      name: 'Kettlebell Floor Press',
      description:
        'Lie on the floor and press kettlebells upwards, similar to a bench press but with a limited range of motion.',
      youtubeUrl: 'https://www.youtube.com/watch?v=exampleURL',
      primaryMuscleGroupId: 2,
    },
    {
      id: 5,
      name: 'Pull-Up',
      description:
        'Standard push-ups engage the chest, shoulders, and triceps, with hands shoulder-width apart.',
      youtubeUrl: 'https://www.youtube.com/watch?v=sq4VAZ1TtRw',
      primaryMuscleGroupId: 1,
    },
    {
      id: 6,
      name: 'Papa',
      description:
        'Using a bench for either hand placement or feet placement, perform a push-up with enough force to lift your body off the ground.',
      youtubeUrl: 'https://www.youtube.com/watch?v=exampleURL',
      primaryMuscleGroupId: 1,
    },
    {
      id: 7,
      name: 'Baba',
      description:
        'Facing away from the bench, place your hands on it and lower your body by bending your elbows, then push back up.',
      youtubeUrl: 'https://www.youtube.com/watch?v=FVjtOSA-dz8',
      primaryMuscleGroupId: 1,
    },
    {
      id: 1,
      name: 'Bench-Press',
      description:
        'Using a bench for either hand placement or feet placement, perform a push-up with enough force to lift your body off the ground.',
      youtubeUrl: 'https://www.youtube.com/watch?v=exampleURL',
      primaryMuscleGroupId: 3,
    },
    {
      id: 8,
      name: 'Dadad',
      description:
        'Hold a kettlebell in one hand with a neutral grip and curl it towards your shoulder. Repeat on both sides.',
      youtubeUrl: 'https://www.youtube.com/watch?v=exampleURL',
      primaryMuscleGroupId: 3,
    },
    {
      id: 9,
      name: 'Xaxa',
      description:
        'Lie on the floor and press kettlebells upwards, similar to a bench press but with a limited range of motion.',
      youtubeUrl: 'https://www.youtube.com/watch?v=exampleURL',
      primaryMuscleGroupId: 3,
    },
    {
      id: 10,
      name: 'Zazaz',
      description:
        'Standard push-ups engage the chest, shoulders, and triceps, with hands shoulder-width apart.',
      youtubeUrl: 'https://www.youtube.com/watch?v=sq4VAZ1TtRw',
      primaryMuscleGroupId: 3,
    },
  ];

  let workoutExercises: WorkoutExercise[] = [
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

  let selectedMuscleGroupss: MuscleGroup[] = [
    {
      name: 'Chest',
      isSelected: true,
      id: 3,
      imagePath: 'das',
    },
    {
      name: 'Back',
      isSelected: true,
      id: 1,
      imagePath: 'das',
    },
    {
      name: 'Bicps',
      isSelected: true,
      id: 2,
      imagePath: 'das',
    },
  ];

  let   nmg = [
    {
      name: 'Chest',
      exercises: [{ name: 'Bench Press' }, { name: 'Push Up' }],
      showExercises: false,
    },
    {
      name: 'Bicep',
      exercises: [{ name: 'Bicep Curl' }, { name: 'Hammer Curl' }],
      showExercises: false,
    },
  ];
  

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
