import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.reducer";

const appStateFeature = createFeatureSelector<AppState>('App')
export const getCurrentViewMood = createSelector(appStateFeature,state => state.currentViewMood)
