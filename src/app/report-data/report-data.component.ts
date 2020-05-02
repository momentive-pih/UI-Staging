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
  selectedSpecList: any = [];
  CategoryDetails: any = [];
  reportDataDetails: any = [];
  reportDetailDataproducts:any = [];
  reportLoader: boolean = true;
  pihAlertMessage: boolean;
  documentTypes: any;
  historical_documents: boolean;
  released_documents: boolean = true;
  DocumentPart: any;
  reportHistoryDataDataproducts: any = []
  selectedDocuments: string = "Released Documents";
  selectedCompositionControl = new FormControl(this.selectedDocuments);

  constructor(private route: ActivatedRoute,private router: Router,private momentiveService: MomentiveService
  ) {
    this.momentiveService.CategoryEvent.subscribe(data => {
      this.releaseDocumentsPage();
    });


  }
  ngOnInit() {

    this.releaseDocumentsPage()

    this.DocumentPart = [{
      "type": "Released Documents",
      "value": "Released Documents"
    }, {
      "type": "Historical Documents",
      "value": "Historical Documents"
    },],

    //Report Data Header
      this.reportDataHead = [
        { "field": "category", "header": "Category" },
        { "field": "spec_id", "header": "Real Spec & NAM Prod" },
        { "field": "generation_Variant", "header": "Generation Variant" },
        { "field": "language", "header": "Language" },
        { "field": "version", "header": "Version" },
        { "field": "released_on", "header": "Released on" }
      ]
  }

  //Release Document API Call
  releaseDocumentsPage() {
    this.reportLoader = true;
    this.reportDataDetails = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = this.momentiveService.ProductCategoryData;
    console.log(this.CategoryDetails);
    this.reportDataDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails[0],
      'product_Level':this.momentiveService.getProductLevelDetails(),
      'Mat_Level':this.momentiveService.getMaterialLevelDetails(),
      'CAS_Level':this.momentiveService.getCasLevelDetails(),
    });
    console.log(this.reportDataDetails)
    this.momentiveService.getReportDocuments(this.reportDataDetails).subscribe(data => {
      console.log(data);
      this.productdata = data;
      console.log(this.productdata);
      if (this.productdata.length > 0) {
        this.reportLoader = false;
        this.pihAlertMessage = false;
        this.reportHistoryDataDataproducts = this.productdata;
        console.log(this.reportHistoryDataDataproducts);
        this.reportDetailDataproducts = this.reportHistoryDataDataproducts.filter((element) => (element.status === 'Released'))
        this.reportDataproducts = this.reportDetailDataproducts.sort((a, b) => {
          return <any>new Date(b.released_on) - <any>new Date(a.released_on);
        });
        console.log(this.reportDataproducts);
      }
      else {
        this.pihAlertMessage = true;
        this.reportLoader = false;
      }

    }, err => {
      console.error(err);
    });
  }


//Historical Document API call
  historicalDocumentsPage() {
    this.reportLoader = true;
    this.reportDataDetails = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = this.momentiveService.ProductCategoryData;
    console.log(this.CategoryDetails);
    this.reportDataDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails[0],
      'product_Level':this.momentiveService.getProductLevelDetails(),
      'Mat_Level':this.momentiveService.getMaterialLevelDetails(),
      'CAS_Level':this.momentiveService.getCasLevelDetails(),
    });
    console.log(this.reportDataDetails)
    this.momentiveService.getReportDocuments(this.reportDataDetails).subscribe(data => {
      console.log(data);
      this.productdata = data;
      if (this.productdata.length > 0) {
        this.reportLoader = false;
        this.pihAlertMessage = false;
        this.reportHistoryDataDataproducts = this.productdata;
        this.reportDetailDataproducts = this.reportHistoryDataDataproducts.filter((report) => (report.status === 'Historical'))
        this.reportDataproducts = this.reportDetailDataproducts.sort((a, b) => {
            return <any>new Date(b.released_on) - <any>new Date(a.released_on);
          });
        console.log(this.reportDataproducts);
      }
      else {
        this.pihAlertMessage = true;
        this.reportLoader = false;
      }

    }, err => {
      console.error(err);
    });
  }

  //Dropdown select Function
  selectDocumentsType(value) {
    console.log(value);
    this.documentTypes = value;
    if (this.documentTypes === 'Historical Documents') {
      this.historical_documents = true;
      this.released_documents = false;
      this.historicalDocumentsPage();
    } else if (this.documentTypes === 'Released Documents') {
      this.historical_documents = false;
      this.released_documents = true;
      this.releaseDocumentsPage();
    }
  }

  //sorting  Functionality
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
  onDeSelectAll(items: any) {
    console.log(items);
  }
}
