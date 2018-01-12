import { Router } from '@angular/router';
import { OrderService } from './../../../services/order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
// Services
import { adcorpService } from './../../../services/commonService';
import { UrlConfig } from './../../../services/urlProvider';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})

export class OrderDetailsComponent implements OnInit {
  order = {};
  id;
  currentTab: boolean;
  orderTypeNew: boolean;
  candidates;
  values = '';
  filterQuery = "";
  rowsOnPage = 5;
  //sortBy = "firstName";
  sortOrder = "asc";
  todayDate = Date.now();
  regDate;
  assignedCandidateList: any = [];
  assignedUsersIds: any = [];
  closeResult: string;
  selectedCandidate: any = [];
  extendstartdate;
  extendenddate;
  modalRef;
  clientId;
  roleFieldError: boolean = false;
  clients: any[] = [];
  clientName;
  rolesData: string[] = [
    'Receptionist',
    'Accounts Clerk',
    'Manager',
    'Administrator',
    'Analyst',
    'Trainee',
    'Driver',
    'Cashier',
    'Picker/Packer'
  ];
  skillsetData: string[] = [
    'Telephone Skills',
    'Verbal Communication',
    'Microsoft Office Skills',
    'Listening',
    'Professionalism',
    'Customer Focus',
    'Organization',
    'Informing Others',
    'Phone Skills',
    'Supply Management',
    'Performance Management',
    'Project Management',
    'Coaching',
    'Supervision',
    'Quality Management',
    'Results Driven',
    'Developing Budgets',
    'Developing Standards',
    'Foster Teamwork',
    'Handles Pressure',
    'Giving Feedback',
    'Analytical Skills',
    'Communication Skills',
    'Critical Thinking',
    'Math Skills',
    'Type Writing'
  ];
  languageArray: string[] = [
    'Afrikaans',
    'English',
    'Ndebele',
    'Northern Sotho',
    'Sotho',
    'Swazi',
    'Tsonga',
    'Tswana',
    'Venda',
    'Xhosa',
    'Zulu'
  ];
  rolesAutocomplete: boolean = false;
  skillsAutoComplete: boolean = false;
  skillsets: string[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private modalService: NgbModal,
    private AdcorpService: adcorpService,
    private toastr: ToastrService) {
    window.sessionStorage.title = "Add Order";
    this.currentTab = false;
    this.orderTypeNew = false;
    this.id = this.route.snapshot.paramMap.get('id');
    this.order['o_preferred_languages'] = this.languageArray[0];

    if (this.id == 'new') {
      this.orderTypeNew = true;
    }

    if (this.id != 'new') {
      this.orderService.getOrder(this.id).take(1).subscribe(c => {
        console.log(c.data);
        this.order = c.data
        this.clientId = c.data.cli_Id;
      });

      this.orderService.getMatchedCandidateByOrderIdRequested(this.id).subscribe(c => {
        this.assignedCandidateList = c.data;
        this.assignedCandidateList.forEach(item => {
          if (item != null)
            this.assignedUsersIds.push(item._id);
        });
      });
      this.orderService.getMatchedCandidateByOrderId(this.id).subscribe(c => {
        this.candidates = c.data;
      });


    }
  }




  open(content, selectedCand) {
    this.modalRef = this.modalService.open(content);
    this.selectedCandidate = selectedCand;
  }

  updateExtendDate() {
    let data = [];

    data.push({ 'cli_Id': this.clientId, 'o_Id': this.id, 'c_Id': this.selectedCandidate._id, 'status': 1, 'extendstartdate': this.extendstartdate, 'extendenddate': this.extendenddate });
    this.orderService.extendCandidates(data[0]).subscribe(response => {
      this.modalRef.close();
    });
  }


  save(order) {

    order['cli_Id'] = this.clientId;
    // candidate['password'] = "password";// TODO: Remove this workaround

    if (this.orderTypeNew) {
      if (order.roleTitle != undefined) {
        this.roleFieldError = false;
        this.orderService.create(order).subscribe(response => {
          this.toastr.success(response.message);
          this.router.navigate(['/orders']);
        });
      } else {
        this.roleFieldError = true;
      }
    }
    else {
      this.orderService.update(this.id, order).subscribe(response => {
        this.toastr.success(response.message);
        this.router.navigate(['/orders']);
      });
    }
  }

  assignCandidateInOrder(userData) {
    if (userData) {
      let data = [];

      data.push({ 'cli_Id': this.clientId, 'o_Id': this.id, 'c_Id': userData._id, 'status': 1 });
      this.orderService.swapCandidates(data[0]).subscribe(response => {
        this.toastr.success(response.message);
        this.assignedCandidateList.push(userData);
      });
    }
  }

  //check user status to show add link
  checkUserStatus(userId) {
    if (this.assignedUsersIds.includes(userId)) return false;
    else return true;
  }

  swapCandidate(candidateData) {
    let data = [];
    data.push({ 'c_Id': candidateData._id, 'o_Id': this.id });
    this.orderService.deleteCandidate(data[0]).subscribe(c => {
      if (c.success) {
        let updatedList = [];
        this.assignedCandidateList.forEach(item => {
          if (item._id != candidateData._id) updatedList.push(item);
        });
        this.assignedCandidateList = updatedList;

        // this.candidates.forEach(item => {
        //   if(item.status){

        //   }else{

        //   }
        // });
      }
    });
  }

  deleteCandidate(candidateDetail) {
    let data = [];
    data.push({ 'c_Id': candidateDetail._id, 'o_Id': this.id });
    this.orderService.deleteCandidate(data[0]).subscribe(c => {
      let updatedList = [];
      this.assignedCandidateList.forEach(item => {
        if (item._id != candidateDetail._id) updatedList.push(item);
      });
      this.assignedCandidateList = updatedList;
    });
  }

  /* Edit Date : 19-12-2017
     Author : Patharraj */
  triggerRole(target) {
    console.log(target)
    if (this.order['roleTitle'].length >= 1) {
      this.rolesAutocomplete = true;
    } else {
      this.rolesAutocomplete = false;
    }

  }

  addRole(role) {
    this.order['roleTitle'] = role;
    this.rolesAutocomplete = false;
  }

  triggerSkills() {
    if (this.order['skillsets'].length >= 1) {
      this.skillsAutoComplete = true;
    } else {
      this.skillsAutoComplete = false;
    }
  }

  addSkills(skill) {
    this.skillsets.push(skill);
    this.order['skillsets'] = this.skillsets;
    this.skillsAutoComplete = false;
  }

  getClients() {
    let url: string = UrlConfig.client.getAll;
    this.AdcorpService.get(url).subscribe(res => {
      if (res && res.success) {
        this.clients = res.data;
      }
    })
  }

  changeClient() {
    for (let i = 0; i < this.clients.length; i++) {
      let name = this.clients[i].firstName + this.clients[i].lastName;
      if (this.clientName == name) {
        this.clientId = this.clients[i]._id;
        this.order['clientId'] = this.clientId;
        this.order['clientName'] = this.clientName;
      }
    }

  }


  ngOnInit() {
    this.getClients();
  }

}
