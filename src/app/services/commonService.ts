import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import "rxjs/Rx";
import { Observable } from "rxjs/Observable";

import { HttpInterceptor } from './interceptor';
import { UrlConfig } from './urlProvider';
@Injectable()
export class adcorpService {
    constructor(public http: HttpInterceptor, public http_noAuth: Http) {
    }

    get(url: string) {
        return this.http.get(url).map((response: Response) => { return response.json(); }).catch((error: Response) => { return Observable.throw(error); });;
    }

    post(url: string, model: any) {
        return this.http.post(url, model).map((response: Response) => { return response.json(); }).catch((error: Response) => { return Observable.throw(error); });;
    }

    put(url: string, model: object) {
        return this.http.put(url, model).map((response: Response) => { return response.json(); }).catch((error: Response) => { return Observable.throw(error); });
    }

    delete(url: string) {
        return this.http.delete(url).map((response: Response) => { return response.json(); }).catch((error: Response) => { return Observable.throw(error); });
    }

    jsonDelete(url: string, model: any) {
        return this.http.delete(url, {"body":JSON.stringify(model)}).map((response: Response) => { return response.json(); }).catch((error: Response) => { return Observable.throw(error); });
    }

}
