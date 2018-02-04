import { BaseEntity } from './../../shared';

export class Project implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public accoutManager?: string,
        public presalesArchitect?: string,
        public defaultProjectMargin?: number,
        public subcontractProjectMargin?: number,
        public pmpercentage?: number,
        public risk?: number,
        public phases?: BaseEntity[],
    ) {
    }
}
