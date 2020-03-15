import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Attribute } from '@angular/compiler';
import { MatTableDataSource} from '@angular/material';
import { TableModule} from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption} from '@ng-select/ng-select';
import { MomentiveService} from '../service/momentive.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-sales-volume',
  templateUrl: './sales-volume.component.html',
  styleUrls: ['./sales-volume.component.css']
})
export class SalesVolumeComponent implements OnInit {
    selecteditem:any;
    
    product_Name: any = [];
    product_type: any = [];
    salesCheckData: any = [];
    saleTab = 'Regions where sold';
    volumeCheck = true;
    locationCheck = false;
    salesReport: any;
    
    // Sales Volume
    saleDataHead: any[];
    saleDataProducts: any[];
    selectedSalesVolumeDataProducts: any[];
    selectedSalesVolumeDataColumns: any[];
    salesDatapaginator = false;
    radiovalue: any;
    productdata: any = [];
    objectKeys = Object.keys;

    selectedSpecList: any = [];
    CategoryDetails: any = [];
    salesInformationDetails:any=[];
    salesDataproducts:any=[];
    salesInformationLoader:boolean = true;
    pihAlertMessage:boolean;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private momentiveService: MomentiveService,
               ) {

                this.momentiveService.CategoryEvent.subscribe(data => {
                  this.salesInformationPage();
                 });
    }
    ngOnInit() {

      this.momentiveService.notifyObservable$.subscribe(value => {
        this.selecteditem = value;
        this.salesInformationPage();
        console.log(this.selecteditem);
        if (this.selecteditem) {
      
          setTimeout(() => {
            this.onChangeSales(this.selecteditem);
         }, 0);
       }
      });

      // sales_Report
      this.momentiveService.getSearchData().subscribe(data => {
        this.productdata = data;
        this.salesReport = this.productdata.salesReport;
        console.log(this.salesReport);
      }, err => {
        console.error(err);
      });
      // salesCheckData
      this.momentiveService.getSearchData().subscribe(data => {
        this.productdata = data;
        this.salesCheckData = this.productdata.salesCheckData;
        console.log(this.salesCheckData);
      }, err => {
        console.error(err);
      });



       this.saleDataHead = [
        { "field": "basic_data", "header": "Basic Data" },
        { "field": "spec_id", "header": "Specification ID" },
        { "field":"material_description" ,"header": "Material Description"},
        { "field": "material_number", "header": "Material Number" },
        { "field": "past_Sales", "header": "Past Sales" },
        { "field": "region_sold", "header": "Region where sold" },
        { "field": "sales_Org", "header":"Sales Org"}
      ]
    }

  salesInformationPage() {
    this.salesInformationLoader = true;
    this.salesInformationDetails =[];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = this.momentiveService.ProductCategoryData;
    console.log(this.CategoryDetails);
    this.salesInformationDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails[0],
    });
    console.log(this.salesInformationDetails)
    this.momentiveService.getSalesInformation(this.salesInformationDetails).subscribe(data => {
      console.log(data);
      this.productdata = data;
      if(this.productdata.length > 0){
        this.salesInformationLoader = false;
        this.pihAlertMessage = false;
        this.salesDataproducts =  this.productdata[0].saleDataProducts; 
        console.log(this.salesDataproducts);
      } else {
        this.pihAlertMessage = true;
        this.salesInformationLoader = false;
      }
      
    }, err => {
      console.error(err);
    });
  }


    onChangeSales(item) {
      this.saleTab = item;
      if ( this.saleTab === 'Sales Volume') {
        this.volumeCheck = true;
        this.locationCheck = false;
      // tslint:disable-next-line: align
      }if (this.saleTab === 'Regions where sold') {
        this.locationCheck = true;
        this.volumeCheck = false;
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

  mySort(event: any, field: string) {
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
  
  }
