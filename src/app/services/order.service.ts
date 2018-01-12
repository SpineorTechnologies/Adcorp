import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {HttpInterceptor} from './interceptor';
@Injectable()
export class OrderService {

	//host:string = "http://52.38.134.82:5000";
	constructor(private http: HttpInterceptor) { }

	getAll() {
    	return this.http.get('webapi/orders/')
	    .map((response: Response) => {
	      return response.json();
	  	});
	}

	getOrder(orderID) {
	    return this.http.get('webapi/orders/'+orderID)
	 	    .map((response: Response) => {
	    	    return response.json();
	    });
	}

	create(order) {
	 return this.http.post('webapi/orders/create/', order)
      .map((response: Response) => {
	    	    return response.json();
      });
  	}

  	update(orderId, order) {
  		console.log("update");
	    return this.http.put('webapi/orders/'+orderId, order)
	      .map((response: Response) => {
	    	    return response.json();
	      });
	}
	delete(orderId) {
	    return this.http.delete('webapi/orders/'+orderId)
	  }

	getMatchedCandidateByOrderIdRequested(id){
		return this.http.post('webapi/ordermappings/getmatchedcandidatebyorderidrequested/'+id,{})
		.map((response: Response) => {
	    	    return response.json();
      	});
	}
  

	//get get Matched Candidate By OrderId   
	getMatchedCandidateByOrderId(orderId){
		return this.http.post('webapi/orders/getmatchedcandidatebyorderid/'+orderId,{})
		.map((response: Response) => {
	    	    return response.json();
      	});
	}

	swapCandidates(data){
		return this.http.post('webapi/ordermappings/create/addswapgetmatchedcandidatebyorderid',data)
		.map((response: Response) => {
	    	    return response.json();
      	});
	}

	extendCandidates(data){
		return this.http.post('webapi/ordermappings/update/extend',data)
		.map((response: Response) => {
	    	    return response.json();
      	});
	} 

	updateCandidateStatus(data){
		console.log(data,"in");
		return this.http.post('webapi/ordermappings/update',data)
		.map((response: Response) => {
	    	    return response.json();
      	});
	}

	deleteCandidate(data){
		return this.http.delete('webapi/ordermappings/delete', {"body":JSON.stringify(data)})
		.map((response: Response) => {
	    	    return response.json();
      	});
	}

	getClientData(clientId){
		return this.http.get('/webapi/users/show/'+clientId)
		.map((response: Response) => {
	    	    return response.json();
      	});
	}
	
}
