import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {UserAuthService} from "../../service/user-auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
      private UserService:UserService,
      private userAuthService: UserAuthService,
      private router:Router) {

  }

  ngOnInit(): void {
  }

  login(loginForm:NgForm){
    console.log("form is submitted");
    console.log(loginForm.value);
    this.UserService.login(loginForm.value).subscribe(
        (response:any) => {
          this.userAuthService.SetRoles(response.user.role);
          this.userAuthService.setToken(response.jwttoken);

          const role = response.user.role[0].roleName;
            console.log(`role is ${role}`);
            if(role === 'Admin'){
                this.router.navigate(['/admin']);

            }  else {
                this.router.navigate(['/user']);
            }
            },
        (error => {
          console.log(error);
        })
    );

  }

}
