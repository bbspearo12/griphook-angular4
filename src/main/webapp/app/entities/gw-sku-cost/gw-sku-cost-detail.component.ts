import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { GW_SKU_COST } from './gw-sku-cost.model';
import { GW_SKU_COSTService } from './gw-sku-cost.service';

@Component({
    selector: 'jhi-gw-sku-cost-detail',
    templateUrl: './gw-sku-cost-detail.component.html'
})
export class GW_SKU_COSTDetailComponent implements OnInit, OnDestroy {

    gW_SKU_COST: GW_SKU_COST;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private gW_SKU_COSTService: GW_SKU_COSTService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGW_SKU_COSTS();
    }

    load(id) {
        this.gW_SKU_COSTService.find(id).subscribe((gW_SKU_COST) => {
            this.gW_SKU_COST = gW_SKU_COST;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGW_SKU_COSTS() {
        this.eventSubscriber = this.eventManager.subscribe(
            'gW_SKU_COSTListModification',
            (response) => this.load(this.gW_SKU_COST.id)
        );
    }
}
