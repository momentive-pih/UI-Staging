import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Attribute } from '@angular/compiler';
import { MatTableDataSource} from '@angular/material';
import {TableModule} from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatDatepickerInputEvent} from '@angular/material/datepicker';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption} from '@ng-select/ng-select';
import { MomentiveService} from '../service/momentive.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-product-compliance',
  templateUrl: './product-compliance.component.html',
  styleUrls: ['./product-compliance.component.css']
})
export class ProductComplianceComponent implements OnInit {

    selecteditem: any;
    product_Name: any = [];
    product_type: any = [];
    selectedIndex: number;
    selectedId: any;
    selectedboxId: any;
    modeselect = 'Eu';

    /*Product compliance */
    ProductComplianceCheck: any = [];
    productComplianceCheck = 'Notification Status';
    complianceNotification = true;
    complianceRegistration = false;
     regionParts: any = [];
    regionValueCheck: any;
    complaint_EU = true;
    complaint_us = false;
    complaint_canada = false;
    complaint_latin = false;
    complaint_america = false;
    pc_NotificationData: any[];
pc_NotificationHeader: any[];
selectedNotificationProducts: any[];
selectedNotificationColumns: any[];
Notificationpaginator = false;
complianceRegistrationEUHeader: any[];
complianceRegistrationEUData: any[];
selectedcomplianceRegistrationEUProducts: any[];
selectedcomplianceRegistrationEUColumns: any[];
complianceRegistrationEUpaginator = false;
complianceRegistrationCanada_Header: any[];
selectedcomplianceRegistrationCanada_Products: any[];
selectedcomplianceRegistrationCanada_Columns: any[];
complianceRegistrationCanada_Data: any[];
complianceRegistrationCanada_paginator = false;
complianceRegistrationLatin_Header: any[];
complianceRegistrationLatin_Data: any[];
selectedcomplianceRegistrationLatin_Products: any[];
selectedcomplianceRegistrationLatin_Columns: any[];
 complianceRegistrationLatin_paginator = false;
    regionPart: any = [];
    modalValue: string;
    cols: any[];
    selectedColumns: any[];
    public columnOptions: any[];
    product_NameData: any[];
    radioItem: any;
    radiovalue: any;

    // New Data;
    productdata: any = [];
    objectKeys = Object.keys;
    constructor(private route: ActivatedRoute,
                private router: Router,
                private momentiveService: MomentiveService,
              ) {
    }

    ngOnInit() {
    // product_type
      this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.product_type = this.productdata.product_type;
      console.log(this.product_type);
    }, err => {
      console.error(err);
    });

  // regionPart
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.regionPart = this.productdata.regionPart;
    console.log(this.regionPart);
              }, err => {
                console.error(err);
              });

     // ProductComplianceCheck
      this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.ProductComplianceCheck = this.productdata.ProductComplianceCheck;
      console.log(this.ProductComplianceCheck);
    }, err => {
      console.error(err);
    });
  // cols
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.cols = this.productdata.cols;
    console.log(this.cols);
  }, err => {
    console.error(err);
  });

  // pc_NotificationHeader
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.pc_NotificationHeader = this.productdata.pc_NotificationHeader;
    console.log(this.pc_NotificationHeader);
  }, err => {
    console.error(err);
  });

  // pc_Notification
  this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.pc_NotificationData = this.productdata.pc_NotificationData;
    console.log(this.pc_NotificationData);
  }, err => {
    console.error(err);
  });
  // complianceRegistrationEUHeader
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.complianceRegistrationEUHeader = this.productdata.complianceRegistrationEUHeader;
    console.log(this.complianceRegistrationEUHeader);
  }, err => {
    console.error(err);
  });
  // complianceRegistrationEUData
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.complianceRegistrationEUData = this.productdata.complianceRegistrationEUData;
    console.log(this.complianceRegistrationEUData);
  }, err => {
    console.error(err);
  });
  // complianceRegistrationCanada_Header
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.complianceRegistrationCanada_Header = this.productdata.complianceRegistrationCanada_Header;
    console.log(this.complianceRegistrationCanada_Header);
  }, err => {
    console.error(err);
  });
  // complianceRegistrationCanada_Data
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.complianceRegistrationCanada_Data = this.productdata.complianceRegistrationCanada_Data;
    console.log(this.complianceRegistrationCanada_Data);
  }, err => {
    console.error(err);
  });
  // complianceRegistrationLatin_Header
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.complianceRegistrationLatin_Header = this.productdata.complianceRegistrationLatin_Header;
    console.log(this.complianceRegistrationLatin_Header);
  }, err => {
    console.error(err);
  });
  // complianceRegistrationLatin_Data
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.complianceRegistrationLatin_Data = this.productdata.complianceRegistrationLatin_Data;
    console.log(this.complianceRegistrationLatin_Data);
  }, err => {
    console.error(err);
  });


  this.momentiveService.notifyObservable$.subscribe(value => {
    this.selecteditem = value;
    console.log(this.selecteditem);
    if (this.selecteditem) {
      setTimeout(() => {
        this.onChangeProductCompliance(this.selecteditem);
     }, 0);
   }
  });
  }

    public selectionItemForFilter(e) {
      const colsTempor = e.value;
      // tslint:disable-next-line: only-arrow-functions
      colsTempor.sort(function (a, b) {
        return a.index - b.index;
      });
      this.cols = [];
      this.cols = colsTempor;
      if (e.value.length > 10) {
        e.value.pop();
      }
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

    /*Product compliance*/
    onChangeProductCompliance(item) {
      this.productComplianceCheck = item;
       // tslint:disable-next-line: align
       if (this.productComplianceCheck === 'Notification Status') {
        this.complianceNotification = true;
        this.complianceRegistration = false;
      } else if (this.productComplianceCheck === 'AG Registration Status') {
        this.complianceNotification = false;
        this.complianceRegistration = true;
      }
    }
    selectRegionProcess(value) {
      this.regionValueCheck = value;
      if ( this.regionValueCheck === 'eu') {
        this.complaint_EU = true;
        this.complaint_canada = false;
        this.complaint_latin = false;
      } else if (this.regionValueCheck === 'us canada') {
        this.complaint_EU = false;
        this.complaint_canada = true;
        this.complaint_latin = false;
      } else if (this.regionValueCheck === 'latin america') {
        this.complaint_EU = false;
        this.complaint_canada = false;
        this.complaint_latin = true;
      }
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
