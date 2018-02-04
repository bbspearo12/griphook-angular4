import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GriphookSharedModule } from '../../shared';
import {
    GW_SKU_COSTService,
    GW_SKU_COSTPopupService,
    GW_SKU_COSTComponent,
    GW_SKU_COSTDetailComponent,
    GW_SKU_COSTDialogComponent,
    GW_SKU_COSTPopupComponent,
    GW_SKU_COSTDeletePopupComponent,
    GW_SKU_COSTDeleteDialogComponent,
    gW_SKU_COSTRoute,
    gW_SKU_COSTPopupRoute,
} from './';

const ENTITY_STATES = [
    ...gW_SKU_COSTRoute,
    ...gW_SKU_COSTPopupRoute,
];

@NgModule({
    imports: [
        GriphookSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        GW_SKU_COSTComponent,
        GW_SKU_COSTDetailComponent,
        GW_SKU_COSTDialogComponent,
        GW_SKU_COSTDeleteDialogComponent,
        GW_SKU_COSTPopupComponent,
        GW_SKU_COSTDeletePopupComponent,
    ],
    entryComponents: [
        GW_SKU_COSTComponent,
        GW_SKU_COSTDialogComponent,
        GW_SKU_COSTPopupComponent,
        GW_SKU_COSTDeleteDialogComponent,
        GW_SKU_COSTDeletePopupComponent,
    ],
    providers: [
        GW_SKU_COSTService,
        GW_SKU_COSTPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GriphookGW_SKU_COSTModule {}
