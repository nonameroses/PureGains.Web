import { Exercise } from "./exercise.interface";

export interface MuscleGroupExercises {
    name: string,
    exercises: Exercise[]
    showExercises : boolean;
    imagePath: string;
}