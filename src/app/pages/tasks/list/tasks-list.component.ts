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
import { Observable, from, Subject } from 'rxjs';
import { filter, map, subscribeOn, takeUntil } from 'rxjs/operators';
import { TasksListViewModel, tasksListViewModel } from '../../../redux/selectors/tasks.selector';

@Component({
    selector: 'ons-page',
    templateUrl: './tasks-list.component.html'
})
  
export class TasksListComponent {
    private destroy$: Subject<void> = new Subject<void>()

    @ViewChild('toolbar') 
    toolbar: any;

    currentCategory: TaskCategory;
    model$: Observable<TasksListViewModel>;

    constructor(
        private navigator: OnsNavigator,
        private params: Params,
        private store: Store<TasksState>
    ) {
        this.currentCategory = this.params.data.category;

        this.model$ = this.store.select(tasksListViewModel(this.currentCategory && this.currentCategory.id));

        this.model$
            .pipe(takeUntil(this.destroy$))
            .subscribe((value: TasksListViewModel) => {
                this.currentCategory = value.current
            });                
    }

    ngAfterContentInit() {
        this.toolbar.nativeElement.setVisibility(!!this.currentCategory);
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
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