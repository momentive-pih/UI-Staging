import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Attribute } from '@angular/compiler';
import { MatTableDataSource} from '@angular/material';
import {TableModule} from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption} from '@ng-select/ng-select';
import { MomentiveService} from '../service/momentive.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-report-data',
  templateUrl: './report-data.component.html',
  styleUrls: ['./report-data.component.css']
})
export class ReportDataComponent implements OnInit {
 
    product_Name: any = [];
    product_type: any = [];
  // Report Data
     reportDataproducts: any[];
    reportDataHead: any[];
    selectedReportDataProducts: any[];
    selectedReportDataColumns: any[];
    ReportDatapaginator = false;
    radiovalue: any;
    productdata: any = [];
    constructor( private route: ActivatedRoute,
                 private router: Router,
                 private momentiveService: MomentiveService,
                 ) {
    }
    ngOnInit() {
  // reportDataHead
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.reportDataHead = this.productdata.reportDataHead;
    console.log(this.reportDataHead);
  }, err => {
    console.error(err);
  });
  // reportDataProducts
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.reportDataproducts = this.productdata.reportDataproducts;
    console.log(this.reportDataproducts);
  }, err => {
    console.error(err);
  });

  }


    customSort(event) {
      event.data.sort((data1, data2) => {
          const value1 = data1[event.field];
          const value2 = data2[event.field];
          const result = null;
  
          if (value1 == null && value2 != null) {
              const result = -1;
          } else if (value1 != null && value2 == null) {
            const result = 1;
          } else if (value1 == null && value2 == null) {
            const result = 0;
          } else if (typeof value1 === 'string' && typeof value2 === 'string') {
            const  result = value1.localeCompare(value2);
           } else {
            const result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
   }
          return (event.order * result);
      });
  }


    onItemSelect(item: any) {
      console.log(item);
  }
  OnItemDeSelect(item: any) {
      console.log(item);
  }
  onSelectAll(items: any) {
      console.log(items);
  }
  onDeSelectAll(items: any) {
      console.log(items);
  }

  }
