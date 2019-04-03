import { Action } from '@ngrx/store';
import { TaskCategory } from '../../models/task-category';

export const ADD_CATEGORY = 'Add category';
export const UPDATE_CATEGORY = 'Update category';

export class AddCategoryAction implements Action {
    readonly type = ADD_CATEGORY;
    constructor(public payload: TaskCategory) { }
}
export class UpdateCategoryAction implements Action {
    readonly type = UPDATE_CATEGORY;

    constructor(public payload: TaskCategory) { }
}

export type TasksActions =
    AddCategoryAction |
    UpdateCategoryAction;