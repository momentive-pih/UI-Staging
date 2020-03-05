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
    selectedSalesVolumeDataProducts: any [];
    radiovalue: any;
  
    productdata: any = [];

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
            this.onChangeToxicology(this.selecteditem);
         }, 0);
       }
      });

      // toxicologyChecks
      this.momentiveService.getSearchData().subscribe(data => {
        this.productdata = data;
        this.toxicologyChecks = this.productdata.toxicologyChecks;
        console.log(this.toxicologyChecks);
      }, err => {
        console.error(err);
      });
      // toxicologydropData
      this.momentiveService.getSearchData().subscribe(data => {
        this.productdata = data;
        this.toxicologydropData = this.productdata.toxicologydropData;
        console.log(this.toxicologydropData);
      }, err => {
        console.error(err);
      });
// toxicologyStudyHead
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.toxicologyStudyHead = this.productdata.toxicologyStudyHead;
    console.log(this.toxicologyStudyHead);
  }, err => {
    console.error(err);
  });
  // toxicologyStudyData
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.toxicologyStudyData = this.productdata.toxicologyStudyData;
    console.log(this.toxicologyStudyData);
  }, err => {
    console.error(err);
  });
  // toxicologyMonthlyHeader
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.toxicologyMonthlyHeader = this.productdata.toxicologyMonthlyHeader;
    console.log(this.toxicologyMonthlyHeader);
  }, err => {
    console.error(err);
  });
  // toxicologyMonthlyData
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.toxicologyMonthlyData = this.productdata.toxicologyMonthlyData;
    console.log(this.toxicologyMonthlyData);
  }, err => {
    console.error(err);
  });
  }




    toxicologyProcess(value) {
      this.toxicologyValueCheck = value;
  
      if ( this.toxicologyValueCheck === 'sealant') {
        this.toxicology_sealant = true;
        this.toxicology_silane = false;
  
      }
      if ( this.toxicologyValueCheck === 'silane') {
        this.toxicology_sealant = false;
        this.toxicology_silane = true;
  
      }
    }
    onChangeToxicology(item) {
      this.toxicologyTab = item;
      if ( this.toxicologyTab === 'Study Title and Date') {
        this.studyCheck = true;
        this.monthlyCheck = false;
        this.summaryCheck = false;
        this.dataCheck = false;
  
      // tslint:disable-next-line: align
      }if (this.toxicologyTab === 'Monthly Toxicology Study List') {
        this.studyCheck = false;
        this.monthlyCheck = true;
        this.summaryCheck = false;
        this.dataCheck = false;
      }
      if (this.toxicologyTab === 'Toxicology Summary') {
        this.studyCheck = false;
        this.monthlyCheck = false;
        this.summaryCheck = true;
        this.dataCheck = false;
      }
      if (this.toxicologyTab === 'Toxicology Registration Tracker') {
        this.studyCheck = false;
        this.monthlyCheck = false;
        this.summaryCheck = false;
        this.dataCheck = true;
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
