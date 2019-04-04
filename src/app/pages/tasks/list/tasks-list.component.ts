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
import { filter, map, subscribeOn } from 'rxjs/operators';
import { getCaregories, getTasks } from '../../../redux/selectors/tasks.selector';

@Component({
    selector: 'ons-page',
    templateUrl: './tasks-list.component.html'
})
  
export class TasksListComponent {

    @ViewChild('toolbar') 
    toolbar: any;

    currentCategory: TaskCategory;
    categories$: Observable<TaskCategory[]>;
    tasks$: Observable<TaskItem[]>;

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

        this.tasks$ = this.store
            .pipe(
                select(getTasks),
                map(value => value.filter(i => this.currentCategory ? i.categoryId === this.currentCategory.id : !i.categoryId))
            );

        this.store
            .pipe(
                select(getCaregories)
            )
            .subscribe(value => {
                if(this.currentCategory) {
                    this.currentCategory = value.find(i => i.id === this.currentCategory.id)
                }
            });                
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

    createTask() {
        let payload = {
            navigator: this.navigator, 
            data: { categoryId: this.currentCategory && this.currentCategory.id }
        };
        this.store.dispatch(new OpenEditTaskPageAction(payload));
    }

    editTask(task: TaskItem) {
        let payload = {
            navigator: this.navigator, 
            data: { task }
        };
        this.store.dispatch(new OpenEditTaskPageAction(payload));
    }

    createCategory() {
        let payload = {
            navigator: this.navigator, 
            data: { parentId: this.currentCategory && this.currentCategory.id }
        };
        this.store.dispatch(new OpenEditCategoryPageAction(payload));
    }

    editCategory(category: TaskCategory) {
        let payload = {
            navigator: this.navigator, 
            data: { category }
        };
        this.store.dispatch(new OpenEditCategoryPageAction(payload));
    }
}