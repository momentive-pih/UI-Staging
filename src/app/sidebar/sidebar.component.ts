import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Attribute } from '@angular/compiler';
import { MatTableDataSource} from '@angular/material';
import { TableModule} from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption} from '@ng-select/ng-select';
import { MomentiveService} from '../service/momentive.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  productdata: any = [];
  sidebarCategoriesData: any = [];


  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private router: Router,
              private momentiveService: MomentiveService) { }

  ngOnInit() {

        this.momentiveService.getSearchData().subscribe(data => {
          this.productdata = data;
          this.sidebarCategoriesData = this.productdata.sidebarCategoriesData;
          console.log(this.sidebarCategoriesData);
        }, err => {
          console.error(err);
        });
  }


}
