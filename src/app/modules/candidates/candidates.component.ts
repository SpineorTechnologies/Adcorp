import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { adcorpService } from './../../services/commonService';
import { UrlConfig } from './../../services/urlProvider';


@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})

export class CandidatesComponent implements OnInit {

  // candidates : CandidateModel = new CandidateModel();
  candidates;
  values = '';
  filterQuery = "";
  rowsOnPage = 5;
  //sortBy = "firstName";
  sortOrder = "asc";
  todayDate = Date.now();
  regDate;
  closeResult: String;
  public filterQuery1: any;
  public filterQuery2: any;
  public filterQuery3: any;
  public filterQuery4: any;
  public filterQuery5: any;
  public filterQuery6: any;
  public filterQuery7: any;
  public filterQuery8: any;
  public mr: NgbModalRef;
  candidateInfo: any;
  constructor(private AdCorpService: adcorpService, private router: Router, private modalService: NgbModal, private toastr: ToastrService) {
    window.sessionStorage.title = "Candidates";
  }
  /**
   * Page Init
   */

  /**
   * Load Candidates
   */
  loadCandidates() {
    let url = UrlConfig.candidate.getAll;
    this.AdCorpService.get(url).subscribe(response => {
      if (response.success) {

        this.candidates = response.data;
        this.candidates.sort(function (a, b) {
          let dateA = new Date(a.lastUpdatedDateTime).getTime();
          let dateB = new Date(b.lastUpdatedDateTime).getTime();
          return dateA < dateB ? 1 : -1;
        });
        console.log(this.candidates)
      } else {
        this.candidates = [];
      }
    });
  }

  delete() {
    let url = UrlConfig.candidate.delete + "/" + this.candidateInfo._id;
    this.AdCorpService.delete(url)
      .subscribe(response => {
        if (response.success) {
          this.toastr.success(response.message);
          let index = this.candidates.indexOf(this.candidateInfo);
          this.candidates.splice(index, 1);
        } else {
          this.toastr.error(response.message);
        }
        this.mr.close();
      });
  }

  activate(id) {
    let url = UrlConfig.candidate.activateCandidate + "/" + id;
    this.AdCorpService.get(url)
      .subscribe(response => {
        if (response.success) {
          this.toastr.success(response.message);
        } else {
          this.toastr.error(response.message);
        }
      });
  }

  deactivate(id) {
    let url = UrlConfig.candidate.deActivateCandidate + "/" + id;
    this.AdCorpService.get(url)
      .subscribe(response => {
        if (response.success) {
          this.toastr.success(response.message);
        } else {
          this.toastr.error(response.message);
        }
      });
  }

  calculateDaysOld(date: Date) {
    this.regDate = new Date(date);
    let days = this.todayDate - this.regDate;
    return Math.round((this.todayDate - this.regDate) / (1000 * 60 * 60 * 24));
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

  openDeletePopup(content, candidate) {
    this.candidateInfo = candidate;
    this.mr = this.modalService.open(content);
  }

  ngOnInit() {
    this.loadCandidates();
  }

}
