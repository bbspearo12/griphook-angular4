/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { Headers } from '@angular/http';

import { GriphookTestModule } from '../../../test.module';
import { PhaseComponent } from '../../../../../../main/webapp/app/entities/phase/phase.component';
import { PhaseService } from '../../../../../../main/webapp/app/entities/phase/phase.service';
import { Phase } from '../../../../../../main/webapp/app/entities/phase/phase.model';

describe('Component Tests', () => {

    describe('Phase Management Component', () => {
        let comp: PhaseComponent;
        let fixture: ComponentFixture<PhaseComponent>;
        let service: PhaseService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [GriphookTestModule],
                declarations: [PhaseComponent],
                providers: [
                    PhaseService
                ]
            })
            .overrideTemplate(PhaseComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PhaseComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhaseService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new Phase(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.phases[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
