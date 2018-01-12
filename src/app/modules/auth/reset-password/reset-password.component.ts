import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { adcorpService } from '../../../services/commonService';
import { UrlConfig } from '../../../services/urlProvider';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit {
    model: any = {};
    //  loading = false;
    returnUrl: string;
    email;
    random;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private AdcorpService: adcorpService,
        private toastr: ToastrService) {
        if (window.sessionStorage.UID != undefined) {
            this.router.navigate(['candidates']);
        }
    }

    ngOnInit() {
        // reset login status

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.email = this.route.snapshot.queryParams['email'];
        this.random = this.route.snapshot.queryParams['random'];
    }

    resetPassword() {
        // this.loading = true;
        console.log(this.email, " ", this.random);
        let url = UrlConfig.users.resetPassword;
        let model = {
            "email": this.email,
            "password": this.model.password,
            "random": this.random
        }
        this.AdcorpService.post(url, model)
            .subscribe(
            data => {
                if (data.status) {
                    this.toastr.success(data.message);
                    this.router.navigate(['candidates']);
                } else {
                    this.toastr.error(data.message);
                }
            },
            error => {
                this.toastr.error(error);
                // this.alertService.error(error);
                //    this.loading = false;
            });
    }
}
