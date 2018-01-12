import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { adcorpService } from '../../../services/commonService';
import { UrlConfig } from '../../../services/urlProvider';
@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {
    email: string;
    loading = false;

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
    }

    forgotPassword() {
        this.loading = true;
        let url = UrlConfig.users.forgotPassword + "/" + this.email;
        this.AdcorpService.get(url)
            .subscribe(
            data => {
                if (data.success) {
                    this.toastr.success(data.message);
                } else {
                    this.toastr.error(data.message);
                }
            },
            error => {
                this.toastr.error(error);
                this.loading = false;
            });
    }
}
