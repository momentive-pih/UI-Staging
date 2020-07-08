import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Attribute } from '@angular/compiler';
import { MatTableDataSource } from '@angular/material';
import { TableModule } from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { MomentiveService } from '../service/momentive.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-restricted-substance',
  templateUrl: './restricted-substance.component.html',
  styleUrls: ['./restricted-substance.component.css']
})
export class RestrictedSubstanceComponent implements OnInit {
  selecteditem: any;
  product_Name: any = [];
  product_type: any = [];
  restrictedSubstanceChecks: any = [];
  restrictedSubstanceTab = 'GADSL';
  gadslCheck = true;
  californiaCheck = false;
  // Restricted GASDL
  restrictedGASDLHeader: any[];
  restrictedGASDLData: any[];
  selectedrestrictedGASDLProducts: any[];
  selectedrestrictedGASDLColumns: any[];
  restrictedGASDLDatapaginator = false;
  // Restricted Calofornia
  restrictedCaliforniaHeader: any[];
  restrictedCaliforniaData: any[];
  selectedrestrictedCaliforniaProducts: any[];
  selectedrestrictedCaliforniaColumns: any[];
  restrictedCaliforniapaginator = false;
  UserSelectedProducts: any;
  radiovalue: any;
  contentHeight:boolean= false;
  productdata: any = [];
  selectedSpecList: any = [];
  CategoryDetails: any = [];
  RestrictedInformationDetails: any = [];
  restrictedDataproducts: any = [];
  restrictedLoader: boolean = true;
  pihAlertMessage: boolean = false;
  restrictedCaliforniaTableHeader: any = [];
  restrictedCaliforniaDataHeader: any = [];
  restrictedGASDLDataHeader: any = [];
  topcheckedData:boolean = true

  constructor(private route: ActivatedRoute,
    private router: Router,
    private momentiveService: MomentiveService,
  ) {
  }
  ngOnInit() {

    this.momentiveService.notifyObservable$.subscribe(value => {
      this.selecteditem = value;
      console.log(this.selecteditem);
      this.restrictedSubstancePage();
      if (this.selecteditem) {
        setTimeout(() => {
          this.onChangeRestricted(this.selecteditem);
        }, 0);
      }
    });
    this.contentHeight = false;
    this.momentiveService.notifyCheckObservable$.subscribe(value =>{
      console.log(value);
      this.topcheckedData = value;
      this.contentHeight = !this.contentHeight;
    })


    // restrictedSubstanceChecks
    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.restrictedSubstanceChecks = this.productdata.restrictedSubstanceChecks;
      console.log(this.restrictedSubstanceChecks);
    }, err => {
      console.error(err);
    });

//GASDL Header Section
    this.restrictedGASDLDataHeader = [
      { "field": "substance", "header": "Substance" },
      { "field": "spec_Id", "header": "Specification ID" },
      { "field": "cas_NO", "header": "CAS RN" },
      { "field": "class_action", "header": "Classification" },
      { "field": "reason_Code", "header": "Reason Code" },
      { "field": "source", "header": "Source(Legal Requirement Regulations)" },
      { "field": "reporting_threshold", "header": "Reporting threshold(0.1% unless otherwise State)" }
      // { "field": "weight_Composition", "header": "% Weight in SAP std Composition" }
    ]

//California Header Section
    this.restrictedCaliforniaDataHeader = [
      { "field": "chemical", "header": "Chemical" },
      { "field": "type_Toxicity", "header": "Type of Toxicity" },
      { "field": "listing_Mechanism", "header": "Listing Mechanism" },
      { "field": "cas_NO", "header": "CAS NO" },
      { "field": "date_Listed", "header": "Date Listed" },
      { "field": "NSRL_Data", "header": "NSRL or MADL(aeg/day)a" },
      { "field": "weight_Composition", "header": "% Weight in SAP std Composition" },
      { "field":"componant_Type","header": "Component Type"}
    ]

  }

//ResitrictedSubstance  GASDL API call
  restrictedSubstancePage() {
    this.RestrictedInformationDetails = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = this.momentiveService.ProductCategoryData;
    console.log(this.CategoryDetails);
    this.RestrictedInformationDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails[0],
      'product_Level':this.momentiveService.getProductLevelDetails(),
      'Mat_Level':this.momentiveService.getMaterialLevelDetails(),
      'CAS_Level':this.momentiveService.getCasLevelDetails(),
    });
    console.log(this.RestrictedInformationDetails)
    this.momentiveService.getRestrictedSubstance(this.RestrictedInformationDetails).subscribe(data => {
      console.log(data);
      this.restrictedLoader = true;
      this.productdata = data;
      this.productdata.restrictedGASDLData = this.productdata;
      if (this.productdata.restrictedGASDLData.length > 0) {
        this.restrictedLoader = false;
        this.pihAlertMessage = false;
        this.restrictedGASDLHeader = this.restrictedGASDLDataHeader;
        this.restrictedGASDLData = this.productdata.restrictedGASDLData;
        console.log(this.restrictedGASDLData);
      } else {
        this.pihAlertMessage = true;
        this.restrictedLoader = false;
      }
    }, err => {
      console.error(err);
    });
  }


//Restricted Substance Tab Change function
  onChangeRestricted(item) {
    this.restrictedSubstanceTab = item;
    if (this.restrictedSubstanceTab === 'GADSL') {
      this.gadslCheck = true;
      this.californiaCheck = false;
      this.restrictedSubstancePage();
    } else if (this.restrictedSubstanceTab === 'California Prop 65') {
      this.californiaCheck = true;
      this.gadslCheck = false;
      this.RestrictedInformationDetails = [];
      this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
      console.log(this.selectedSpecList);
      this.CategoryDetails = { index: 2, Category: "restrictedSubstanceModal", Subcategory: "CALPROP" }
      console.log(this.CategoryDetails);
      this.RestrictedInformationDetails.push({
        'Spec_id': this.selectedSpecList,
        'Category_details': this.CategoryDetails,
        'product_Level':this.momentiveService.getProductLevelDetails(),
        'Mat_Level':this.momentiveService.getMaterialLevelDetails(),
        'CAS_Level':this.momentiveService.getCasLevelDetails(),
      });
      console.log(this.RestrictedInformationDetails)
      this.momentiveService.getRestrictedSubstance(this.RestrictedInformationDetails).subscribe(data => {
        console.log(data);
        this.restrictedLoader = true;
        this.productdata = data;
        if (this.productdata.length > 0) {
          this.restrictedLoader = false;
          this.pihAlertMessage = false;
          this.restrictedCaliforniaTableHeader = this.restrictedCaliforniaDataHeader;
          this.restrictedCaliforniaData = this.productdata;
          console.log(this.restrictedCaliforniaData);
        } else {
          this.pihAlertMessage = true;
          this.restrictedLoader = false;
        }

      }, err => {
        console.error(err);
      });
    }
  }

  //Sorting Functionality
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

  onItemSelect(item: any) {
    console.log(item);
  }
  OnItemDeSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
