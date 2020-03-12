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
  reportLoader: boolean = true;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private momentiveService: MomentiveService,
  ) {

        this.momentiveService.CategoryEvent.subscribe(data => {
        this.releaseDocumentsPage();
       });


  }
  ngOnInit() {

   this.releaseDocumentsPage()
  
    this.reportDataHead = [
      { "field": "category", "header": "Category" },
      { "field":"spec_id" ,"header": "Specification ID"},
      { "field": "generation_Variant", "header": "Generation Variant" },
      { "field": "language", "header": "Language" },
      { "field": "version", "header": "Version" },
      { "field":"released_on", "header":"Released on"}
    ]
  }

  releaseDocumentsPage() {
    this.reportDataDetails =[];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = this.momentiveService.ProductCategoryData;
    console.log(this.CategoryDetails);
    this.reportDataDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails[0],
    });
    console.log(this.reportDataDetails)
    this.momentiveService.getReportDocuments(this.reportDataDetails).subscribe(data => {
      this.reportLoader = false;
      console.log(data);
      this.productdata = data;
       this.reportDataproducts =  this.productdata.reportDataproducts; 
       console.log(this.reportDataproducts);
    
    }, err => {
      console.error(err);
    });
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
