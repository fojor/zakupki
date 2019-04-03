import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from '../app.state';

export const getTasksState = createFeatureSelector<TasksState>('tasksState');

export const getCaregories = createSelector(
    getTasksState, 
    (state: TasksState) => state.categories 
); 

export const getTasks = createSelector(
    getTasksState, 
    (state: TasksState) => state.tasks
);