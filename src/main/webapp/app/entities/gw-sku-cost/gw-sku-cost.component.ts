import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { GW_SKU_COST } from './gw-sku-cost.model';
import { GW_SKU_COSTService } from './gw-sku-cost.service';
import { Principal, ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-gw-sku-cost',
    templateUrl: './gw-sku-cost.component.html'
})
export class GW_SKU_COSTComponent implements OnInit, OnDestroy {
gW_SKU_COSTS: GW_SKU_COST[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private gW_SKU_COSTService: GW_SKU_COSTService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.gW_SKU_COSTService.query().subscribe(
            (res: ResponseWrapper) => {
                this.gW_SKU_COSTS = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInGW_SKU_COSTS();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: GW_SKU_COST) {
        return item.id;
    }
    registerChangeInGW_SKU_COSTS() {
        this.eventSubscriber = this.eventManager.subscribe('gW_SKU_COSTListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
