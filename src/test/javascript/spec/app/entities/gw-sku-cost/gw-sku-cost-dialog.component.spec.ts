/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GriphookTestModule } from '../../../test.module';
import { GW_SKU_COSTDialogComponent } from '../../../../../../main/webapp/app/entities/gw-sku-cost/gw-sku-cost-dialog.component';
import { GW_SKU_COSTService } from '../../../../../../main/webapp/app/entities/gw-sku-cost/gw-sku-cost.service';
import { GW_SKU_COST } from '../../../../../../main/webapp/app/entities/gw-sku-cost/gw-sku-cost.model';

describe('Component Tests', () => {

    describe('GW_SKU_COST Management Dialog Component', () => {
        let comp: GW_SKU_COSTDialogComponent;
        let fixture: ComponentFixture<GW_SKU_COSTDialogComponent>;
        let service: GW_SKU_COSTService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GriphookTestModule],
                declarations: [GW_SKU_COSTDialogComponent],
                providers: [
                    GW_SKU_COSTService
                ]
            })
            .overrideTemplate(GW_SKU_COSTDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GW_SKU_COSTDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GW_SKU_COSTService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new GW_SKU_COST(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.gW_SKU_COST = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'gW_SKU_COSTListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new GW_SKU_COST();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.gW_SKU_COST = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'gW_SKU_COSTListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
