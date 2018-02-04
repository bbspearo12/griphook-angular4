/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { GriphookTestModule } from '../../../test.module';
import { GW_SKU_COSTComponent } from '../../../../../../main/webapp/app/entities/gw-sku-cost/gw-sku-cost.component';
import { GW_SKU_COSTService } from '../../../../../../main/webapp/app/entities/gw-sku-cost/gw-sku-cost.service';
import { GW_SKU_COST } from '../../../../../../main/webapp/app/entities/gw-sku-cost/gw-sku-cost.model';

describe('Component Tests', () => {

    describe('GW_SKU_COST Management Component', () => {
        let comp: GW_SKU_COSTComponent;
        let fixture: ComponentFixture<GW_SKU_COSTComponent>;
        let service: GW_SKU_COSTService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GriphookTestModule],
                declarations: [GW_SKU_COSTComponent],
                providers: [
                    GW_SKU_COSTService
                ]
            })
            .overrideTemplate(GW_SKU_COSTComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GW_SKU_COSTComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GW_SKU_COSTService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new GW_SKU_COST(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.gW_SKU_COSTS[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
