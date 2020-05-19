import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { MomentiveService } from './service/momentive.service';
import { HostListener } from '@angular/core';


declare var $: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'momentive';
  userName:any;

  
  constructor(location: PlatformLocation,private router: Router,private momentiveService: MomentiveService) {

 
   }

  ngOnInit() {
    this.router.navigate(['']);
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
        $(".modal .close").click()
    }



  }
 
 

}
