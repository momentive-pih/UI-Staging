import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Attribute } from '@angular/compiler';
import { MatTableDataSource} from '@angular/material';
import {TableModule} from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatDatepickerInputEvent} from '@angular/material/datepicker';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption} from '@ng-select/ng-select';
import { MomentiveService} from '../service/momentive.service'
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;


@Component({
  selector: 'app-customer-communication',
  templateUrl: './customer-communication.component.html',
  styleUrls: ['./customer-communication.component.css']
})
export class CustomerCommunicationComponent implements OnInit {
    selecteditem:any;
    dateForm: FormGroup;
    name = '';
    selectednav: 'active';
    product_Name: any = [];
    product_type: any = [];
    copyproduct_type: any = [];
    products_Empty  = false;
    value: string;
    type: string;
    items: string[];
    selectedIndex: number;
    selectedId: any;
    selectedboxId: any;
    customerCommunicationChecks: any = [];
    customerCommunicationTab = 'US FDA Letter';
    usFDA = true;
    EuFoodContact = false;
    heavyMetals = false;
    communicationHistory = false;
    communicationPart: any = [];
    communicationBU: any = [];
    topicCommunication: any = [];
    productCommunication: any = [];
    productTitle: any;
    cols: any[];
    ccHeavyMetals_Data: any[];
    ccHeavyMetals_Header: any[];
  // Communication History
    CommunicationHistoryData: any[];
    CommunicationHistoryHead: any[];
    commuicationDataCheck: any;
    CopycommunicationHistoryData: any[];
    events: any;
    showDatefield = false;
    ExcelCommunicationHistoryData = [];
    product_NameData: any[];
    Searchname: any;
    productCAS_Number: any;
    radiovalue: any;
    selectedBUValue: any;
    selectedProductValue: any;
    selectedCustomerValue: any;
    parentObject: any;
    productdata: any = [];
    objectKeys = Object.keys;

   //New
    CustomerCommunicationDetails:any=[];
    selectedSpecList:any = [];
    CategoryDetails:any=[];
    customerCommunicationLoader:boolean = true;
    pihAlertMessage:boolean = false;
    USFDAData:any=[];
    EUFoodData:any=[];
    USFDADetailsPage:any = [];
    filename:any;
    productName:any;
    pdfUrl:any;
    Url:any;
    documentResult:any;
    EUFoodDetailsPage:any;
    Extract_Result:any;
    communicationHistoryDetails:any =[];
    USFDADetailDataPage:boolean = false;
    EUFOODdetailDataPage:boolean = false;
    CommunicationHistoryDataHead:any =[];
    HeavyMetalsData:any;
  
    constructor(private fb: FormBuilder, private route: ActivatedRoute,
                private router: Router,private sanitizer: DomSanitizer,
                private momentiveService: MomentiveService,
                ) {

      this.dateForm = fb.group({
        start_Date: new FormControl(new Date()),
        end_Date: new FormControl(new Date()),
      });
    }
    ngOnInit() {


      this.momentiveService.notifyObservable$.subscribe(value => {
        this.selecteditem = value;
        console.log(this.selecteditem);
        this.customerCommunicationUSFDAPage()
        if (this.selecteditem) {
          setTimeout(() => {
            this.onChangeCommunication(this.selecteditem);
         }, 0);
       }
      });


     // customerCommunicationChecks
      this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.customerCommunicationChecks = this.productdata.customerCommunicationChecks;
    }, err => {
      console.error(err);
    });



  // ccHeavyMetals_Data
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.ccHeavyMetals_Data = this.productdata.ccHeavyMetals_Data;
  }, err => {
    console.error(err);
  });

  
  this.CommunicationHistoryDataHead = [
    { "field": "case_Number", "header": "Case Number","width": "10%"  },
    { "field": "topic", "header": "Topic","width": "20%" },
    { "field": "customer_Name", "header": "Customer Name","width": "40%" },
    { "field": "manufacturing_Plant", "header": "Manufacturing Plant","width": "20%"},
    { "field": "key", "header": "key","width": "20%"},
    { "field": "key_Type", "header": "key Type","width": "20%"},
    { "field": "tier_owner", "header": "Tier 2 Owner","width": "20%"}
  ]

}




customerCommunicationUSFDAPage() {
  this.CustomerCommunicationDetails = [];
  this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
  console.log(this.selectedSpecList);
  this.CategoryDetails = this.momentiveService.ProductCategoryData;
  console.log(this.CategoryDetails);
  this.CustomerCommunicationDetails.push({
    'Spec_id': this.selectedSpecList,
    'Category_details': this.CategoryDetails[0],
  });
  console.log(this.CustomerCommunicationDetails)
  this.momentiveService.getCustomerCommunication(this.CustomerCommunicationDetails).subscribe(data => {
       console.log(data);
      this.customerCommunicationLoader = true;
      this.productdata = data;
    if (this.productdata.length > 0) {
      this.customerCommunicationLoader = false;
      this.pihAlertMessage = false;
      this.USFDAData = this.productdata;
      console.log(this.USFDAData);
    } else {
      this.pihAlertMessage = true;
      this.customerCommunicationLoader = false;
    }
  }, err => {
    console.error(err);
  });
}


customerCommunicationEUFOOD() {
  this.CustomerCommunicationDetails = [];
  this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
  console.log(this.selectedSpecList);
  this.CategoryDetails = { index: 1, Category: "Customer Communication", Subcategory: "EU Food Contact" }
  console.log(this.CategoryDetails);
  this.CustomerCommunicationDetails.push({
    'Spec_id': this.selectedSpecList,
    'Category_details': this.CategoryDetails,
  });
  console.log(this.CustomerCommunicationDetails)
  this.momentiveService.getCustomerCommunication(this.CustomerCommunicationDetails).subscribe(data => {
       console.log(data);
      this.customerCommunicationLoader = true;
      this.productdata = data;
    if (this.productdata.length > 0) {
      this.customerCommunicationLoader = false;
      this.pihAlertMessage = false;
      this.EUFoodData = this.productdata;
      console.log(this.EUFoodData);
    } else {
      this.pihAlertMessage = true;
      this.customerCommunicationLoader = false;
    }
  }, err => {
    console.error(err);
  });
}


customerCommunicationHeavyMetal() {
  this.CustomerCommunicationDetails = [];
  this.customerCommunicationLoader = true;
  this.pihAlertMessage = false;
  this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
  console.log(this.selectedSpecList);
  this.CategoryDetails = { index: 2, Category: "Customer Communication", Subcategory: "Heavy Metals content" }
  console.log(this.CategoryDetails);
  this.CustomerCommunicationDetails.push({
    'Spec_id': this.selectedSpecList,
    'Category_details': this.CategoryDetails,
  });
  console.log(this.CustomerCommunicationDetails)
  this.momentiveService.getCustomerCommunication(this.CustomerCommunicationDetails).subscribe(data => {
       console.log(data);
      this.customerCommunicationLoader = true;
      this.productdata = data;
    if (this.productdata.length > 0) {
      this.customerCommunicationLoader = false;
      this.pihAlertMessage = false;
      this.HeavyMetalsData = Object.assign({}, this.productdata);
      console.log(this.HeavyMetalsData);
    } else {
      this.pihAlertMessage = true;
      this.customerCommunicationLoader = false;
    }
  }, err => {
    console.error(err);
  });
}

customerCommunicationHistory() {
  this.customerCommunicationLoader = true;
  this.pihAlertMessage = false;
  this.CustomerCommunicationDetails = [];
  this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
  console.log(this.selectedSpecList);
  this.CategoryDetails = { index: 3, Category: "Customer Communication", Subcategory: "Communication History" }
  console.log(this.CategoryDetails);
  this.CustomerCommunicationDetails.push({
    'Spec_id': this.selectedSpecList,
    'Category_details': this.CategoryDetails,
  });
  console.log(this.CustomerCommunicationDetails)
  this.momentiveService.getCustomerCommunication(this.CustomerCommunicationDetails).subscribe(data => {
       console.log(data);
      this.customerCommunicationLoader = true;
      this.productdata = data;
    if (this.productdata.length > 0) {
      this.customerCommunicationLoader = false;
      this.pihAlertMessage = false;
      this.CommunicationHistoryHead =this.CommunicationHistoryDataHead
      this.CommunicationHistoryData = this.productdata;
      console.log(this.CommunicationHistoryData);
    } else {
      this.pihAlertMessage = true;
      this.customerCommunicationLoader = false;
    }
  }, err => {
    console.error(err);
  });
}

documentUSFDAPreview(data) {
this.USFDADetailDataPage = true;
console.log(data);
this.USFDADetailsPage = data;
console.log(this.USFDADetailsPage);
      this.filename = this.USFDADetailsPage.fileName;
      this.documentResult = this.USFDADetailsPage.Extract_Field.data;
      this.pdfUrl = this.USFDADetailsPage.url;
      console.log(this.filename);
      console.log(this.productName);
      console.log(this.pdfUrl);
      this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl);
      console.log(this.Url);
}

documentsEUFoodPreview(data) {
  this.EUFOODdetailDataPage = true;
  console.log(data);
  this.EUFoodDetailsPage = data;
console.log(this.EUFoodDetailsPage);
      this.filename = this.EUFoodDetailsPage.fileName;
      this.Extract_Result = this.EUFoodDetailsPage.Extract_Field;
      this.pdfUrl = this.EUFoodDetailsPage.url;
      console.log(this.filename);
      console.log(this.Extract_Result);
      console.log(this.pdfUrl);
      this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl);
      console.log(this.Url);
}

    onChangeCommunication(item) {
      this.customerCommunicationTab = item;
      if (this.customerCommunicationTab === 'US FDA Letter') {
        this.usFDA = true;
        this.EuFoodContact = false;
        this.heavyMetals = false;
        this.communicationHistory = false;
        this.customerCommunicationUSFDAPage();
      } else if (this.customerCommunicationTab === 'EU Food Contact') {
        this.usFDA = false;
        this.EuFoodContact = true;
        this.heavyMetals = false;
        this.communicationHistory = false;
        this.customerCommunicationEUFOOD();
      } else if ( this.customerCommunicationTab === 'Heavy Metals content') {
        this.heavyMetals = true;
        this.communicationHistory = false;
        this.usFDA = false;
        this.EuFoodContact = false;
        this.customerCommunicationHeavyMetal();
      } else if (this.customerCommunicationTab === 'Communication History') {
        this.heavyMetals = false;
        this.communicationHistory = true;
        this.usFDA = false;
        this.EuFoodContact = false;
        this.customerCommunicationHistory();
      }
    }
 

     communicationProcess(data) {
      this.commuicationDataCheck = data;
      console.log(this.commuicationDataCheck);
      // tslint:disable-next-line: max-line-length
      this.CommunicationHistoryData = this.CopycommunicationHistoryData.filter((communication) => ( communication.customer_name  === this.commuicationDataCheck 
      || communication.product_name === this.commuicationDataCheck
      || communication.bu === this.commuicationDataCheck
      || communication.topic === this.commuicationDataCheck));
      console.log(this.CommunicationHistoryData);
      }
    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
      this.events = event.value;
      console.log(this.events);
    }
    chooseDate() {
      this.showDatefield = true;
    }
    createOwner(value) {
  console.log(value);
    }
    onCancel() {
      this.showDatefield = false;
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

  customerNameFilter() {
    const CustomerNameData = 'OU EUROBIO LAB';
    this.CommunicationHistoryData = this.CopycommunicationHistoryData.filter((customer) => (customer.customer_name == CustomerNameData ));
    console.log(this.CommunicationHistoryData);
  }

  backToUSPage() {
    this.USFDADetailDataPage = false;
  }
  backToEUPage(){
    this.EUFOODdetailDataPage = false;
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
intialSort() {
  return 0;
}

  }