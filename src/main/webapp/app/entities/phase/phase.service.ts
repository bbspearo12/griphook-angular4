import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Phase } from './phase.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class PhaseService {

    private resourceUrl =  SERVER_API_URL + 'api/phases';

    constructor(private http: Http) { }

    create(phase: Phase): Observable<Phase> {
        const copy = this.convert(phase);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(phase: Phase): Observable<Phase> {
        const copy = this.convert(phase);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<Phase> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to Phase.
     */
    private convertItemFromServer(json: any): Phase {
        const entity: Phase = Object.assign(new Phase(), json);
        return entity;
    }

    /**
     * Convert a Phase to a JSON which can be sent to the server.
     */
    private convert(phase: Phase): Phase {
        const copy: Phase = Object.assign({}, phase);
        return copy;
    }
}
