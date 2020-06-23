import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Attribute } from '@angular/compiler';
import { MatTableDataSource } from '@angular/material';
import { TableModule } from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { MomentiveService } from '../service/momentive.service'
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;


@Component({
  selector: 'app-customer-communication',
  templateUrl: './customer-communication.component.html',
  styleUrls: ['./customer-communication.component.css']
})
export class CustomerCommunicationComponent implements OnInit {
  selecteditem: any;
  dateForm: FormGroup;
  name = '';
  selectednav: 'active';
  product_Name: any = [];
  product_type: any = [];
  copyproduct_type: any = [];
  products_Empty = false;
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
  CustomerCommunicationDetails: any = [];
  selectedSpecList: any = [];
  CategoryDetails: any = [];
  customerCommunicationLoader: boolean = true;
  pihAlertMessage: boolean = false;
  USFDAData: any = [];
  EUFoodData: any = [];
  USFDADetailsPage: any = [];
  filename: any;
  productName: any;
  pdfUrl: any;
  Url: any;
  documentResult: any;
  EUFoodDetailsPage: any;
  Extract_Result: any;
  communicationHistoryDetails: any = [];
  USFDADetailDataPage: boolean = false;
  EUFOODdetailDataPage: boolean = false;
  contentHeight:boolean = false;
  CommunicationHistoryDataHead: any = [];
  HeavyMetalsData: any;
  communicationHistoryEmailSection:boolean = false;
  emailCasNumber:any;
  emailDetailsContent:any;
  categorizeArrayData:any=[];
  productLevelCategoy:any=[];
  materialLevelCategoy:any =[];
  casLevelCategoy:any=[];
  categoryLevelData:any;
  topcheckedData:boolean = true

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private sanitizer: DomSanitizer,
    private momentiveService: MomentiveService,
  ) {

    this.dateForm = fb.group({
      start_Date: new FormControl(new Date()),
      end_Date: new FormControl(new Date()),
    });
  }
  ngOnInit() {

   //Intial loading for customer Comminication page:

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
    this.contentHeight = false;
    this.momentiveService.notifyCheckObservable$.subscribe(value =>{
      console.log(value);
      this.topcheckedData = value;
      this.contentHeight = !this.contentHeight;
    })
  
 //Collapse script
 $('.collapse').on('show.bs.collapse', function () {
  $('.collapse').each(function(){
      $(this).collapse('hide');
  });
});

    
   

    //customerCommunication options array
    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.customerCommunicationChecks = this.productdata.customerCommunicationChecks;
    }, err => {
      console.error(err);
    });

   //Communication History Table Header
    this.CommunicationHistoryDataHead = [
      { "field": "case_Number", "header": "Case Number"},
      { "field": "topic", "header": "Topic"},
      { "field": "customer_Name", "header": "Customer Name" },
      { "field": "manufacturing_Plant", "header": "Manufacturing Plant"},
      { "field": "key", "header": "Identifier" },
      { "field": "product_Type", "header": "Identifier Category/Type"},
      { "field": "tier_2_Owner", "header": "Tier 2 Owner"}
    ]
  }

//USFDA API call function:
  customerCommunicationUSFDAPage() {
    this.CustomerCommunicationDetails = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = this.momentiveService.ProductCategoryData;
    console.log(this.CategoryDetails);
    this.CustomerCommunicationDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails[0],
      'product_Level':this.momentiveService.getProductLevelDetails(),
      'Mat_Level':this.momentiveService.getMaterialLevelDetails(),
      'CAS_Level':this.momentiveService.getCasLevelDetails(),
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
        this.categorizeProductType(this.USFDAData);
      } else {
        this.pihAlertMessage = true;
        this.customerCommunicationLoader = false;
      }
    }, err => {
      console.error(err);
    });
  }

//EU FOOD Contact API call function:
  customerCommunicationEUFOOD() {
    this.CustomerCommunicationDetails = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = { index: 1, Category: "Customer Communication", Subcategory: "EU Food Contact" }
    console.log(this.CategoryDetails);
    this.CustomerCommunicationDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails,
      'product_Level':this.momentiveService.getProductLevelDetails(),
      'Mat_Level':this.momentiveService.getMaterialLevelDetails(),
      'CAS_Level':this.momentiveService.getCasLevelDetails(),
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
        this.categorizeProductType(this.EUFoodData);
      } else {
        this.pihAlertMessage = true;
        this.customerCommunicationLoader = false;
      }
    }, err => {
      console.error(err);
    });
  }

//Heavy Metal API call function:
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
      'product_Level':this.momentiveService.getProductLevelDetails(),
      'Mat_Level':this.momentiveService.getMaterialLevelDetails(),
      'CAS_Level':this.momentiveService.getCasLevelDetails(),
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

  //Customer Communication API call function:
  customerCommunicationHistory(value) {
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
      'product_Level':this.momentiveService.getProductLevelDetails(),
      'Mat_Level':this.momentiveService.getMaterialLevelDetails(),
      'CAS_Level':this.momentiveService.getCasLevelDetails(),
    });
    console.log(this.CustomerCommunicationDetails)
    this.momentiveService.getCustomerCommunication(this.CustomerCommunicationDetails).subscribe(data => {
      console.log(data);
       this.customerCommunicationLoader = true;
      this.productdata = data;
      if (this.productdata.length > 0) {
        this.customerCommunicationLoader = false;
        this.pihAlertMessage = false;
        this.CommunicationHistoryHead = this.CommunicationHistoryDataHead
        this.CommunicationHistoryData = this.productdata;
        console.log(this.CommunicationHistoryData);
        this.categorizeProductType(this.CommunicationHistoryData);
      } else {
        this.pihAlertMessage = true;
        this.customerCommunicationLoader = false;
      }
    }, err => {
      console.error(err);
    });
  }

// USFDA Detail Preview page Function:
  documentUSFDAPreview(data) {
    this.USFDADetailDataPage = true;
    console.log(data);
    this.USFDADetailsPage = data;
    console.log(this.USFDADetailsPage);
    this.filename = this.USFDADetailsPage.fileName;
    this.documentResult = this.USFDADetailsPage.Extract_Field.data;
    this.pdfUrl = this.USFDADetailsPage.url;
    console.log(this.pdfUrl);
    // let SAS_token = '?sv=2019-02-02&ss=b&srt=sco&sp=rl&se=2020-05-29T20:19:29Z&st=2020-04-02T12:19:29Z&spr=https&sig=aodIg0rDPVsNEJY7d8AerhD79%2FfBO9LZGJdx2j9tsCM%3D';
    // let urlPDF = this.pdfUrl + SAS_token;
    this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl);
    console.log(this.Url);
  }

  // EU FOOD Contact  Detail Preview page Function:
  documentsEUFoodPreview(data) {
    this.EUFOODdetailDataPage = true;
    console.log(data);
    this.EUFoodDetailsPage = data;
    console.log(this.EUFoodDetailsPage);
    this.filename = this.EUFoodDetailsPage.fileName;
    this.Extract_Result = this.EUFoodDetailsPage.Extract_Field;
    this.pdfUrl = this.EUFoodDetailsPage.url;
    console.log(this.pdfUrl);
    // let SAS_token = '?sv=2019-02-02&ss=b&srt=sco&sp=rl&se=2020-05-29T20:19:29Z&st=2020-04-02T12:19:29Z&spr=https&sig=aodIg0rDPVsNEJY7d8AerhD79%2FfBO9LZGJdx2j9tsCM%3D';
    // let urlPDF = this.pdfUrl + SAS_token;
    console.log( this.pdfUrl);
    this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl);
    console.log(this.Url);
  }
  //EmailHistoryPage
  emailHistoryPage(data) {
    this.communicationHistoryEmailSection = true;
    this.customerCommunicationLoader = true;
    this.emailCasNumber = data;
    this.CustomerCommunicationDetails = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = { index: 3, Category: "Customer Communication", Subcategory: "Communication History" }
    console.log(this.CategoryDetails);
    this.CustomerCommunicationDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails,
      'case_Number': this.emailCasNumber,
      'product_Level':this.momentiveService.getProductLevelDetails(),
      'Mat_Level':this.momentiveService.getMaterialLevelDetails(),
      'CAS_Level':this.momentiveService.getCasLevelDetails(),
    });
    console.log(this.CustomerCommunicationDetails)
    this.momentiveService.getCustomerCommunication(this.CustomerCommunicationDetails).subscribe(data => {
      console.log(data);
      this.productdata = data;
      if(this.productdata.length > 0) {
        this.customerCommunicationLoader = false;
      this.emailDetailsContent = this.productdata;
      } else {

      }
    });
  }

  //Radio Button Option change Functionality
  onChangeCommunication(item) {
    this.customerCommunicationTab = item;
    if (this.customerCommunicationTab === 'US FDA Letter') {
      this.usFDA = true;
      this.EuFoodContact = false;
      this.heavyMetals = false;
      this.communicationHistory = false;
      this.USFDADetailDataPage = false;
      this.customerCommunicationUSFDAPage();
    } else if (this.customerCommunicationTab === 'EU Food Contact') {
      this.usFDA = false;
      this.EuFoodContact = true;
      this.heavyMetals = false;
      this.communicationHistory = false;
      this.EUFOODdetailDataPage = false;
      this.customerCommunicationEUFOOD();
    } else if (this.customerCommunicationTab === 'Heavy Metals content') {
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
      this.communicationHistoryEmailSection = false;
      this.customerCommunicationHistory('product_level');
    }
  }

  //Page Redirect Function in US FDA & EU Food Contact:
  backToUSPage() {
    this.USFDADetailDataPage = false;
  }
  backToEUPage() {
    this.EUFOODdetailDataPage = false;
  }
backToCommunication() {
  this.communicationHistoryEmailSection = false;
}
  //Table Sorting Functionality
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
  intialSort() {
    return 0;
  }
  documentKey(data) {
    console.log(data);
  }

  categorizeProductType(productData){
    this.materialLevelCategoy =[];
    this.productLevelCategoy =[];
    this.casLevelCategoy =[];

    this.categorizeArrayData = productData;
    this.categorizeArrayData.forEach(element => {
      if(element.product_Type == 'BDT' || element.product_Type == 'MATNBR') {
        this.materialLevelCategoy.push(element);
      }
      else if(element.product_Type == 'NAMPROD' || element.product_Type == 'NAMSYN' || element.product_Type == 'REALSPEC') {
        this.productLevelCategoy.push(element);
      }
      else if(element.product_Type == 'NUMCAS' || element.product_Type == 'CHEMICAL' || element.product_Type == 'PURESPEC') {
        this.casLevelCategoy.push(element);
      }
    })
  console.log(this.productLevelCategoy);
  console.log(this.materialLevelCategoy);
  console.log(this.casLevelCategoy);

  }
}