import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { adcorpService } from './../../services/commonService';
import { UrlConfig } from './../../services/urlProvider';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders;
  values = '';
  filterQuery = "";
  rowsOnPage = 10;
  sortOrder = "asc";
  todayDate = Date.now();
  regDate;
  public filterQuery1: any;
  public filterQuery2: any;
  public filterQuery3: any;
  public filterQuery4: any;
  public filterQuery5: any;
  public filterQuery6: any;
  public filterQuery7: any;
  public filterQuery8: any;
  public mr: NgbModalRef;
  closeResult: String;
  orderInfo: any;
  constructor(
    private AdcorpService: adcorpService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {
    window.sessionStorage.title = "Orders";
    // this.itemResource.count().then(count => this.itemCount = count);
  }


  getOrders() {
    let url = UrlConfig.order.getAll;
    this.AdcorpService.get(url).subscribe(response => {
      if (response.data.length > 0) {
        this.orders = response.data;
        this.orders.sort(function (a, b) {
          let dateA = new Date(a.o_lastUpdatedDateTime).getTime();
          let dateB = new Date(b.o_lastUpdatedDateTime).getTime();
          return dateA < dateB ? 1 : -1;
        });
      } else {
        this.orders = [];
      }
    });
  }

  delete() {
    let url = UrlConfig.order.delete + "/" + this.orderInfo._id;
    this.AdcorpService.delete(url)
      .subscribe(response => {
        this.toastr.success(response.message);
        let index = this.orders.indexOf(this.orderInfo);
        this.orders.splice(index, 1);
        return response.json();
      });
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

  openDeletePopup(content, order) {
    this.orderInfo = order;
    this.mr = this.modalService.open(content);
  }
  //   reloadItems(params) {
  //       this.itemResource.query(params).then(items => this.items = items);
  //   }

  //   // special properties:

  //   rowClick(rowEvent) {
  //       console.log('Clicked: ' + rowEvent.row.item.name);
  //   }

  //   rowDoubleClick(rowEvent) {
  //       alert('Double clicked: ' + rowEvent.row.item.name);
  //   }

  //   rowTooltip(item) { return item.jobTitle; }
  ngOnInit() {
    this.getOrders();

  }
}
