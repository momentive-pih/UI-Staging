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
import { FormControl } from '@angular/forms';
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
    selectedSpecList:any =[];
    CategoryDetails:any = [];
    ProductComlianceDetails:any = [];
    productComplianceLoader:boolean = true;
    pc_NotificationDataHeader:any = [];
    complianceLocationRegistrationData:any =[];
    locationBasedRegistration:any;

    selectedAGRegistrationLocation: string = "EU";
  
    selectedCompositionControl = new FormControl(this.selectedAGRegistrationLocation);

    constructor(private route: ActivatedRoute,
                private router: Router,
                private momentiveService: MomentiveService,
              ) {
    }

    ngOnInit() {

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
  



  this.momentiveService.notifyObservable$.subscribe(value => {
    this.selecteditem = value;
    console.log(this.selecteditem);
    this.productComplianceNotification();
    if (this.selecteditem) {
      setTimeout(() => {
        this.onChangeProductCompliance(this.selecteditem);
     }, 0);
   }
  });

  this.pc_NotificationDataHeader = [
    { "field": "spec_id", "header": "Specification ID","width": "10%" },
    { "field": "regulatory_List", "header": "Regulatory List","width": "10%" },
    { "field": "notification", "header": "Notification","width": "10%"},
    { "field": "additional_Info", "header": "Additional Info/ Remarks","width": "10%"},
    { "field": "usage", "header": "Usage","width": "10%" }
  ],
  this.complianceRegistrationEUHeader = [
    { "field": "spec_id", "header": "Specification ID","width": "10%" },
    { "field": "product", "header": "product","width": "10%" },
    { "field": "country", "header": "Country","width": "10%"},
    { "field": "holder", "header": "Holder","width": "10%"},
    { "field": "registration", "header": "Registration","width": "10%" },
    { "field": "expiry", "header": "Expiry","width": "10%"},
    { "field": "status", "header": "Status","width": "10%" },
    { "field": "certificate", "header": "Certificate","width": "10%" }
  ],
  this.complianceRegistrationCanada_Header = [
    { "field": "spec_id", "header": "Specification ID","width": "10%" },
    { "field": "product Name", "header": "Product Name","width": "10%" },
    { "field": "EPA Inert Product Listing", "header": "EPA Inert Product Listing","width": "10%"},
    { "field": "CA DPR", "header": "CA DPR","width": "10%"},
    { "field": "CP DA", "header": "CP DA","width": "10%" },
    { "field": "WSDA", "header": "WSDA","width": "10%"},
    { "field": "OMRI", "header": "OMRI","width": "10%" },
    { "field": "Canada OMRI", "header": "Canada OMRI","width": "10%" },
    { "field": "OMRI Reneval Dates", "header": "OMRI Reneval Date","width": "10%" },
    { "field": "PMRA", "header": "PMRA","width": "10%" }
  ]
      
this.complianceRegistrationLatin_Header = [
    { "field": "spec_id", "header": "Specification ID","width": "10%" },
    { "field": "product", "header": "product","width": "10%" },
    { "field": "country", "header": "Country","width": "10%"},
    { "field": "Registered Name", "header": "Registered Name","width": "10%"},
    { "field": "Date Granted", "header": "Date Granted","width": "10%" },
    { "field": "Date of Expiry", "header": "Date of Expiry","width": "10%"},
    { "field": "Registration Holder", "header": "Registration Holder","width": "10%" },
    { "field": "registration_Certificate", "header": "Registration Certificate (Location)","width": "10%" }
  ]

  }

  
  productComplianceNotification() {
    this.ProductComlianceDetails =[];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = this.momentiveService.ProductCategoryData;
    console.log(this.CategoryDetails);
    this.ProductComlianceDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails[0],
    });
    console.log(this.ProductComlianceDetails)
    this.momentiveService.getProductCompliance(this.ProductComlianceDetails).subscribe(data => {
      this.productComplianceLoader = false;
      console.log(data);
      this.productdata = data;
      this.pc_NotificationHeader = this.pc_NotificationDataHeader;
       this.pc_NotificationData =  this.productdata[0].pc_NotificationData; 
       console.log(this.pc_NotificationData);
    }, err => {
      console.error(err);
    });
  }

  productComplianceAgRegistration(locationValue) {
    let locationBasedRegistration = locationValue;
    console.log(locationBasedRegistration);
    this.ProductComlianceDetails =[];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = {index: 2, Category: "Product Compliance", Subcategory: "AG Registration Status"}
    console.log(this.CategoryDetails);
    this.ProductComlianceDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails,
    });
    console.log(this.ProductComlianceDetails)
    this.momentiveService.getProductCompliance(this.ProductComlianceDetails).subscribe(data => {
      console.log(locationBasedRegistration);
      console.log(data);
      if(locationBasedRegistration === 'EU') {
        this.productComplianceLoader = false;
        this.productdata = data;
        this.complianceLocationRegistrationData =  this.productdata[0].complianceRegistrationEUData; 
        console.log(this.complianceLocationRegistrationData);
      }
      if(locationBasedRegistration === 'canada') {
        this.productComplianceLoader = false;
        this.productdata = data;
        this.complianceLocationRegistrationData =  this.productdata[0].complianceRegistrationCanada_Data; 
        console.log(this.complianceLocationRegistrationData);
      }
      if(locationBasedRegistration === 'Latin') {
        this.productComplianceLoader = false;
        this.productdata = data;
        this.complianceLocationRegistrationData =  this.productdata[0].complianceRegistrationLatin_Data; 
        console.log(this.complianceLocationRegistrationData);
      }
   
    }, err => {
      console.error(err);
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
        this.productComplianceNotification();
      } else if (this.productComplianceCheck === 'AG Registration Status') {
        this.complianceNotification = false;
        this.complianceRegistration = true;
        this.productComplianceAgRegistration('EU')
      }
    }
    
    
    selectRegionProcess(value) {
      console.log(value);
      this.regionValueCheck = value;
      if(this.regionValueCheck === 'eu') {
        this.complaint_EU = true;
        this.complaint_canada = false;
        this.complaint_latin = false;
        this.productComplianceAgRegistration('EU');
      } else if (this.regionValueCheck === 'US Canada') {
        this.complaint_EU = false;
        this.complaint_canada = true;
        this.complaint_latin = false;
        this.productComplianceAgRegistration('canada');
      } else if (this.regionValueCheck === 'Latin America') {
        this.complaint_EU = false;
        this.complaint_canada = false;
        this.complaint_latin = true;
        this.productComplianceAgRegistration('Latin');
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
