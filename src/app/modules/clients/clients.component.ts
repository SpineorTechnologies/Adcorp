import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { adcorpService } from './../../services/commonService';
import { UrlConfig } from './../../services/urlProvider';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  clients;
  values = '';
  filterQuery = "";
  rowsOnPage = 5;
  //sortBy = "firstName";
  sortOrder = "asc";
  todayDate = Date.now();
  regDate;
  public mr: NgbModalRef;
  public filterQuery1: any;
  public filterQuery2: any; 
  public filterQuery3: any;
  public filterQuery4: any;
  public filterQuery5: any;
  public filterQuery6: any;
  public filterQuery7: any;
  public filterQuery8: any;
  closeResult: String;
  clientInfo: any;
  constructor(private AdcorpService: adcorpService, private router: Router, private modalService: NgbModal, private toastr: ToastrService) {
    window.sessionStorage.title = "Clients";
  }

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    let url = UrlConfig.client.getAll;
    this.AdcorpService.get(url).subscribe(response => {
      if (response && response.success) {
        this.clients = response.data;
        this.clients.sort(function (a, b) {
          let dateA = new Date(a.lastUpdatedDateTime).getTime();
          let dateB = new Date(b.lastUpdatedDateTime).getTime();
          return dateA < dateB ? 1 : -1;
        });
        console.log(this.clients)
      } else {
        this.clients = [];
      }
    });
  }

  delete() {
    let url = UrlConfig.client.delete + "/" + this.clientInfo._id;
    this.AdcorpService.delete(url)
      .subscribe(response => {
        if (response.success) {
          let index = this.clients.indexOf(this.clientInfo);
          this.clients.splice(index, 1);
          this.toastr.success(response.message);
        } else {
          this.toastr.error(response.message);
        }
        this.mr.close();
      });
  }

  activate(id) {
    let url = UrlConfig.client.activateCandidate + "/" + id;
    this.AdcorpService.get(url)
      .subscribe(response => {
        if (response.success) {
          this.toastr.success(response.message);
        } else {
          this.toastr.error(response.message);
        }
      });
  }

  deactivate(id) {
    let url = UrlConfig.client.deActivateCandidate + "/" + id;
    this.AdcorpService.get(url)
      .subscribe(response => {
        if (response.success) {
          this.toastr.success(response.message);
        } else {
          this.toastr.error(response.message);
        }
      });
  }

  onActiveStatusChange(e, id) {
    let isChecked = e.target.checked;
    if (isChecked) this.activate(id);
    else if (!isChecked) this.deactivate(id);
  }
  clearSearch() {
    this.filterQuery1 = "";
    this.filterQuery2 = "";
    this.filterQuery3 = "";
    this.filterQuery4 = "";
    this.filterQuery5 = "";
    this.filterQuery6 = "";
    this.filterQuery7 = "";
    this.filterQuery8 = "";
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openDeletePopup(content, client) {
    this.clientInfo = client;
    this.mr = this.modalService.open(content);
  }
}