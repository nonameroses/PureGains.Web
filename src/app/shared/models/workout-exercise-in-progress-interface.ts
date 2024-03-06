export interface WorkoutInProgress {
    id: number;

    exercises: ExerciseInProgress[];
    //Isfinhesd
}

export interface ExerciseInProgress {
    id: number;
    name: string,
    sets: Map<number,number>;
    isInProgress : boolean;
    isFinished : boolean;
}