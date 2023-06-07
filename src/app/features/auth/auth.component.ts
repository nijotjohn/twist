import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
// import { AlertComponent } from 'src/app/shared/components/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  isLoginMode = true;
  isLoading = false;
  error = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    // private componentFactoryResolve: ComponentFactoryResolver
  ){}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){

    if(!form.valid) return;

    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;

    if(this.isLoginMode){
      authObs = this.authService.login(email, password);
    }else{
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      errorMessage =>{
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onHandleError(){
    this.error=null;
  }

  // private showErroAlert(message: string){

  //   const alertComponentFactory = this.componentFactoryResolve.resolveComponentFactory(
  //     AlertComponent
  //   );

  // }

}
