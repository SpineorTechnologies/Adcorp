import { Router } from '@angular/router';
import { ClientService } from './../../../services/client.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { ToastrService } from 'ngx-toastr';

// import {CandidateModel} from "../../../modules/example/candidates.model"
import { adcorpService } from './../../../services/commonService';
import { UrlConfig } from './../../../services/urlProvider';
@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  client = {};
  id;
  imageUpload: Array<File>;
  resumeUpload: Array<File>;
  profileImage: any = "../assets/avatar.png";
  companyLogo: any = "../assets/avatar.png";
  pictureUpdated: boolean = false;
  clientCompanyUpdated: boolean = false;
  locationDetails: any[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private AdcorpService: adcorpService,
    private toastr: ToastrService) {
    window.sessionStorage.title = "Add Client";
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      let url = UrlConfig.client.getCandidate + "/" + this.id;
      this.AdcorpService.get(url).take(1).subscribe(c => {
        this.client = c.data
        this.locationDetails = c.data.locations;
      });
    } else {
      this.locationDetails = [{
        division: "",
        address: "",
        locality: "",
        city: "",
        state: "",
        postalCode: "",
        contact: ""
      }]
    }
  }

  save(client, valid) {
    client['userRoleType'] = 4;
    const formData: any = new FormData();
    const files: Array<File> = this.imageUpload && this.resumeUpload;
    for (let i = 0; i < this.locationDetails.length; i++) {
      delete client['division-' + i];
      delete client['address-' + i];
      delete client['locality-' + i];
      delete client['city-' + i];
      delete client['state-' + i];
      delete client['postalCode-' + i];
      delete client['contact-' + i];
    }
    client['locations'] = this.locationDetails;
    console.log(client.firstName != undefined && client.lastName != undefined && client.email != undefined && client.phone != undefined && client.clientName != undefined && client.clientId != undefined);
    if (client.firstName != undefined && client.lastName != undefined && client.email != undefined && client.phone != undefined && client.clientName != undefined && client.clientId != undefined) {
      if (this.id) {
        let url = UrlConfig.client.update + "/" + this.id;
        this.AdcorpService.post(url, client).subscribe(res => {
          if (res && res.success) {
            this.toastr.success("Client Updated Successfullly");
          } else {
            this.toastr.error(res.message);
          }
        });
        if ((this.imageUpload && this.imageUpload.length > 0) && (this.resumeUpload && this.resumeUpload.length > 0)) {
          formData.append('file[0]', this.imageUpload[0], this.imageUpload[0].name);
          formData.append('file[1]', this.resumeUpload[0], this.resumeUpload[0].name);
        } else if (this.imageUpload && this.imageUpload.length > 0) {
          formData.append('file[0]', this.imageUpload[0], this.imageUpload[0].name);
        } else if (this.resumeUpload && this.resumeUpload.length > 0) {
          formData.append('file[1]', this.resumeUpload[0], this.resumeUpload[0].name);
        }
        let updateUrl = UrlConfig.client.update + "/" + this.id;
        this.AdcorpService.post(url, formData).subscribe(res => { });
      } else {
        let url = UrlConfig.client.create;
        this.AdcorpService.post(url, client).subscribe(res => {
          if (res && res.success) {
            if (res && res.success) {
              this.toastr.success(res.message);
            } else {
              this.toastr.error(res.message);
            }
            if (this.imageUpload != undefined || this.resumeUpload != undefined) {
              if ((this.imageUpload && this.imageUpload.length > 0) && (this.resumeUpload && this.resumeUpload.length > 0)) {
                formData.append('file[0]', this.imageUpload[0], this.imageUpload[0].name);
                formData.append('file[1]', this.resumeUpload[0], this.resumeUpload[0].name);
              } else if (this.imageUpload && this.imageUpload.length > 0) {
                formData.append('file[0]', this.imageUpload[0], this.imageUpload[0].name);
              } else if (this.resumeUpload && this.resumeUpload.length > 0) {
                formData.append('file[1]', this.resumeUpload[0], this.resumeUpload[0].name);
              }
              let updateUrl = UrlConfig.client.update + "/" + res.data._id;
              this.AdcorpService.post(updateUrl, formData)
            }
            this.router.navigate(['/clients']);
          }
        });
      }
    }
  }

  triggerProfile() {
    document.getElementById('candidateProfile').click();
  }
  triggerCompanyUrl() {
    document.getElementById('resumeProfile').click();
  }

  addNewLocation() {
    this.locationDetails.push({
      "division": "",
      "address": "",
      "locality": "",
      "city": "",
      "state": "",
      "postalCode": "",
      "contact": ""
    });
  }

  public fileChangeEvent(fileInput: any) {
    this.imageUpload = <Array<File>>fileInput.target.files;
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.profileImage = event.target.result;
        this.pictureUpdated = true;
      }

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  public companylogoUpload(fileInput: any) {
    this.resumeUpload = <Array<File>>fileInput.target.files;
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.companyLogo = event.target.result;
        this.clientCompanyUpdated = true;
      }

      reader.readAsDataURL(fileInput.target.files[0]);
    }

  }

  ngOnInit() {
  }
}