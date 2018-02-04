import { BaseEntity } from './../../shared';

export class Phase implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public subTotal?: number,
        public subTotalWithMargin?: number,
        public project?: BaseEntity,
        public tasks?: BaseEntity[],
    ) {
    }
}
