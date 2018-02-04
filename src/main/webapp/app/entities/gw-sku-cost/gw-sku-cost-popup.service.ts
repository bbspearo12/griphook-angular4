import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GW_SKU_COST } from './gw-sku-cost.model';
import { GW_SKU_COSTService } from './gw-sku-cost.service';

@Injectable()
export class GW_SKU_COSTPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private gW_SKU_COSTService: GW_SKU_COSTService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.gW_SKU_COSTService.find(id).subscribe((gW_SKU_COST) => {
                    this.ngbModalRef = this.gW_SKU_COSTModalRef(component, gW_SKU_COST);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.gW_SKU_COSTModalRef(component, new GW_SKU_COST());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    gW_SKU_COSTModalRef(component: Component, gW_SKU_COST: GW_SKU_COST): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.gW_SKU_COST = gW_SKU_COST;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
