import { Action } from '@ngrx/store';
import { TaskCategory } from '../../models/task-category';
import { TaskItem } from '../../models/task-item';

export const ADD_CATEGORY = 'Add category';
export const UPDATE_CATEGORY = 'Update category';
export const ADD_TASK = 'Add task';
export const UPDATE_TASK = 'Update task';

export class AddCategoryAction implements Action {
    readonly type = ADD_CATEGORY;
    constructor(public payload: TaskCategory) { }
}
export class UpdateCategoryAction implements Action {
    readonly type = UPDATE_CATEGORY;

    constructor(public payload: TaskCategory) { }
}
export class AddTaskAction implements Action {
    readonly type = ADD_TASK;
    constructor(public payload: TaskItem) { }
}
export class UpdateTaskAction implements Action {
    readonly type = UPDATE_TASK;
    constructor(public payload: TaskItem) { }
}

export type TasksActions =
    AddCategoryAction       |
    UpdateCategoryAction    |
    AddTaskAction           |
    UpdateTaskAction;