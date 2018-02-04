/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { GriphookTestModule } from '../../../test.module';
import { GW_SKU_COSTDetailComponent } from '../../../../../../main/webapp/app/entities/gw-sku-cost/gw-sku-cost-detail.component';
import { GW_SKU_COSTService } from '../../../../../../main/webapp/app/entities/gw-sku-cost/gw-sku-cost.service';
import { GW_SKU_COST } from '../../../../../../main/webapp/app/entities/gw-sku-cost/gw-sku-cost.model';

describe('Component Tests', () => {

    describe('GW_SKU_COST Management Detail Component', () => {
        let comp: GW_SKU_COSTDetailComponent;
        let fixture: ComponentFixture<GW_SKU_COSTDetailComponent>;
        let service: GW_SKU_COSTService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GriphookTestModule],
                declarations: [GW_SKU_COSTDetailComponent],
                providers: [
                    GW_SKU_COSTService
                ]
            })
            .overrideTemplate(GW_SKU_COSTDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GW_SKU_COSTDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GW_SKU_COSTService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new GW_SKU_COST(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.gW_SKU_COST).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
