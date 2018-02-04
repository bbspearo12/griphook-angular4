import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { GW_SKU_COST } from './gw-sku-cost.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class GW_SKU_COSTService {

    private resourceUrl =  SERVER_API_URL + 'api/gw-sku-costs';

    constructor(private http: Http) { }

    create(gW_SKU_COST: GW_SKU_COST): Observable<GW_SKU_COST> {
        const copy = this.convert(gW_SKU_COST);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(gW_SKU_COST: GW_SKU_COST): Observable<GW_SKU_COST> {
        const copy = this.convert(gW_SKU_COST);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<GW_SKU_COST> {
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
     * Convert a returned JSON object to GW_SKU_COST.
     */
    private convertItemFromServer(json: any): GW_SKU_COST {
        const entity: GW_SKU_COST = Object.assign(new GW_SKU_COST(), json);
        return entity;
    }

    /**
     * Convert a GW_SKU_COST to a JSON which can be sent to the server.
     */
    private convert(gW_SKU_COST: GW_SKU_COST): GW_SKU_COST {
        const copy: GW_SKU_COST = Object.assign({}, gW_SKU_COST);
        return copy;
    }
}
