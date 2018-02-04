import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GriphookProjectModule } from './project/project.module';
import { GriphookGW_SKU_COSTModule } from './gw-sku-cost/gw-sku-cost.module';
import { GriphookTaskModule } from './task/task.module';
import { GriphookPhaseModule } from './phase/phase.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GriphookProjectModule,
        GriphookGW_SKU_COSTModule,
        GriphookTaskModule,
        GriphookPhaseModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GriphookEntityModule {}
