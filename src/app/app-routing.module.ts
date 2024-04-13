import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { BodyComponent } from './component/body/body.component';
import { authGuard } from './guard/auth.guard';
import { PostDetailsComponent } from './component/post-details/post-details.component';

const routes: Routes = [
  { path: '', component: BodyComponent, title: "Home" },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: 'my-uploads', component: BodyComponent, title: 'My-uploads', canActivate: [authGuard] },
  { path: ':postId', component: PostDetailsComponent, title: 'Post details'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
