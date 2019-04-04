import { Component } from "@angular/core";
import { Params, OnsNavigator } from 'ngx-onsenui';
import { Store } from '@ngrx/store';

import { TaskCategory } from '../../../models/task-category';
import { TasksState } from '../../../redux/app.state';
import { AddCategoryAction, UpdateCategoryAction } from '../../../redux/actions/tasks.actions';
import { TasksListComponent } from '../list/tasks-list.component';
import { OpenCategoryPageAction } from 'src/app/redux/actions/navigation.actions';


@Component({
    selector: 'ons-page',
    templateUrl: './edit-category.component.html'
})
  
export class EditCategoryComponent {

    category: TaskCategory;
    model: TaskCategory;

    constructor(
            private navigator: OnsNavigator,
            private params: Params,
            private store: Store<TasksState>
        ) {
        this.category = this.params.data.category;

        if(this.category) {
            this.model = { ...this.category };
        }
        else {
            this.model = new TaskCategory();
            this.model.title = '';
            this.model.parentId = this.params.data.parentId;
        }
    }

    save() {
        if(this.category) {
            this.store.dispatch(new UpdateCategoryAction(this.model));
        }
        else {
            this.store.dispatch(new AddCategoryAction(this.model));
            // this.store.dispatch(new OpenCategoryPageAction({
            //     navigator: this.navigator, 
            //     data: { category: this.model }
            // }));
        }
        this.navigator.element.popPage();
    }
}