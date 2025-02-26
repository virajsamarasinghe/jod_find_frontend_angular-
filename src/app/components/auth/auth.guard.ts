import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {UserAuthService} from "../../service/user-auth.service";
import {UserService} from "../../service/user.service";




@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private userAuthService: UserAuthService, private router: Router,private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.userAuthService.getToken() !== null){
      const role = route.data["roles"] as Array<String>;
      if(role){
        const match = this.userService.roleEqual(role);
        if(match){
          return true;
        }else {
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
    }
    this.router.navigate(['/login']);
    return false;
  }

}