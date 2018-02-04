/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GriphookTestModule } from '../../../test.module';
import { GW_SKU_COSTDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/gw-sku-cost/gw-sku-cost-delete-dialog.component';
import { GW_SKU_COSTService } from '../../../../../../main/webapp/app/entities/gw-sku-cost/gw-sku-cost.service';

describe('Component Tests', () => {

    describe('GW_SKU_COST Management Delete Component', () => {
        let comp: GW_SKU_COSTDeleteDialogComponent;
        let fixture: ComponentFixture<GW_SKU_COSTDeleteDialogComponent>;
        let service: GW_SKU_COSTService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GriphookTestModule],
                declarations: [GW_SKU_COSTDeleteDialogComponent],
                providers: [
                    GW_SKU_COSTService
                ]
            })
            .overrideTemplate(GW_SKU_COSTDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GW_SKU_COSTDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GW_SKU_COSTService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
