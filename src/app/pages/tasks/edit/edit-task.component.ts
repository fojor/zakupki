import { Component } from "@angular/core";
import { Store } from '@ngrx/store';

import { OnsNavigator, Params } from 'ngx-onsenui';
import { TaskItem } from '../../../models/task-item';
import { TasksState } from '../../../redux/app.state';
import { UpdateTaskAction, AddTaskAction } from '../../../redux/actions/tasks.actions';

@Component({
    selector: 'ons-page',
    templateUrl: './edit-task.component.html'
})
  
export class EditTaskComponent {

    task: TaskItem;
    model: TaskItem;

    constructor(
            private navigator: OnsNavigator,
            private params: Params,
            private store: Store<TasksState>
        ) {
        this.task = this.params.data.task;

        if(this.task) {
            this.model = { ...this.task };
        }
        else {
            this.model = new TaskItem();
            this.model.categoryId = this.params.data.categoryId;
        }
    }

    save() {
        if(this.task) {
            this.store.dispatch(new UpdateTaskAction(this.model));
        }
        else {
            this.store.dispatch(new AddTaskAction(this.model));
        }
        this.navigator.element.popPage();
    }
}