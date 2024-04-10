import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { BodyComponent } from './component/body/body.component';
import { ImageListComponent } from './component/body/image/image-list/image-list.component';
import { RightOptionsComponent } from './component/body/right-options/right-options.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadImageComponent } from './component/body/image/upload-image/upload-image.component';
import { addTokenInterceptor } from './interceptor/add-token.interceptor';
import { PostDetailsComponent } from './component/post-details/post-details.component';
import { ConfirmationDialogueComponent } from './shared/component/confirmation-dialogue/confirmation-dialogue.component';
import { LoaderComponent } from './shared/component/loader/loader.component';
import { loaderInterceptor } from './interceptor/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    ImageListComponent,
    RightOptionsComponent,
    LoginComponent,
    RegisterComponent,
    UploadImageComponent,
    PostDetailsComponent,
    ConfirmationDialogueComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    NgbModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: loaderInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: addTokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
