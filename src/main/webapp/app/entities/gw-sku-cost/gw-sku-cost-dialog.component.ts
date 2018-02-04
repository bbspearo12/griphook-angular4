import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GW_SKU_COST } from './gw-sku-cost.model';
import { GW_SKU_COSTPopupService } from './gw-sku-cost-popup.service';
import { GW_SKU_COSTService } from './gw-sku-cost.service';

@Component({
    selector: 'jhi-gw-sku-cost-dialog',
    templateUrl: './gw-sku-cost-dialog.component.html'
})
export class GW_SKU_COSTDialogComponent implements OnInit {

    gW_SKU_COST: GW_SKU_COST;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private gW_SKU_COSTService: GW_SKU_COSTService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.gW_SKU_COST.id !== undefined) {
            this.subscribeToSaveResponse(
                this.gW_SKU_COSTService.update(this.gW_SKU_COST));
        } else {
            this.subscribeToSaveResponse(
                this.gW_SKU_COSTService.create(this.gW_SKU_COST));
        }
    }

    private subscribeToSaveResponse(result: Observable<GW_SKU_COST>) {
        result.subscribe((res: GW_SKU_COST) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: GW_SKU_COST) {
        this.eventManager.broadcast({ name: 'gW_SKU_COSTListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-gw-sku-cost-popup',
    template: ''
})
export class GW_SKU_COSTPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gW_SKU_COSTPopupService: GW_SKU_COSTPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.gW_SKU_COSTPopupService
                    .open(GW_SKU_COSTDialogComponent as Component, params['id']);
            } else {
                this.gW_SKU_COSTPopupService
                    .open(GW_SKU_COSTDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
