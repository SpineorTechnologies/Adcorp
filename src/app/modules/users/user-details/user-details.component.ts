import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// Services
import { adcorpService } from '../../../services/commonService';
import { UrlConfig } from '../../../services/urlProvider';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userProfile: string = "../assets/avatar.png";
  profileChange: boolean = false;
  profile: any = "";
  userId: String;
  user: any = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "phone": "",
    "role": [],
    "access": [],
    "clientAccess": [],
    "activeStatus": ""
  }
  constructor(private AdcorpService: adcorpService, private route: ActivatedRoute) {
    window.sessionStorage.title = "Add an Adcorp Users";
  }

  getUserProfile() {
    let url = UrlConfig.superUser.getAll;
  }
  triggerProfile() {
    document.getElementById('profile').click();
  }

  profileUpload(fileInput: any) {
    this.profile = <Array<File>>fileInput.target.files;
    if (fileInput.target.files && fileInput.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.userProfile = event.target.result;
        this.profileChange = true;
      }
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  addNewUser(valid) {
    if (valid) {
      if (this.user.activeStatus == "active") {
        this.user.activeStatus = true;
      } else {
        this.user.activeStatus = false;
      }
      if (this.userId == null) {

      } else {

      }
      console.log(this.user);
    }
  }
  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId != null) {
      this.getUserProfile();
    }
  }

}
