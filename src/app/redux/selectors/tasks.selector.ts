import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from '../app.state';
import { combineLatest } from 'rxjs/operators';
import { TaskCategory } from 'src/app/models/task-category';
import { TaskItem } from 'src/app/models/task-item';
import { pipe } from 'rxjs';

export const getTasksState = createFeatureSelector<TasksState>('tasksState');

export const getCaregoryById = (categoryId: string) => createSelector(
    getTasksState, 
    (state: TasksState) => state.categories.find(i => i.id === categoryId)
); 

export const getChildCaregories = (categoryId: string) => createSelector(
    getTasksState, 
    (state: TasksState) => state.categories.filter(i => categoryId ? i.parentId === categoryId : !i.parentId)
); 

export const getChildTasks = (categoryId: string) => createSelector(
    getTasksState, 
    (state: TasksState) => state.tasks.filter(i => categoryId ? i.categoryId === categoryId : !i.categoryId)
); 

export class TasksListViewModel {
    categories: TaskCategory[];
    tasks: TaskItem[];
    current: TaskCategory;
}

export const tasksListViewModel = (categoryId: string) => createSelector(
    getChildCaregories(categoryId),
    getChildTasks(categoryId),
    getCaregoryById(categoryId),
    (categories: TaskCategory[], tasks: TaskItem[], current: TaskCategory) => (<TasksListViewModel>{
        categories,
        tasks,
        current
    })
)