import { getUniqueId } from '../utils/entity.util'

export class BaseEntity {
    id: string;

    constructor() {
        this.id = getUniqueId();
    }
}