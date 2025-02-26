import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }
  public isOpened = new BehaviorSubject(false);
  public opened = false;

  public toggle(){
    this.opened = !this.opened;
    this.isOpened.next(this .opened);
  }
}
