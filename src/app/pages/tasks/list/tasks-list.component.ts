import { Component, ViewChild } from "@angular/core";
import { OnsNavigator, Params } from 'ngx-onsenui';
import { EditTaskComponent } from '../edit/edit-task.component';
import { OnsToolbarElement } from 'onsenui';
import { Title } from '@angular/platform-browser';
import { EditCategoryComponent } from '../edit/edit-category.component';
import { TaskCategory } from '../../../models/task-category';
import { Store, select } from '@ngrx/store';
import { TasksState } from '../../../redux/app.state';
import { OpenCategoryPageAction, OpenEditCategoryPageAction, OpenEditTaskPageAction } from '../../../redux/actions/navigation.actions';
import { TaskItem } from '../../../models/task-item';
import { Observable, from } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { getCaregories } from '../../../redux/selectors/tasks.selector';

@Component({
    selector: 'ons-page',
    templateUrl: './tasks-list.component.html'
})
  
export class TasksListComponent {

    @ViewChild('toolbar') 
    toolbar: any;

    currentCategory: TaskCategory;
    categories$: Observable<TaskCategory[]>;

    constructor(
        private navigator: OnsNavigator,
        private params: Params,
        private store: Store<TasksState>
    ) {
        this.currentCategory = this.params.data.category;

        this.categories$ = this.store
            .pipe(
                select(getCaregories),
                map(value => value.filter(i => this.currentCategory ? i.parentId === this.currentCategory.id : !i.parentId))
            );

                
    }

    ngAfterContentInit() {
        this.toolbar.nativeElement.setVisibility(!!this.currentCategory);
    }

    openCategory(category: TaskCategory) {
        let payload = {
            navigator: this.navigator, 
            data: { category }
        };
        this.store.dispatch(new OpenCategoryPageAction(payload));
    }

    editTask(task: TaskItem) {
        let payload = {
            navigator: this.navigator, 
            data: task
        };
        this.store.dispatch(new OpenEditTaskPageAction(payload));
    }

    createCategory() {
        this.editCategory(null);
    }

    editCategory(category: TaskCategory) {
        let payload = {
            navigator: this.navigator, 
            data: category
        };
        this.store.dispatch(new OpenEditCategoryPageAction(payload));
    }
}