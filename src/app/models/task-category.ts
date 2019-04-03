import { BaseEntity } from './base-entity';
import { TaskItem } from './task-item';

export class TaskCategory extends BaseEntity {
    title: string;
    parentId: string;
}