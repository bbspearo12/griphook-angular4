import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GW_SKU_COST } from './gw-sku-cost.model';
import { GW_SKU_COSTPopupService } from './gw-sku-cost-popup.service';
import { GW_SKU_COSTService } from './gw-sku-cost.service';

@Component({
    selector: 'jhi-gw-sku-cost-delete-dialog',
    templateUrl: './gw-sku-cost-delete-dialog.component.html'
})
export class GW_SKU_COSTDeleteDialogComponent {

    gW_SKU_COST: GW_SKU_COST;

    constructor(
        private gW_SKU_COSTService: GW_SKU_COSTService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gW_SKU_COSTService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'gW_SKU_COSTListModification',
                content: 'Deleted an gW_SKU_COST'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gw-sku-cost-delete-popup',
    template: ''
})
export class GW_SKU_COSTDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gW_SKU_COSTPopupService: GW_SKU_COSTPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.gW_SKU_COSTPopupService
                .open(GW_SKU_COSTDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
