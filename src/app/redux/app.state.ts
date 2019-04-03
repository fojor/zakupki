import { TaskCategory } from '../models/task-category';
import { TaskItem } from '../models/task-item';

export interface AppState {
	tasksState: TasksState;
}

export interface TasksState {
    categories: TaskCategory[];
    tasks: TaskItem[];
}