import { createAction, props } from "@ngrx/store";


export const setViewMood = createAction('[App] Change View Mood',props<{mood:string}>())
