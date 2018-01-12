import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { DatepickerOptions } from 'ng2-datepicker';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import * as frLocale from 'date-fns/locale/fr';
import { ToastrService } from 'ngx-toastr';

import { adcorpService } from './../../../services/commonService';
import { UrlConfig } from './../../../services/urlProvider';
@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss']
})

export class CandidateDetailsComponent {

  candidate = {};
  id;
  imageUpload: Array<File>;
  resumeUpload: Array<File>;
  profileImage: any = "../assets/avatar.png";
  pictureUpdated: boolean = false;
  roleDetails: any[] = [];
  skillDetails: any[] = [];
  licenseDetails: any[] = [];
  resumeFilename: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private AdcorpService: adcorpService,
    private toastr: ToastrService) {
    this.imageUpload = [];
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id == null) {
      this.candidate['location'] = 0;
      this.roleDetails = [{
        "roleTitle": "",
        "startDate": "",
        "endDate": "",
        "companyName": "",
        "isCurrentEmployment": false,
        "duration": ""
      }];
      this.skillDetails = [{
        "yearsOfExperience": "",
        "skills": "",
        "rating": ""
      }];
      this.licenseDetails = [{
        "expiryDate": "",
        "issueDate": "",
        "issuedBy": "",
        "license": ""
      }]
    }
    window.sessionStorage.title = "Add Candidate";
  }

  getCandaidate() {
    let url = UrlConfig.candidate.getCandidate + "/" + this.id;
    this.AdcorpService.get(url).take(1).subscribe(c => {
      this.candidate = c.data;
      console.log(this.candidate);
      if (c.data.roleDetails.length > 0) {
        if (c.data.roleDetails[0].roleTitle != "" || c.data.roleDetails[0].startDate != "" || c.data.roleDetails[0].endDate != "" || c.data.roleDetails[0].companyName != "") {
          this.roleDetails = c.data.roleDetails;
        } else {
          this.roleDetails = [{
            "roleTitle": "",
            "startDate": "",
            "endDate": "",
            "companyName": "",
            "isCurrentEmployment": false,
            "duration": ""
          }];
        }
      } else {
        this.roleDetails = [{
          "roleTitle": "",
          "startDate": "",
          "endDate": "",
          "companyName": "",
          "isCurrentEmployment": false,
          "duration": ""
        }];

      }
      if (c.data.skillsets.length > 0) {
        if (c.data.skillsets[0].yearsOfExperience != "" || c.data.skillsets[0].skills != "" || c.data.skillsets[0].rating != "") {
          this.skillDetails = c.data.skillsets;
        } else {
          this.skillDetails = [{
            "yearsOfExperience": "",
            "skills": "",
            "rating": ""
          }];
        }
      } else {
        this.skillDetails = [{
          "yearsOfExperience": "",
          "skills": "",
          "rating": ""
        }];
      }
      if (c.data.licenseDetails.length > 0) {
        if (c.data.licenseDetails[0].expiryDate != "" || c.data.licenseDetails[0].issueDate != "" || c.data.licenseDetails[0].issuedBy != "" || c.data.licenseDetails[0].license != "") {
          this.licenseDetails = c.data.licenseDetails;
        } else {
          this.licenseDetails = [{
            "expiryDate": "",
            "issueDate": "",
            "issuedBy": "",
            "license": ""
          }];
        }
      } else {
        this.licenseDetails = [{
          "expiryDate": "",
          "issueDate": "",
          "issuedBy": "",
          "license": ""
        }];
      }
    });
  }

  save(candidate, valid) {
    candidate['userRoleType'] = 5;
    let role = [];
    let skills = [];
    for (let i = 0; i < this.roleDetails.length; i++) {
      if (!this.roleDetails[i].isCurrentEmployment) {
        if (this.roleDetails[i].startDate && this.roleDetails[i].endDate) {
          let startDate: any = this.roleDetails[i].startDate.day + "-" + this.roleDetails[i].startDate.month + "-" + this.roleDetails[i].startDate.year;
          startDate = new Date(startDate);
          this.roleDetails[i].startDate = startDate;
          let endDate: any = this.roleDetails[i].endDate.day + "-" + this.roleDetails[i].endDate.month + "-" + this.roleDetails[i].endDate.year;
          endDate = new Date(endDate);
          this.roleDetails[i].endDate = endDate;
          let exe = this.calculateYearsOfExp(startDate, endDate);
          console.log(exe);
        }
      } else {
        if (this.roleDetails[i].startDate != "" && this.roleDetails[i].isCurrentEmployment) {
          let startDate: any = this.roleDetails[i].startDate.day + "-" + this.roleDetails[i].startDate.month + "-" + this.roleDetails[i].startDate.year;
          startDate = new Date(startDate);
          this.roleDetails[i].startDate = startDate;
          this.roleDetails[i].endDate = new Date();
          let exe = this.calculateYearsOfExp(startDate, "Present");
          console.log(exe);
        }
      }
      if (this.roleDetails[i].roleTitle != "") {
        role.push(this.roleDetails[i].roleTitle);
      }
      delete candidate['role-' + i];
      delete candidate['company-' + i];
      delete candidate['startDate-' + i];
      delete candidate['endDate-' + i];
      delete candidate['isCurrentEmployment-' + i];

    }
    candidate['role'] = role;
    candidate['roleDetails'] = this.roleDetails;
    for (let skillInfo = 0; skillInfo < this.skillDetails.length; skillInfo++) {
      if (this.skillDetails[skillInfo].skills != "") {
        skills.push(this.skillDetails[skillInfo].skills);
      }
      delete candidate['skills-' + skillInfo];
      delete candidate['experience-' + skillInfo];
      delete candidate['rating-' + skillInfo];
    }
    candidate['skills'] = skills;
    candidate['skillsets'] = this.skillDetails;


    for (let licenseInfo = 0; licenseInfo < this.licenseDetails.length; licenseInfo++) {
      if (this.licenseDetails[licenseInfo].issueDate != "") {
        this.licenseDetails[licenseInfo].issueDate = this.licenseDetails[licenseInfo].issueDate.month + "-" + this.licenseDetails[licenseInfo].issueDate.day + "-" + this.licenseDetails[licenseInfo].issueDate.year;
      }
      if (this.licenseDetails[licenseInfo].expiryDate != "") {
        this.licenseDetails[licenseInfo].expiryDate = this.licenseDetails[licenseInfo].expiryDate.month + "-" + this.licenseDetails[licenseInfo].expiryDate.day + "-" + this.licenseDetails[licenseInfo].expiryDate.year;
      }
      delete candidate['license-' + licenseInfo];
      delete candidate['issuedBy-' + licenseInfo];
      delete candidate['issueDate-' + licenseInfo];
      delete candidate['expiryDate-' + licenseInfo];
    }
    candidate['licenseDetails'] = this.licenseDetails;
    const formData: any = new FormData();
    const files: Array<File> = this.imageUpload && this.resumeUpload;
    console.log(candidate.firstName != undefined && candidate.lastName != undefined && candidate.email != undefined && candidate.phone != undefined && candidate.africanId != undefined);
    console.log(candidate);
    if (candidate.firstName != undefined && candidate.lastName != undefined && candidate.email != undefined && candidate.phone != undefined && candidate.africanId != undefined) {
      if (candidate.dob != undefined) {
        candidate.dob = candidate.dob.month + "-" + candidate.dob.day + "-" + candidate.dob.year;
      }
      if (this.id) {
        let url = UrlConfig.candidate.update + this.id;
        this.AdcorpService.post(url, candidate).subscribe(res => {
          if (res && res.success) {
            this.toastr.success("Candidate Update Successfully");
          } else {
            this.toastr.error(res.message);
          }
        })
        console.log(this.imageUpload[0])
        if ((this.imageUpload && this.imageUpload.length > 0) && (this.resumeUpload && this.resumeUpload.length > 0)) {
          formData.append('file[0]', this.imageUpload[0], this.imageUpload[0].name);
          formData.append('file[1]', this.resumeUpload[0], this.resumeUpload[0].name);
        } else if (this.imageUpload && this.imageUpload.length > 0) {
          formData.append('file[0]', this.imageUpload[0], this.imageUpload[0].name);
        } else if (this.resumeUpload && this.resumeUpload.length > 0) {
          formData.append('file[1]', this.resumeUpload[0], this.resumeUpload[0].name);
        }
        if (this.imageUpload.length != 0 || this.resumeUpload.length != 0) {
          this.AdcorpService.post(url, formData).subscribe(res => { });
          this.router.navigate(['/candidates']);
        }
      } else {
        let url = UrlConfig.candidate.create;
        console.log(candidate);
        this.AdcorpService.post(url, candidate).subscribe(res => {
          if (res && res.success) {
            this.toastr.success(res.message);
            if (this.imageUpload != undefined || this.resumeUpload != undefined) {
              if ((this.imageUpload && this.imageUpload.length > 0) && (this.resumeUpload && this.resumeUpload.length > 0)) {
                formData.append('file[0]', this.imageUpload[0], this.imageUpload[0].name, this.imageUpload[0]);
                formData.append('file[1]', this.resumeUpload[0], this.resumeUpload[0].name);
              } else if (this.imageUpload && this.imageUpload.length > 0) {
                formData.append('file[0]', this.imageUpload[0], this.imageUpload[0].name);
              } else if (this.resumeUpload && this.resumeUpload.length > 0) {
                formData.append('file[1]', this.resumeUpload[0], this.resumeUpload[0].name);
              }
              let updateUrl = UrlConfig.candidate.update + res.data._id;
              this.AdcorpService.post(updateUrl, formData).subscribe(res => {
                console.log(res);
              });
            }
            this.router.navigate(['/candidates']);
          } else {
            let errorEMail = 'E11000 duplicate key error collection: adcorpapi-dev.users index: email_1 dup key: { : "' + this.candidate['email'] + '" }';
            if (res.message.message == errorEMail) {
              this.toastr.error("Email Already Used");
            } else {
              this.toastr.error(res.message);
            }

          }
        });
      }
    }
  }

  // validation(candidate) {
  //   let returnValue: boolean = true;
  //   if (candidate.email != "") {

  //   }
  // }

  addNewRole() {
    this.roleDetails.push({
      "roleTitle": "",
      "startDate": "",
      "endDate": "",
      "companyName": "",
      "isCurrentEmployment": false,
      "duration": ""
    });
  }

  addNewSkills() {
    this.skillDetails.push({
      "yearsOfExperience": "",
      "skills": "",
      "rating": ""
    });
  }
  addNewLicense() {
    this.licenseDetails.push({
      "expiryDate": "",
      "issueDate": "",
      "issuedBy": "",
      "license": ""
    });
  }
  triggerProfile() {
    document.getElementById('candidateProfile').click();
  }

  resumeTrigger() {
    document.getElementById('resumeProfile').click();
  }

  disableCurrentWork() { }

  ngOnInit() {
    if (this.id) {
      this.getCandaidate();
    }
  }

  /**
  * File Change Event
  * @param fileInput
  */
  public fileChangeEvent(fileInput: any) {
    this.imageUpload = <Array<File>>fileInput.target.files;
    this.imageUpload[0]['fieldname'] = "profile";
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.profileImage = event.target.result;
        this.pictureUpdated = true;
      }

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  public resumeFileChange(fileInput: any) {
    this.resumeUpload = <Array<File>>fileInput.target.files;
    console.log(this.resumeUpload);
    this.resumeUpload[0]['fieldname'] = "resume";
    this.resumeFilename = this.resumeUpload[0].name;

  }

  public calculateYearsOfExp(fromDate, toDate) {
    if (toDate == "Present")
      toDate = new Date();
    else
      toDate = new Date(toDate);
    var diff = Math.floor(toDate.getTime() - new Date(fromDate).getTime());
    var day = 1000 * 60 * 60 * 24;

    var days = Math.floor(diff / day);
    var months = Math.floor(days / 31);
    var years = Math.floor(months / 12);

    var message = toDate.toDateString();
    message += " was "
    message += days + " days "
    message += months + " months "
    message += years + " years ago \n"

    return years + "." + months;
  }
}
