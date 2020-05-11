import { Component, OnInit } from '@angular/core';
import { MomentiveService } from './../service/momentive.service';

@Component({
  selector: 'app-other-tables',
  templateUrl: './other-tables.component.html',
  styleUrls: ['./other-tables.component.css']
})
export class OtherTablesComponent implements OnInit {

  otherTableCheck: any = [];
  SAPTableCheck = 'Phrase Translation'
  productData: any = []
  PhraseCheck: boolean = true;
  allergenCheck: boolean = false;
  bioCompatibilityCheck: boolean = false;
  bseTseGmoCheck: boolean = false;
  epaCheck: boolean = false;
  registrationCompanyCheck: boolean = false;
  productregulatoryCheck: boolean = false;
  pharseHead:any= [];
  pharseData:any=[];
 allergenHead:any=[];
 allergenData:any=[];
 bioCompatibilityHead:any=[];
 bioCompatibilityData:any=[];
 bseTseHead:any=[];
 bseTseData:any=[];
 epaHead:any=[];
 epaData:any=[];
 registrationCompanyHead:any=[];
 registrationCompanyData:any=[];
 productRegulatoryHead:any=[]
 productRegulatoryData:any=[]
 sapOthersDataLoader:boolean =true;

 selectedSpecList:any=[];
 othersDataDetails:any =[]
 productdata:any=[];
 pihAlertMessage:any;
 CategoryDetails:any
  constructor(private momentiveService: MomentiveService) { }

  ngOnInit() {

    this.othersPhrase()
    // OtherTable Radio Box API Call
    this.momentiveService.getSearchData().subscribe(data => {
      this.productData = data;
      console.log(this.productData);
      this.otherTableCheck = this.productData.otherSAPTableCheck;
      console.log(this.otherTableCheck);
    }, err => {
      console.error(err);
    });

  
    this.pharseHead = [
      { "field": "phrase_Key", "header": "Pharse Key" },
      {"field":"phrase_Text","header":"Pharse Text"},
      { "field": "phrase_Code", "header": "Pharse Code" },
      { "field": "phrase_Graph", "header": "Pharse Graph" },
    
     
    ],
    this.allergenHead = [
      { "field": "spec_Id", "header": "Specification Id-Nam Prod" },
      {"field":"usage","header":"Usage"},
      { "field": "alerg", "header": "Allergen Regulation" },
      { "field": "alest", "header": "Allergen Status" }
     
    ],

    this.bioCompatibilityHead = [
      { "field": "spec_Id", "header": "Specification Id-Nam Prod" },
      {"field":"usage","header":"Usage"},
      { "field": "bstat", "header": "Biocompatibility Status" },
      { "field": "btest", "header": "Biocompatibility Test" }
    
    ],
    this.bseTseHead = [
      { "field": "spec_Id", "header": "Specification Id-Nam Prod" },
      {"field":"usage","header":"Usage"},
      { "field": "bstsg", "header": "BSE/TSE/GMO" },
      { "field": "btgst", "header": "BSE/TSE/GMO Status" }
      
    ],
    this.epaHead = [
      { "field": "spec_Id", "header": "Specification Id-Nam Prod" },
      {"field":"usage","header":"Usage"},
      { "field": "eparg", "header": "EPA Regulation" },
      { "field": "epast", "header": "EPA Status" }
    
    ]


this.registrationCompanyHead  = [
  { "field": "spec_Id", "header": "Specification Id-Nam Prod" },
  {"field":"usage","header":"Usage"},
  { "field": "bukrs", "header": "Company Code" },
  { "field": "regns", "header": "Registration Number Supplier" },
  { "field": "regqy", "header": "Registered Quantity" },
  {"field":"werks","header":"Plant"}
 
]
    this.productRegulatoryHead = [
      { "field": "spec_Id", "header": "Specification Id-Nam Prod" },
      {"field":"usage","header":"Usage"},
      { "field": "prirg", "header": "PRI Regulation" },
      { "field": "cstat", "header": "Compliance Status" }
     
    
    ]

  }
  
  onChangeOtherTable(data) {
    if (data == "Phrase Translation") {
      this.PhraseCheck = true;
      this.allergenCheck = false;
      this.bioCompatibilityCheck = false;
      this.bseTseGmoCheck = false;
      this.epaCheck = false;
      this.registrationCompanyCheck = false;
      this.productregulatoryCheck = false;
      this.othersPhrase()
    } else if (data == "Allergens") {
      this.PhraseCheck = false;
      this.allergenCheck = true;
      this.bioCompatibilityCheck = false;
      this.bseTseGmoCheck = false;
      this.epaCheck = false;
      this.registrationCompanyCheck = false;
      this.productregulatoryCheck = false;
      this.othersAllergen()
    } else if (data == "Biocompatibility Testing PRI") {
      this.PhraseCheck = false;
      this.allergenCheck = false;
      this.bioCompatibilityCheck = true;
      this.bseTseGmoCheck = false;
      this.epaCheck = false;
      this.registrationCompanyCheck = false;
      this.productregulatoryCheck = false;
      this.othersBioCompatibility()
    } else if (data == "BSE/TSE & GMO") {
      this.PhraseCheck = false;
      this.allergenCheck = false;
      this.bioCompatibilityCheck = false;
      this.bseTseGmoCheck = true;
      this.epaCheck = false;
      this.registrationCompanyCheck = false;
      this.productregulatoryCheck = false;
     this.othersBSETSE()
    } else if (data == "Environmental Protection Agency (EPA)") {
      this.PhraseCheck = false;
      this.allergenCheck = false;
      this.bioCompatibilityCheck = false;
      this.bseTseGmoCheck = false;
      this.epaCheck = true;
      this.registrationCompanyCheck = false;
      this.productregulatoryCheck = false;
      this.othersEpa()
    } else if (data == "Registration-Company Specific") {
      this.PhraseCheck = false;
      this.allergenCheck = false;
      this.bioCompatibilityCheck = false;
      this.bseTseGmoCheck = false;
      this.epaCheck = false;
      this.registrationCompanyCheck = true;
      this.productregulatoryCheck = false;
       this.otherRegistrationCompany()
    } else if (data == "Product Regulatory Information") {
      this.PhraseCheck = false;
      this.allergenCheck = false;
      this.bioCompatibilityCheck = false;
      this.bseTseGmoCheck = false;
      this.epaCheck = false;
      this.registrationCompanyCheck = false;
      this.productregulatoryCheck = true;
      this.otherProductRegulatory()
    }

  }

  othersPhrase() {
    this.sapOthersDataLoader = true;
    this.othersDataDetails = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = { index: 2, Category: "othersModal", Subcategory: "phrase_translation" }
    console.log(this.CategoryDetails);
    this.othersDataDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails
    });
    console.log(this.othersDataDetails)
    this.momentiveService.addAdditionalDeatils(this.othersDataDetails).subscribe(data => {
      console.log(data);
      this.productdata = data;
      if (this.productdata.length > 0) {
        this.sapOthersDataLoader = false;
        this.pihAlertMessage = false;
        this.pharseData = this.productdata;
      }
      else {
        this.pihAlertMessage = true;
        this.sapOthersDataLoader = false;
      }

    }, err => {
      console.error(err);
    });
  }

  othersAllergen() {
    this.sapOthersDataLoader = true;
    this.othersDataDetails = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = { index: 2, Category: "othersModal", Subcategory: "allergen" }
    console.log(this.CategoryDetails);
    this.othersDataDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails
    });
    console.log(this.othersDataDetails)
    this.momentiveService.addAdditionalDeatils(this.othersDataDetails).subscribe(data => {
      console.log(data);
      this.productdata = data;
      if (this.productdata.length > 0) {
        this.sapOthersDataLoader = false;
        this.pihAlertMessage = false;
        this.allergenData = this.productdata;
      }
      else {
        this.pihAlertMessage = true;
        this.sapOthersDataLoader = false;
      }

    }, err => {
      console.error(err);
    });
  }
  othersBioCompatibility() {
    this.sapOthersDataLoader = true;
    this.othersDataDetails = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = { index: 2, Category: "othersModal", Subcategory: "bio_Compatibility_Testing_PRI" }
    console.log(this.CategoryDetails);
    this.othersDataDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails
    });
    console.log(this.othersDataDetails)
    this.momentiveService.addAdditionalDeatils(this.othersDataDetails).subscribe(data => {
      console.log(data);
      this.productdata = data;
      if (this.productdata.length > 0) {
        this.sapOthersDataLoader = false;
        this.pihAlertMessage = false;
        this.bioCompatibilityData = this.productdata;
      }
      else {
        this.pihAlertMessage = true;
        this.sapOthersDataLoader = false;
      }

    }, err => {
      console.error(err);
    });
  }
  othersBSETSE() {
    this.sapOthersDataLoader = true;
    this.othersDataDetails = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = { index: 2, Category: "othersModal", Subcategory: "BSE_TSE_GMO" }
    console.log(this.CategoryDetails);
    this.othersDataDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails
    });
    console.log(this.othersDataDetails)
    this.momentiveService.addAdditionalDeatils(this.othersDataDetails).subscribe(data => {
      console.log(data);
      this.productdata = data;
      if (this.productdata.length > 0) {
        this.sapOthersDataLoader = false;
        this.pihAlertMessage = false;
        this.bseTseData = this.productdata;
      }
      else {
        this.pihAlertMessage = true;
        this.sapOthersDataLoader = false;
      }

    }, err => {
      console.error(err);
    });
  }
  othersEpa() {
    this.sapOthersDataLoader = true;
    this.othersDataDetails = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = { index: 2, Category: "othersModal", Subcategory: "EPA" }
    console.log(this.CategoryDetails);
    this.othersDataDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails
    });
    console.log(this.othersDataDetails)
    this.momentiveService.addAdditionalDeatils(this.othersDataDetails).subscribe(data => {
      console.log(data);
      this.productdata = data;
      if (this.productdata.length > 0) {
        this.sapOthersDataLoader = false;
        this.pihAlertMessage = false;
        this.epaData = this.productdata
      }
      else {
        this.pihAlertMessage = true;
        this.sapOthersDataLoader = false;
      }

    }, err => {
      console.error(err);
    });
  }
  otherRegistrationCompany() {
    this.sapOthersDataLoader = true;
    this.othersDataDetails = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = { index: 2, Category: "othersModal", Subcategory: "registrations_Company_Specific" }
    console.log(this.CategoryDetails);
    this.othersDataDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails,
      'CAS_Level':this.momentiveService.getCasLevelDetails(),
    });
    console.log(this.othersDataDetails)
    this.momentiveService.addAdditionalDeatils(this.othersDataDetails).subscribe(data => {
      console.log(data);
      this.productdata = data;
      if (this.productdata.length > 0) {
        this.sapOthersDataLoader = false;
        this.pihAlertMessage = false;
        this.registrationCompanyData = this.productdata;
      }
      else {
        this.pihAlertMessage = true;
        this.sapOthersDataLoader = false;
      }

    }, err => {
      console.error(err);
    });
  }
  otherProductRegulatory() {
    this.sapOthersDataLoader = true;
    this.othersDataDetails = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = { index: 2, Category: "othersModal", Subcategory: "product_Regulatory_Information" }
    console.log(this.CategoryDetails);
    this.othersDataDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails
    });
    console.log(this.othersDataDetails)
    this.momentiveService.addAdditionalDeatils(this.othersDataDetails).subscribe(data => {
      console.log(data);
      this.productdata = data;
      if (this.productdata.length > 0) {
        this.sapOthersDataLoader = false;
        this.pihAlertMessage = false;
        this.productRegulatoryData = this.productdata;
      }
      else {
        this.pihAlertMessage = true;
        this.sapOthersDataLoader = false;
      }

    }, err => {
      console.error(err);
    });
  }
 //sorting Functionality
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

}