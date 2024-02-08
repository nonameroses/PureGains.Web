import { WorkoutExercise } from "./workout-exercise.interface";

export interface Workout {
    id: number;
    userId: number;
    exercises: WorkoutExercise[];
}