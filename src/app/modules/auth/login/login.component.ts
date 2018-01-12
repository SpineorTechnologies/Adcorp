import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { adcorpService } from '../../../services/commonService';
import { UrlConfig } from '../../../services/urlProvider';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private AdcorpService: adcorpService, private toastr: ToastrService) { }

    ngOnInit() {
        // reset login status
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        if (window.sessionStorage.UID != undefined) {
            this.router.navigate(['candidates']);
        }
    }

    login() {
        this.loading = true;
        let model = {
            "email": this.model.username,
            "password": this.model.password
        };
        let url = UrlConfig.users.login;
        this.AdcorpService.post(url, model)
            .subscribe(
            data => {
                console.log(data);
                if (data.success) {
                    window.sessionStorage.UID = data.user._id;
                    window.sessionStorage.user = JSON.stringify(data.user);
                    window.sessionStorage.token = data.token;
                    this.toastr.success(data.message);
                    this.router.navigate(['candidates']);
                }
                else { this.toastr.error(data.message); }
            },
            error => {
                this.toastr.error(error);
                // this.alertService.error(error);
                this.loading = false;
            });
    }
}
