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
import { FormControl } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-toxicology',
  templateUrl: './toxicology.component.html',
  styleUrls: ['./toxicology.component.css']
})
export class ToxicologyComponent implements OnInit {

  selecteditem: any;
  selectednav: 'active';
  product_type: any = [];
  selectedIndex: number;
  selectedId: any;
  selectedboxId: any;
  toxicologyChecks: any = [];
  toxicologyTab = 'Study Title and Date';
  studyCheck = true;
  monthlyCheck = false;
  summaryCheck = false;
  dataCheck = false;
  toxicologydropData: any = [];
  toxicologyValueCheck: any;
  toxicology_sealant = true;
  toxicology_silane = false;
  // Toxicology Study
  toxicologyStudyData: any[];
  toxicologyStudyHead: any[];
  selectedtoxicologyStudyDataProducts: any[];
  selectedtoxicologyStudyColumns: any[];
  toxicologyStudyDatapaginator = false;
  // Toxicolgy Monthly
  toxicologyMonthlyHeader: any[];
  toxicologyMonthlyData: any[];
  selectedtoxicologyMonthlyProducts: any[];
  selectedtoxicologyMonthlyColumns: any[];
  selectedSalesVolumeDataProducts: any[];
  radiovalue: any;
  toxicolgyLoader: boolean = true;
  pihAlertMessage: boolean;
  toxicologyDetails: any = []
  selectedSpecList: any = []
  CategoryDetails: any = []
  monthlyType: any;
  toxicologyMonthlysilaneHeader: any = [];
  toxicologyMonthlyselantHeader: any = []
  monthlySilaneHeader: any = [];
  monthlySelantHeader: any = [];
  productdata: any = [];
  toxicologySummaryData: any = [];
  toxicologyRegistrationTracker: any = [];
  registartion_Tracker_Data: any = [];
  toxicologyStudyDataHead: any = [];
  toxicologyMonthlyDataCheck: any = [];

  selectedMonthlyToxicologyType: string = "sealant";
  selectedmonthlytoxicologyControl = new FormControl(this.selectedMonthlyToxicologyType);
  constructor(private route: ActivatedRoute,private router: Router,private momentiveService: MomentiveService) {

  }
  ngOnInit() {

    this.momentiveService.notifyObservable$.subscribe(value => {
      this.selecteditem = value;
      console.log(this.selecteditem);
      this.studyToxicology()
      if (this.selecteditem) {
        setTimeout(() => {
          this.onChangeToxicology(this.selecteditem);
        }, 0);
      }
    });

    // toxicology Radio tab API
    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.toxicologyChecks = this.productdata.toxicologyChecks;
      console.log(this.toxicologyChecks);
    }, err => {
      console.error(err);
    });

    // Monthology toxicology dropData
    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.toxicologydropData = this.productdata.toxicologydropData;
      console.log(this.toxicologydropData);
    }, err => {
      console.error(err);
    });

//Study Toxicology Header
    this.toxicologyStudyDataHead = [
      { "field": "product_Name", "header": "product Name" },
      { "field": "ELA", "header": "ELA #" },
      { " field": "spec_Id", "header": "SPecification ID" },
      { "field": "test_Description", "header": "Test Article Describtion" },
      { "field": "study_Title", "header": "Study Title" },
      { "field": "final_Report", "header": "Final Report Date" }
    ],
//Monthly Toxicology Silane Header
      this.toxicologyMonthlysilaneHeader = [
        { "field": "spec_Id", "header": "Specification ID" },
        { "field": "product_Commercial_Name", "header": "product-Commerical Name" },
        { "field": "studies", "header": "Studies" },
        { "field": "status", "header": "Status" },
        { "field": "comments", "header": "Comments" }
      ],
//Monthly Toxicology Selant Header
      this.toxicologyMonthlyselantHeader = [
        { "field": "spec_Id", "header": "Specification ID" },
        { "field": "test", "header": "Test" },
        { "field": "product", "header": "Product" },
        { "field": "date", "header": "Date" },
        { "field": "actions", "header": "Actions" }

      ]
  }


// Study Toxicology API Call
  studyToxicology() {
    this.toxicolgyLoader = true;
    this.toxicologyDetails = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = this.momentiveService.ProductCategoryData;
    console.log(this.CategoryDetails);
    this.toxicologyDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails[0],
    });
    console.log(this.toxicologyDetails);
    this.momentiveService.getToxicology(this.toxicologyDetails).subscribe(data => {
      console.log(data);
      this.toxicolgyLoader = true;
      this.productdata = data;
      if (this.productdata.length > 0) {
        this.toxicologyStudyHead = this.toxicologyStudyDataHead;
        this.toxicologyStudyData = this.productdata;
        this.toxicolgyLoader = false;
        this.pihAlertMessage = false;
      } else {
        this.pihAlertMessage = true;
        this.toxicolgyLoader = false;
      }
    }, err => {
      console.error(err);
    });
  }

  //Monthly Toxicology API Call
  monthlyToxicology(toxiValue) {
    this.monthlyType = toxiValue;
    this.toxicolgyLoader = true;
    this.pihAlertMessage = false;
    this.toxicologyDetails = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = { index: 2, Category: "toxicology", Subcategory: "Monthly Toxicology Study List" }
    this.toxicologyDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails,
    });
    console.log(this.toxicologyDetails);
    this.momentiveService.getToxicology(this.toxicologyDetails).subscribe(data => {
      console.log(data);
      if (this.monthlyType === 'sealant') {
        this.toxicolgyLoader = true;
        this.productdata = data;
        this.toxicologyMonthlyDataCheck = this.productdata[0].selant;
        if (this.toxicologyMonthlyDataCheck.length > 0) {
          this.toxicolgyLoader = false;
          this.pihAlertMessage = false;
          this.monthlySelantHeader = this.toxicologyMonthlyselantHeader;
          this.toxicologyMonthlyData = this.toxicologyMonthlyDataCheck;
          console.log(this.toxicologyMonthlyData);
        }
        else {
          this.pihAlertMessage = true;
          this.toxicolgyLoader = false;
        }
      } if (this.monthlyType === 'silane') {
        this.toxicolgyLoader = true;
        this.productdata = data;
        this.toxicologyMonthlyDataCheck = this.productdata[0].silanes;
        if (this.toxicologyMonthlyDataCheck > 0) {
          this.toxicolgyLoader = false;
          this.pihAlertMessage = false;
          this.monthlySilaneHeader = this.toxicologyMonthlysilaneHeader;
          this.toxicologyMonthlyData = this.toxicologyMonthlyDataCheck;
        } else {
          this.pihAlertMessage = true;
          this.toxicolgyLoader = false;
        }
      }
    }, err => {
      console.error(err);
    });
  }


//Toxicology Summary API Call
  summaryToxicology() {
    this.toxicolgyLoader = true;
    this.pihAlertMessage = false;
    this.toxicologyDetails = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = { index: 2, Category: "toxicology", Subcategory: "Toxicology Summary" }
    console.log(this.CategoryDetails);
    this.toxicologyDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails,
    });
    console.log(this.toxicologyDetails);
    this.momentiveService.getToxicology(this.toxicologyDetails).subscribe(data => {
      console.log(data);
      this.toxicolgyLoader = true;
      this.productdata = data;
      if (this.productdata.length > 0) {
        this.toxicolgyLoader = false;
        this.pihAlertMessage = false;
        this.toxicologySummaryData = this.productdata;
        console.log(this.toxicologySummaryData);
      } else {
        this.pihAlertMessage = true;
        this.toxicolgyLoader = false;
      }
    }, err => {
      console.error(err);
    });
  }

  //Registration Tracker API Call
  registrationTrackerToxicology() {
    this.toxicolgyLoader = true;
    this.toxicologyDetails = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = { index: 3, Category: "toxicology", Subcategory: "Toxicology Registration Tracker" }
    console.log(this.CategoryDetails);
    this.toxicologyDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails,
    });
    console.log(this.toxicologyDetails);
    this.momentiveService.getToxicology(this.toxicologyDetails).subscribe(data => {
      console.log(data);
      this.toxicolgyLoader = true;
      this.productdata = data;
      if (this.productdata.length > 0) {
        this.toxicolgyLoader = false;
        this.pihAlertMessage = false;
        this.registartion_Tracker_Data = this.productdata;
        console.log(this.registartion_Tracker_Data);
      } else {
        this.pihAlertMessage = true;
        this.toxicolgyLoader = false;
      }
    }, err => {
      console.error(err);
    });
  }

  //Monthly Toxicology dropdown
  toxicologyProcess(value) {
    console.log(value);
    this.toxicologyValueCheck = value;
    if (this.toxicologyValueCheck === 'sealant') {
      this.toxicology_sealant = true;
      this.toxicology_silane = false;
      this.monthlyToxicology(this.toxicologyValueCheck);

    }
    if (this.toxicologyValueCheck === 'silane') {
      this.toxicology_sealant = false;
      this.toxicology_silane = true;
      this.monthlyToxicology(this.toxicologyValueCheck);

    }
  }

//Toxicology Tab change Functionality
  onChangeToxicology(item) {
    this.toxicologyTab = item;
    if (this.toxicologyTab === 'Study Title and Date') {
      this.studyCheck = true;
      this.monthlyCheck = false;
      this.summaryCheck = false;
      this.dataCheck = false;
      this.studyToxicology();
      // tslint:disable-next-line: align
    } if (this.toxicologyTab === 'Monthly Toxicology Study List') {
      this.studyCheck = false;
      this.monthlyCheck = true;
      this.summaryCheck = false;
      this.dataCheck = false;
      this.toxicologyProcess('sealant');
    }
    if (this.toxicologyTab === 'Toxicology Summary') {
      this.studyCheck = false;
      this.monthlyCheck = false;
      this.summaryCheck = true;
      this.dataCheck = false;
      this.summaryToxicology();
    }
    if (this.toxicologyTab === 'Toxicology Registration Tracker') {
      this.studyCheck = false;
      this.monthlyCheck = false;
      this.summaryCheck = false;
      this.dataCheck = true;
      this.registrationTrackerToxicology();
    }
  }
  //Sorting Functionality
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
        const result = value1.localeCompare(value2);
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
