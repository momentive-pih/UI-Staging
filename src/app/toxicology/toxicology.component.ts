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
import { DomSanitizer } from '@angular/platform-browser';
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

  monthlyToxicologyHeader:any =[]
  productdata: any = [];
  toxicologySummaryData: any = [];
  toxicologyRegistrationTracker: any = [];
  registartion_Tracker_Data: any = [];
  toxicologyStudyDataHead: any = [];
  toxicologyMonthlyDataCheck: any = [];
  toxicologyMonthlySelantCheck:any =[];
  toxicologyMonthlySilaneCheck:any =[];
  registrationTrackerHeader:any=[];
  registrationSummaryHeader:any=[];
  registrationHeader:any =[];
  SummaryHeader:any=[];
  toxicologySummaryDataPage:boolean = false;
  toxicologySummaryPage:any;
  filename:any;
  Extract_Result:any;
  pdfUrl:any;
  categorizeArrayData:any=[];
  productLevelCategoy:any=[];
  materialLevelCategoy:any =[];
  casLevelCategoy:any=[];
  Url:any;
  toxicologyStudyDataPage:boolean = false;
  contentHeight:boolean = false;
  toxicologyStudyPage:any;
  Extract_Result_one:any;
  selectedMonthlyToxicologyType: string = "sealant";
  topcheckedData:boolean = true;
  toxicologyMonthlyStudyList:any = [];
  toxicologyProductStudyDataHead:any =[];
  toxicologyMaterialStudyDataHead:any =[];
  toxicologyCASStudyHead:any =[];
  registrationProductSummaryHeader:any=[];
      registrationMaterialSummaryHeader:any=[];
      registrationCASSummaryHeader:any=[];
  scrollHeight = '300px'
  selectedmonthlytoxicologyControl = new FormControl(this.selectedMonthlyToxicologyType);
  constructor(private route: ActivatedRoute,private sanitizer: DomSanitizer,private router: Router,private momentiveService: MomentiveService) {

  }
  ngOnInit() {

     //Collapse script
  $('.collapse').on('show.bs.collapse', function () {
    $('.collapse').each(function(){
        $(this).collapse('hide');
    });
  });

  // this.scrollHeight = '300px'
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
    this.contentHeight = false;
    this.momentiveService.notifyCheckObservable$.subscribe(value =>{
      console.log(value);
      this.topcheckedData = value;
      this.contentHeight = !this.contentHeight;
      if(value == true) {
        this.scrollHeight = '300px'
      } else if(value == false) {
        this.scrollHeight = '400px'
      }
  
    })

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

this.toxicologyProductStudyDataHead = [
  { "field": "spec_Id", "header": "Specification Id" },
  { "field": "product_Name", "header": "Identifier" },
  { "field": "product_Type", "header": "Identifier Category/Type" },
  { "field": "file_Source", "header": "File Source" },
  { "field": "test_Description", "header": "Test Description" },
  { "field": "filename", "header": "File Name" },
],
    this.toxicologyMaterialStudyDataHead = [
      { "field": "spec_Id", "header": "Specification Id" },
      { "field": "product_Name", "header": "Name" },
      { "field": "product_Type", "header": "Type" },
      { "field": "file_Source", "header": "File Source" },
      { "field": "test_Description", "header": "Test Description" },
      { "field": "filename", "header": "File Name" },
    ],
    this.toxicologyCASStudyHead = [
      { "field": "spec_Id", "header": "Specification Id" },
      { "field": "product_Name", "header": "Identifier" },
      { "field": "product_Type", "header": "Identifier Category/Type" },
      { "field": "standardComposition", "header": "Standard Composition" },
      { "field": "legalComposition", "header": "Legal Composition" },
      { "field": "file_Source", "header": "File Source" },
      { "field": "test_Description", "header": "Test Description" },
      { "field": "filename", "header": "File Name" },
    ]
//Monthly Toxicology  Header

      this.toxicologyMonthlyStudyList = [
        { "field": "spec_Id", "header": "Specification Id","width" :"130px" },
        { "field": "product_Name", "header": "Identifier","width" :"120px" },
        { "field": "product_Type", "header": "Identifier Category/Type" ,"width" :"120px"},
        { "field": "segment", "header": "segment","width" :"120px" },
        { "field": "file_Source", "header": "File Source","width" :"120px" },
        { "field": "date", "header":"Date","width" :"150px"},
        { "field": "studies", "header": "Studies","width" :"250px" },
        { "field": "comments", "header": "Comments" ,"width" :"400px"},
        { "field": "status", "header": "Status","width" :"250px"},
        { "field": "actions", "header": "Actions","width" :"200px"},
        { "field": "test", "header": "Test","width" :"200px" }
      
      ],

      
        //RegistrationTracker
   this.registrationProductSummaryHeader = [
    { "field": "spec_Id", "header": "Specification Id" },
    { "field": "product_Name", "header": "Identifier" },
    { "field": "product_Type", "header": "Identifier Category/Type" },
    { "field": "file_Source", "header": "File Source" },
    { "field": "filename", "header": "File Name" },
  ],
  this.registrationMaterialSummaryHeader = [
    { "field": "spec_Id", "header": "Specification Id" },
    { "field": "product_Name", "header": "Name" },
    { "field": "product_Type", "header": "Type" },
    { "field": "file_Source", "header": "File Source" },
    { "field": "filename", "header": "File Name" },
  ],
  this.registrationCASSummaryHeader = [
    { "field": "spec_Id", "header": "Specification Id" },
    { "field": "product_Name", "header": "Identifier" },
    { "field": "product_Type", "header": "Identifier Category/Type" },
    { "field": "StandardComposition", "header": "Standard Composition" },
    { "field": "compositionValue", "header": "Composition Value" },
    { "field": "file_Source", "header": "File Source" },
    { "field": "filename", "header": "File Name" },
  ]
  //RegistrationTracker
   this.registrationTrackerHeader = [
    { "field": "product_Name", "header": "Product Name","width":"10%"},
    { "field": "country_Name", "header": "Country","width" :"10%"},
    { "field": "tonnage_Band", "header": "Tonnage Band","width" :"10%" },
    { "field": "study_Type", "header": "Study Type","width" :"10%" },
    { "field": "test_Method", "header": "Test Method","width" :"10%" },
    { "field": "test_Name", "header": "Test Name","width" :"15%" },
    { "field": "estimated_Timing", "header": "Estimated Timing","width" :"10%"},
    { "field": "estimated_Cost", "header": "Estimated Cost","width" :"10%" },
    { "field": "new_Estimates", "header": "New Estimates","width" :"10%" }
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
      'product_Level':this.momentiveService.getProductLevelDetails(),
      'Mat_Level':this.momentiveService.getMaterialLevelDetails(),
      'CAS_Level':this.momentiveService.getCasLevelDetails(),
    });
    console.log(this.toxicologyDetails);
    this.momentiveService.getToxicology(this.toxicologyDetails).subscribe(data => {
      console.log(data);
      this.toxicolgyLoader = true;
      this.productdata = data;
      if (this.productdata.length > 0) {
        this.toxicologyStudyData = this.productdata;
        this.categorizeProductType(this.toxicologyStudyData);
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
  // monthlyToxicology(toxiValue) {
  //   this.monthlyType = toxiValue;
  //   this.toxicolgyLoader = true;
  //   this.pihAlertMessage = false;
  //   this.toxicologyDetails = [];
  //   this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
  //   console.log(this.selectedSpecList);
  //   this.CategoryDetails = { index: 2, Category: "toxicology", Subcategory: "Monthly Toxicology Study List" }
  //   this.toxicologyDetails.push({
  //     'Spec_id': this.selectedSpecList,
  //     'Category_details': this.CategoryDetails,
  //     'product_Level':this.momentiveService.getProductLevelDetails(),
  //     'Mat_Level':this.momentiveService.getMaterialLevelDetails(),
  //     'CAS_Level':this.momentiveService.getCasLevelDetails(),
  //   });
  //   console.log(this.toxicologyDetails);
  //   this.momentiveService.getToxicology(this.toxicologyDetails).subscribe(data => {
  //     console.log(data);
  //     this.productdata = data;
  //     this.toxicologyMonthlySelantCheck = this.productdata[0].selant;
  //     console.log(this.toxicologyMonthlySelantCheck);
  //     this.toxicologyMonthlySilaneCheck = this.productdata[0].silanes;
  //     console.log(this.toxicologyMonthlySilaneCheck);
  //     if (this.monthlyType === 'sealant') {
  //       this.toxicolgyLoader = true;
  //       this.productdata = data;
  //       this.toxicologyMonthlyDataCheck = this.productdata[0].selant;
  //       if (this.toxicologyMonthlyDataCheck.length > 0) {
  //         this.toxicolgyLoader = false;
  //         this.pihAlertMessage = false;
  //         this.monthlySelantHeader = this.toxicologyMonthlyselantHeader;
  //         this.toxicologyMonthlyData = this.toxicologyMonthlyDataCheck;
  //         console.log(this.toxicologyMonthlyData);
  //       }
  //       else {
  //         this.pihAlertMessage = true;
  //         this.toxicolgyLoader = false;
  //       }
  //     } if (this.monthlyType === 'silane') {
  //       this.toxicolgyLoader = true;
  //       this.productdata = data;
  //       this.toxicologyMonthlyDataCheck = this.productdata[0].silanes;
  //       if (this.toxicologyMonthlyDataCheck.length > 0) {
  //         this.toxicolgyLoader = false;
  //         this.pihAlertMessage = false;
  //         this.monthlySilaneHeader = this.toxicologyMonthlysilaneHeader;
  //         this.toxicologyMonthlyData = this.toxicologyMonthlyDataCheck;
  //         console.log(this.toxicologyMonthlyData);
  //       } else {
  //         this.pihAlertMessage = true;
  //         this.toxicolgyLoader = false;
  //       }
  //     }
  //   }, err => {
  //     console.error(err);
  //   });
  // }


//Toxicology Summary API Call
 

toxicologyMonthlyStudy() {
    this.toxicolgyLoader = true;
    this.pihAlertMessage = false;
    this.toxicologyDetails = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = { index: 2, Category: "toxicology", Subcategory: "Monthly Toxicology Study List" }
    this.toxicologyDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails,
      'product_Level':this.momentiveService.getProductLevelDetails(),
      'Mat_Level':this.momentiveService.getMaterialLevelDetails(),
      'CAS_Level':this.momentiveService.getCasLevelDetails(),
    });
    console.log(this.toxicologyDetails);
    this.momentiveService.getToxicology(this.toxicologyDetails).subscribe(data => {
      console.log(data);
      this.productdata = data;
        this.toxicolgyLoader = true;
        this.productdata = data;
        this.toxicologyMonthlyDataCheck = this.productdata;
        console.log(this.toxicologyMonthlyDataCheck);
        if (this.toxicologyMonthlyDataCheck.length > 0) {
          this.toxicolgyLoader = false;
          this.pihAlertMessage = false;
          this.monthlyToxicologyHeader = this.toxicologyMonthlyStudyList;
          this.toxicologyMonthlyData = this.toxicologyMonthlyDataCheck;
          console.log(this.toxicologyMonthlyData);
        }
        else {
          this.pihAlertMessage = true;
          this.toxicolgyLoader = false;
        }
      });
}



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
      'product_Level':this.momentiveService.getProductLevelDetails(),
      'Mat_Level':this.momentiveService.getMaterialLevelDetails(),
      'CAS_Level':this.momentiveService.getCasLevelDetails(),
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
      
       this.categorizeProductType(this.toxicologySummaryData);
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
    this.pihAlertMessage = false;
    this.toxicologyDetails = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = { index: 3, Category: "toxicology", Subcategory: "Toxicology Registration Tracker" }
    console.log(this.CategoryDetails);
    this.toxicologyDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails,
      'product_Level':this.momentiveService.getProductLevelDetails(),
      'Mat_Level':this.momentiveService.getMaterialLevelDetails(),
      'CAS_Level':this.momentiveService.getCasLevelDetails(),
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
        this.registrationHeader = this.registrationTrackerHeader;
        this.categorizeProductType(this.registartion_Tracker_Data);
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
  // toxicologyProcess(value) {
  //   console.log(value);
  //   this.toxicologyValueCheck = value;
  //   if (this.toxicologyValueCheck === 'sealant') {
  //     this.toxicology_sealant = true;
  //     this.toxicology_silane = false;
  //     this.monthlyToxicology(this.toxicologyValueCheck);

  //   }
  //   if (this.toxicologyValueCheck === 'silane') {
  //     this.toxicology_sealant = false;
  //     this.toxicology_silane = true;
  //     this.monthlyToxicology(this.toxicologyValueCheck);

  //   }
  // }


  documentStudyDetail(data) {
    this.toxicologyStudyDataPage = true;
    console.log(data);
    this.toxicologyStudyPage = data;
    console.log(this.toxicologyStudyPage);
    this.filename = this.toxicologyStudyPage.filename;
    this.Extract_Result = this.toxicologyStudyPage.extract_Field.study_Title;
    this.Extract_Result_one = this.toxicologyStudyPage.extract_Field.final_Report;
    this.pdfUrl = this.toxicologyStudyPage.file_Path;
    console.log(this.pdfUrl);
    // let SAS_token = '?sv=2019-02-02&ss=b&srt=sco&sp=rl&se=2020-05-29T20:19:29Z&st=2020-04-02T12:19:29Z&spr=https&sig=aodIg0rDPVsNEJY7d8AerhD79%2FfBO9LZGJdx2j9tsCM%3D';
    // let urlPDF = this.pdfUrl + SAS_token;
    console.log( this.pdfUrl);
    this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl);
    console.log(this.Url);
  }
  backToStudyPage() {
    this.toxicologyStudyDataPage = false;
  }




  documentSummaryDetail(data) {
    this.toxicologySummaryDataPage = true;
    console.log(data);
    this.toxicologySummaryPage = data;
    console.log(this.toxicologySummaryPage);
    this.filename = this.toxicologySummaryPage.filename;
    this.Extract_Result = this.toxicologySummaryPage.date_Of_Issue;
    this.pdfUrl = this.toxicologySummaryPage.file_Path;
    console.log(this.pdfUrl);
    // let SAS_token = '?sv=2019-02-02&ss=b&srt=sco&sp=rl&se=2020-05-29T20:19:29Z&st=2020-04-02T12:19:29Z&spr=https&sig=aodIg0rDPVsNEJY7d8AerhD79%2FfBO9LZGJdx2j9tsCM%3D';
    // let urlPDF = this.pdfUrl + SAS_token;
    console.log( this.pdfUrl);
    this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl);
    console.log(this.Url);
  }
  backToSummaryPage() {
    this.toxicologySummaryDataPage = false;
  }

//Toxicology Tab change Functionality
  onChangeToxicology(item) {
    this.toxicologyTab = item;
    if (this.toxicologyTab === 'Study Title and Date') {
      this.studyCheck = true;
      this.monthlyCheck = false;
      this.summaryCheck = false;
      this.dataCheck = false;
      this.toxicologyStudyDataPage = false;
      this.studyToxicology();
      // tslint:disable-next-line: align
    } if (this.toxicologyTab === 'Monthly Toxicology Study List') {
      this.studyCheck = false;
      this.monthlyCheck = true;
      this.summaryCheck = false;
      this.dataCheck = false;
      // this.selectedMonthlyToxicologyType = "sealant";
      // this.toxicologyProcess('sealant');
      this.toxicologyMonthlyStudy()
    }
    if (this.toxicologyTab === 'Toxicology Summary') {
      this.studyCheck = false;
      this.monthlyCheck = false;
      this.summaryCheck = true;
      this.dataCheck = false;
      this.toxicologySummaryDataPage = false;
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
