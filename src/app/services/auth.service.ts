
import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
    constructor(private http: Http) { }
    host:string = "http://localhost:5000";
    //host:string = "http://52.38.134.82:5000";
    login(user:object) {
        return this.http.post(this.host+'/webapi/users/login',user)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    forgotPassword(email: string){
        return this.http.get(this.host+'/webapi/users/resetpassword/'+email)
        .map((response: Response) => {
            return response.json();
        });
    }

    resetPassword(email, password, random){
        return this.http.post(this.host+'/webapi/users/updateoasswordverification', { u_email: email, password: password, random: random })
        .map((response: Response) => {
            return response.json();
        });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}

