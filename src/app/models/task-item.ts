import { BaseEntity } from './base-entity';

export class TaskItem extends BaseEntity {
    title: string = '';
    description: string = '';
    categoryId: string;
}