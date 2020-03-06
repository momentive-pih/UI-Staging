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
    constructor(private route: ActivatedRoute,
                private router: Router,
                private momentiveService: MomentiveService,
               ) {
    }
    ngOnInit() {

      this.momentiveService.notifyObservable$.subscribe(value => {
        this.selecteditem = value;
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

 // saleDataHead
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.saleDataHead = this.productdata.saleDataHead;
    console.log(this.saleDataHead);
  }, err => {
    console.error(err);
  });
  // saleDataProducts
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    console.log(this.productdata);
    this.saleDataProducts = this.productdata.saleDataProducts;
    console.log(this.saleDataProducts);
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
