import { HttpInterceptor } from './services/interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { AsyncPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule, ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers, XHRBackend } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
// import { DataTableModule } from 'angular-4-data-table/src/index';
import { DataTableModule } from "angular2-datatable";


import { RouterModule } from '@angular/router'
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password.component';
import { CandidatesComponent } from './modules/candidates/candidates.component';
import { ClientsComponent } from './modules/clients/clients.component';
import { OrdersComponent } from './modules/orders/orders.component';
import { ClientDetailsComponent } from './modules/clients/client-details/client-details.component';
import { CandidateDetailsComponent } from './modules/candidates/candidate-details/candidate-details.component';
import { CustomFormsModule } from 'ng2-validation';
import { OrderDetailsComponent } from './modules/orders/order-details/order-details.component'

/**
 * Helper Components
 */
import { DataFilterPipe } from './modules/common/data-filter.pipe';
import { CandidateFilterPipe } from './modules/common/candidate-filter';
import { OrdersFilterPipe } from './modules/common/orders-filter';
import { OrderCandidateFilterPipe } from './modules/common/order-candidate';
import { adcorpService } from './services/commonService';
import { routing } from './app.router';
import { OrderService } from './services/order.service';
//import { UsersComponent } from './modules/users/users.component';
import { UserDetailsComponent } from './modules/users/user-details/user-details.component';
import { UserFilterPipe } from './modules/common/user-filter';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DataFilterPipe,
    CandidateFilterPipe,
    OrdersFilterPipe,
    OrderCandidateFilterPipe,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    CandidatesComponent,
    ClientsComponent,
    OrdersComponent,
    ClientDetailsComponent,
    CandidateDetailsComponent,
    OrderDetailsComponent,
    //UsersComponent,
    UserDetailsComponent,
    UserFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    DataTableModule,
    CustomFormsModule,
    routing,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    adcorpService,
    OrderService,
    {
      provide: HttpInterceptor,
      useClass: HttpInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
