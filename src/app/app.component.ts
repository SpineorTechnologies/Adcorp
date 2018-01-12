import { OnInit, Input, Compiler } from '@angular/core';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  public routers = [];
  public authStatus = false;
  public loader: boolean = false;
  constructor(private location: Location, private router: Router, public compiler: Compiler) {
    this.compiler.clearCache();
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      this.routers.push(event);
      this.modifyHeader(event)
    });
    // if (window.sessionStorage.UID != undefined) {
    //   this.router.navigate(['candidates']);
    // } else {
    //   this.router.navigate(['login']);
    // }
  }

  modifyHeader(location) {
    let windowUrl = this.routers[0].url;
    if (location.url != "/login" && location.url != "/forgot-password" && location.url != '/' && location.url != "/reset-password") {
      this.authStatus = true;
    } else {
      this.authStatus = false;
    }
    if (this.routers.length == 7) {
      if (document.location.search.length) {
        this.router.config.push({ path: windowUrl, component: ResetPasswordComponent });
        this.authStatus = false;
      }
    }

    if (window.sessionStorage.title != undefined) {
      this.title = window.sessionStorage.title;
    }
  }

  logout() {
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
