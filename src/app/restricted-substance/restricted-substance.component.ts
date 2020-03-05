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
            this.onChangeRestricted(this.selecteditem);
         }, 0);
       }
      });

      // restrictedSubstanceChecks
      this.momentiveService.getSearchData().subscribe(data => {
        this.productdata = data;
        this.restrictedSubstanceChecks = this.productdata.restrictedSubstanceChecks;
        console.log(this.restrictedSubstanceChecks);
      }, err => {
        console.error(err);
      });
  // restrictedGASDLHeader
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.restrictedGASDLHeader = this.productdata.restrictedGASDLHeader;
    console.log(this.restrictedGASDLHeader);
  }, err => {
    console.error(err);
  });
  // restrictedGASDLData
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.restrictedGASDLData = this.productdata.restrictedGASDLData;
    console.log(this.restrictedGASDLData);
  }, err => {
    console.error(err);
  });
  // restrictedCaliforniaHeader
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.restrictedCaliforniaHeader = this.productdata.restrictedCaliforniaHeader;
    console.log(this.restrictedCaliforniaHeader);
  }, err => {
    console.error(err);
  });
  // restrictedCaliforniaData
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.restrictedCaliforniaData = this.productdata.restrictedCaliforniaData;
    console.log(this.restrictedCaliforniaData);
  }, err => {
    console.error(err);
  });
  }

 


    onChangeRestricted(item) {
      this.restrictedSubstanceTab = item;
      if ( this.restrictedSubstanceTab === 'GADSL') {
        this.gadslCheck = true;
        this.californiaCheck = false;
      } else if (this.restrictedSubstanceTab === 'California Pro 65') {
        this.californiaCheck = true;
        this.gadslCheck = false;
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
  }
