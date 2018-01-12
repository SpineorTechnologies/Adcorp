import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// Token Interceptor
import {HttpInterceptor} from './interceptor';
@Injectable()
export class ClientService {
  host:string = "http://localhost:5000";
  //host:string = "http://52.38.134.82:5000";
  constructor(private http: HttpInterceptor) { }
  
    create(client) {
      return this.http.post(this.host+'/webapi/users/create/client', client)
        .map(response => {
          return response.json();
        });
    }
  
    getAll() {
      return this.http.get(this.host+'/webapi/users/list/client/')
      .map((response: Response) => {
        return response.json();
    });
    }
  
    get(clientId) {
      return this.http.get(this.host+'/webapi/users/show/client/'+clientId)
        .map((response: Response) => {
            return response.json();
        });
    }
  
    update(clientId, client) {
      return this.http.post(this.host+'/webapi/users/update/'+clientId, client)
        .subscribe(response => {
          return response.json();
        });
    }
  
    delete(clientId) {
      return this.http.delete(this.host+'/webapi/users/delete/client/'+clientId)
    }
  
    activate(clientId) {
      return this.http.get(this.host+'/webapi/users/activate/client/'+clientId)
    }
    
    deactivate(clientId) {
      return this.http.get(this.host+'/webapi/users/deactivate/client/'+clientId)
    }

  }
  
