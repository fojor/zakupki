import { Action } from '@ngrx/store';

export const OPEN_CATEGORY_PAGE         = 'Open category page';
export const OPEN_EDIT_CATEGORY_PAGE    = 'Open edit category page';
export const OPEN_EDIT_TASK_PAGE        = 'Open edit task page';

export class OpenCategoryPageAction implements Action {
    readonly type = OPEN_CATEGORY_PAGE;
    constructor(public payload: any) { }
}

export class OpenEditCategoryPageAction implements Action {
    readonly type = OPEN_EDIT_CATEGORY_PAGE;
    constructor(public payload: any) { }
}

export class OpenEditTaskPageAction implements Action {
    readonly type = OPEN_EDIT_TASK_PAGE;
    constructor(public payload: any) { }
}