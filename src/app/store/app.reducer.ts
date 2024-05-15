import { createReducer, on } from "@ngrx/store";
import * as appActions from './app.actions'

export interface AppState{
  currentViewMood:string
}

const initState:AppState ={
  currentViewMood:'grid'
}
export const appReducer=createReducer(initState,
  on(appActions.setViewMood,(state:AppState,action)=>{
    return{
      ...state,
      currentViewMood:action.mood
    }
  })
)
