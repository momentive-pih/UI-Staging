import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { HostListener } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'momentive';

  constructor(location: PlatformLocation, private router: Router) { }

  ngOnInit() {
    this.router.navigate(['']);
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
        $(".modal .close").click()
    }
    
  }

}
