import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Phase } from './phase.model';
import { PhasePopupService } from './phase-popup.service';
import { PhaseService } from './phase.service';
import { Project, ProjectService } from '../project';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-phase-dialog',
    templateUrl: './phase-dialog.component.html'
})
export class PhaseDialogComponent implements OnInit {

    phase: Phase;
    isSaving: boolean;

    projects: Project[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private phaseService: PhaseService,
        private projectService: ProjectService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.projectService.query()
            .subscribe((res: ResponseWrapper) => { this.projects = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.phase.id !== undefined) {
            this.subscribeToSaveResponse(
                this.phaseService.update(this.phase));
        } else {
            this.subscribeToSaveResponse(
                this.phaseService.create(this.phase));
        }
    }

    private subscribeToSaveResponse(result: Observable<Phase>) {
        result.subscribe((res: Phase) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Phase) {
        this.eventManager.broadcast({ name: 'phaseListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackProjectById(index: number, item: Project) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-phase-popup',
    template: ''
})
export class PhasePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private phasePopupService: PhasePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.phasePopupService
                    .open(PhaseDialogComponent as Component, params['id']);
            } else {
                this.phasePopupService
                    .open(PhaseDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
