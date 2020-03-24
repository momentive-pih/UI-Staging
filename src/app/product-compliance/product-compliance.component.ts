import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Attribute } from '@angular/compiler';
import { MatTableDataSource } from '@angular/material';
import { TableModule } from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { MomentiveService } from '../service/momentive.service';
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
  selectedSpecList: any = [];
  CategoryDetails: any = [];
  ProductComlianceDetails: any = [];
  ProductComplianceTabLoader:boolean;
  pihAlertMessage:boolean = false;
  pc_NotificationDataHeader: any = [];
  complianceLocationRegistrationData: any = [];
  locationBasedRegistration: any;
  complianceRegistrationDataCanada_Header: any = [];
  complianceRegistrationDataEUHeader: any = [];
  complianceRegistrationDataLatin_Header: any = [];
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
      { "field": "spec_id", "header": "Specification ID", "width": "10%" },
      { "field": "regulatory_List", "header": "Regulatory List", "width": "10%" },
      { "field": "notification", "header": "Notification", "width": "10%" },
      { "field": "additional_Info", "header": "Additional Info/ Remarks", "width": "10%" },
      { "field": "usage", "header": "Usage", "width": "10%" }
    ],


      this.complianceRegistrationDataEUHeader = [
        { "field": "spec_id", "header": "Specification ID", "width": "10%" },
        { "field": "product", "header": "product", "width": "10%" },
        { "field": "country", "header": "Country", "width": "10%" },
        { "field": "holder", "header": "Holder", "width": "10%" },
        { "field": "registration", "header": "Registration", "width": "10%" },
        { "field": "expiry", "header": "Expiry", "width": "10%" },
        { "field": "status", "header": "Status", "width": "10%" },
        { "field": "certificate", "header": "Certificate", "width": "10%" }
      ],

      this.complianceRegistrationDataCanada_Header = [
        { "field": "spec_id", "header": "Specification ID", "width": "10%" },
        { "field": "product", "header": "Product Name", "width": "10%" },
        { "field": "EPA_Inert_Product_Listing", "header": "EPA Inert Product Listing", "width": "10%" },
        { "field": "CA_DPR", "header": "CA DPR", "width": "10%" },
        { "field": "CP_DA", "header": "CP DA", "width": "10%" },
        { "field": "WSDA", "header": "WSDA", "width": "10%" },
        { "field": "OMRI", "header": "OMRI", "width": "10%" },
        { "field": "Canada_OMRI", "header": "Canada OMRI", "width": "10%" },
        { "field": "OMRI_Reneval_Date", "header": "OMRI Reneval Date", "width": "10%" },
        { "field": "PMRA", "header": "PMRA", "width": "10%" }
      ]

    this.complianceRegistrationDataLatin_Header = [
      { "field": "spec_id", "header": "Specification ID", "width": "10%" },
      { "field": "product", "header": "product", "width": "10%" },
      { "field": "country", "header": "Country", "width": "10%" },
      { "field": "registered_Name", "header": "Registered Name", "width": "10%" },
      { "field": "date_Granted", "header": "Date Granted", "width": "10%" },
      { "field": "date_Of_Expiry", "header": "Date of Expiry", "width": "10%" },
      { "field": "registration_Holder", "header": "Registration Holder", "width": "10%" },
      { "field": "registration_Certificate", "header": "Registration Certificate (Location)", "width": "10%" }
    ]

  }


  productComplianceNotification() {
    this.ProductComplianceTabLoader = true;
    this.pihAlertMessage = false;
    this.ProductComlianceDetails = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = this.momentiveService.ProductCategoryData;
    console.log(this.CategoryDetails);
    this.ProductComlianceDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails[0],
    });
    this.momentiveService.getProductCompliance(this.ProductComlianceDetails).subscribe(data => {
      console.log(data);
      this.ProductComplianceTabLoader = true;
      this.productdata = data;
      if (this.productdata.length > 0) {
        this.ProductComplianceTabLoader = false;
        this.pihAlertMessage = false;
        this.pc_NotificationData = this.productdata;
        this.pc_NotificationHeader = this.pc_NotificationDataHeader;
      } else {
        this.pihAlertMessage = true;
        this.ProductComplianceTabLoader = false;
      }
    }, err => {
      console.error(err);
    });
  }

  productComplianceAgRegistration(locationValue) {
    this.ProductComplianceTabLoader = true;
    this.pihAlertMessage = false;
    this.locationBasedRegistration = locationValue;
    console.log(this.locationBasedRegistration);
    this.ProductComlianceDetails = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = { index: 2, Category: "Product Compliance", Subcategory: "AG Registration Status" }
    console.log(this.CategoryDetails);
    this.ProductComlianceDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails,
    });
    console.log(this.ProductComlianceDetails)
      if (this.locationBasedRegistration === 'EU') {
        this.ProductComplianceTabLoader = true;
        this.pihAlertMessage = false;
        this.momentiveService.getProductCompliance(this.ProductComlianceDetails).subscribe(data => {
          console.log(data);
          this.productdata = data;
        if (this.productdata[0].complianceRegistrationEUData.length > 0) {
          this.ProductComplianceTabLoader = false;
          this.pihAlertMessage = false;
          this.complianceLocationRegistrationData = this.productdata[0].complianceRegistrationEUData;
          this.complianceRegistrationEUHeader = this.complianceRegistrationDataEUHeader;
          console.log(this.complianceLocationRegistrationData);
        } else {
          this.pihAlertMessage = true;
          this.ProductComplianceTabLoader = false;
        }
      },err => {
        console.error(err);
    });
      }
      if (this.locationBasedRegistration === 'canada') {
        this.ProductComplianceTabLoader = true;
        this.pihAlertMessage = false;
        this.momentiveService.getProductCompliance(this.ProductComlianceDetails).subscribe(data => {
          console.log(data);
          this.productdata = data;
        if (this.productdata[0].complianceRegistrationCanada_Data.length > 0) {
          this.ProductComplianceTabLoader = false;
          this.pihAlertMessage = false;
          this.complianceRegistrationCanada_Header = this.productdata[0].complianceRegistrationCanada_Data;
          this.complianceRegistrationCanada_Header = this.complianceRegistrationDataCanada_Header;
          console.log(this.complianceLocationRegistrationData);
        } else {
          this.pihAlertMessage = true;
          this.ProductComplianceTabLoader = false;
        }
      },err => {
        console.error(err);
    });
      }
      if (this.locationBasedRegistration === 'Latin') {
        this.ProductComplianceTabLoader = true;
        this.pihAlertMessage = false;
        this.momentiveService.getProductCompliance(this.ProductComlianceDetails).subscribe(data => {
        this.productdata = data;
        console.log(data);
        if (this.productdata[0].complianceRegistrationLatin_Data.length > 0) {
          this.ProductComplianceTabLoader = false;
          this.pihAlertMessage = false;
          this.complianceLocationRegistrationData = this.productdata[0].complianceRegistrationLatin_Data;
          this.complianceRegistrationLatin_Header = this.complianceRegistrationDataLatin_Header;
          console.log(this.complianceLocationRegistrationData);
        } else {
          this.pihAlertMessage = true;
          this.ProductComplianceTabLoader = false;
        }
      } ,err => {
        console.error(err);
    });
    }

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
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2);
        else
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

        return (event.order * result);
    });
}


  /*Product compliance*/
  onChangeProductCompliance(item) {
    this.ProductComplianceTabLoader = true;
    this.productComplianceCheck = item;
    // tslint:disable-next-line: align
    if (this.productComplianceCheck === 'Notification Status') {
      this.complianceNotification = true;
      this.complianceRegistration = false;
      this.ProductComplianceTabLoader = true;
      this.productComplianceNotification();
    } else if (this.productComplianceCheck === 'AG Registration Status') {
      this.complianceNotification = false;
      this.complianceRegistration = true;
      this.ProductComplianceTabLoader = true;
      this.productComplianceAgRegistration('EU')
    }
  }


  selectRegionProcess(value) {
    console.log(value);
    this.regionValueCheck = value;
    if (this.regionValueCheck === 'eu') {
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
