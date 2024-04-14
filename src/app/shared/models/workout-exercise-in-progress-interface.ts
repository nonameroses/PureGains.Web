export interface WorkoutInProgress {
    id: number;
    exercises: ExerciseInProgress[];
    isFinished : boolean;
}

export interface ExerciseInProgress {
    id: number;
    name: string,
    sets: SetInProgress[];
    isCurrent : boolean;
    isFinished : boolean;
    youtubeUrl: string;
}

export interface SetInProgress {
    reps: number;
    isInProgress : boolean;
    isCurrent : boolean;
}