import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { OPEN_CATEGORY_PAGE, OPEN_EDIT_CATEGORY_PAGE, OPEN_EDIT_TASK_PAGE } from '../actions/navigation.actions';
import { OnsNavigator } from 'ngx-onsenui';

import { EditCategoryComponent } from '../../pages/tasks/edit/edit-category.component';
import { TasksListComponent } from '../../pages/tasks/list/tasks-list.component';
import { EditTaskComponent } from '../../pages/tasks/edit/edit-task.component';

@Injectable()
export class NavigationEffects {

    constructor(
        private actions$: Actions
    ) { }


    @Effect({ dispatch: false })
    openCategoryPage$ = this.actions$
        .pipe(
            ofType(OPEN_CATEGORY_PAGE),
            map((action: any) => {
                if (action.payload.navigator) {
                    this.navigateToComponentPage(TasksListComponent, action.payload);
                }
            })
        );

    @Effect({ dispatch: false })
    openEditCategoryPage$ = this.actions$
        .pipe(
            ofType(OPEN_EDIT_CATEGORY_PAGE),
            map((action: any) => {
                if (action.payload.navigator) {
                    this.navigateToComponentPage(EditCategoryComponent, action.payload);
                }
            })
        );

    @Effect({ dispatch: false })
    openEditTaskPage$ = this.actions$
        .pipe(
            ofType(OPEN_EDIT_TASK_PAGE),
            map((action: any) => {
                if (action.payload.navigator) {
                    this.navigateToComponentPage(EditTaskComponent, action.payload);
                }
            })
        );

    private navigateToComponentPage(component: any, payload: any) {
        payload.navigator.element.pushPage(component, { animation: 'slide', data: payload.data });
    }
}