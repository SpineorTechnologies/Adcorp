import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// Token Interceptor
import {HttpInterceptor} from './interceptor';

@Injectable()
export class CandidateService {
  host: string = "http://localhost:5000";
 
 // host:string = "http://52.38.134.82:5000";
  constructor(private http:HttpInterceptor) {
  }

  create(candidate) {
    return this.http.post(this.host + '/webapi/users/create/candidate', candidate)
      .map(response => {
        return response.json();
      });
  }

  getAll() {
    return this.http.get(this.host + '/webapi/users/list/candidate/')
      .map((response: Response) => {
        return response.json();
      });
  }

  get(candidateID) {
    return this.http.get(this.host + '/webapi/users/show/candidate/' + candidateID)
      .map((response: Response) => {
        return response.json();
      });
  }

  // update(candidateId, candidate) {
  //   return this.http.post(this.host+'/webapi/users/update/'+candidateId, candidate)
  //     .subscribe(response => {
  //       return response.json();
  //     });
  // }

  update(candidateId, candidate) {
    console.log(candidate);
    return this.http.post(this.host + '/webapi/users/update/' + candidateId, candidate)
    .subscribe(response => {
      return response.json();
    });
  }

  delete(candidateId) {
    return this.http.delete(this.host + '/webapi/users/delete/candidate/' + candidateId)
  }

  activate(candidateId) {
    return this.http.get(this.host + '/webapi/users/activate/candidate/' + candidateId)
  }

  deactivate(candidateId) {
    return this.http.get(this.host + '/webapi/users/deactivate/candidate/' + candidateId)
  }

}