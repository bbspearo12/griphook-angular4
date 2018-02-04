import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { GW_SKU_COSTComponent } from './gw-sku-cost.component';
import { GW_SKU_COSTDetailComponent } from './gw-sku-cost-detail.component';
import { GW_SKU_COSTPopupComponent } from './gw-sku-cost-dialog.component';
import { GW_SKU_COSTDeletePopupComponent } from './gw-sku-cost-delete-dialog.component';

export const gW_SKU_COSTRoute: Routes = [
    {
        path: 'gw-sku-cost',
        component: GW_SKU_COSTComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GW_SKU_COSTS'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'gw-sku-cost/:id',
        component: GW_SKU_COSTDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GW_SKU_COSTS'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const gW_SKU_COSTPopupRoute: Routes = [
    {
        path: 'gw-sku-cost-new',
        component: GW_SKU_COSTPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GW_SKU_COSTS'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'gw-sku-cost/:id/edit',
        component: GW_SKU_COSTPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GW_SKU_COSTS'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'gw-sku-cost/:id/delete',
        component: GW_SKU_COSTDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'GW_SKU_COSTS'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
