import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Attribute } from '@angular/compiler';
import { MatTableDataSource} from '@angular/material';
import {TableModule} from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {HomeService} from '../service/home-service.service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption} from '@ng-select/ng-select';
import { MomentiveService} from '../service/momentive.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductAttributesComponent } from '../product-attributes/product-attributes.component';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {

  dateForm: FormGroup;
  name = '';
  selectednav: 'active';
  product_Name: any = [];
  product_type: any = [];
  products_Empty  = false;
  value: string;
  type: string;
  items: string[];
  selectedIndex: number;
  selectedId: any;
  selectedboxId: any;
  productTitle: any;
  modalValue: string;
  firstModal  = false;
  secondModal = false;
  thirdModal = false;
  fourthModal = false;
  fifthModal = false;
  sixthModal = false;
  seventhModal = false;
  eightModal = false;
  cols: any[];
  sidebarData: any;
  sidebarCategoriesData: any = [];
  basicDetails = true;
  intialData_Details: any = [];
  HomeDataDetails: any = [];
  intialDataDetails: any;
  modalAPICall:any = [];
  @Input()radioItem: any;
  radiovalue: any;
  sidebarTopIcon = false;
  Pihloader = true;
  openId: any;
  productdata: any = [];
  UserSelectedProducts:any;
  objectKeys = Object.keys;
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private router: Router, private homeService: HomeService,
              private momentiveService: MomentiveService,
              ) {
          
                this.momentiveService.homeEvent.subscribe(data => {
                  this.ngOnInit();
                });
 
  }

  ngOnInit() {

    // this.route.queryParams.subscribe(params => {
    //   this.UserSelectedProducts = params["selected_specs"];
    //   console.log(this.UserSelectedProducts);
    // });
    // this.UserSelectedProducts =JSON.parse(localStorage.getItem('SearchBarData'));
    // console.log(this.UserSelectedProducts);

     // intialHOmeDataDetails

      this.UserSelectedProducts = this.momentiveService.selectedProduct;
      console.log(this.UserSelectedProducts);

      this.momentiveService.getHomePageData(this.UserSelectedProducts).subscribe(data => {
        if(Object.keys(data).length > 0) {
          this.Pihloader = false;
          this.intialDataDetails = data;
          console.log(this.intialDataDetails);
          // const size = Object.keys(this.intialDataDetails).length;
        } else{
             this.Pihloader = true;
        }
       
      }, err => {
        console.error(err);
      });

  
  // intialData_Details
    this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.intialData_Details = this.productdata.intialData_Details;
    console.log(this.intialData_Details);
  }, err => {
    console.error(err);
  });
   // sidebarCategoriesDat
    this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.sidebarCategoriesData = this.productdata.sidebarCategoriesData
    console.log(this.sidebarCategoriesData);
  }, err => {
    console.error(err);
  });

    // sidebarData
    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.sidebarData = this.productdata.sidebarData;
      console.log(this.sidebarData);
      if (this.sidebarData.length > 16) {
        this.sidebarTopIcon = true;
      }
    }, err => {
      console.error(err);
    });
    // sidebarCategoriesDat

    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.sidebarCategoriesData = this.productdata.sidebarCategoriesData;
      console.log(this.sidebarCategoriesData);
    }, err => {
      console.error(err);
    });

// // HomeDataDetails
//     this.momentiveService.getSearchData().subscribe(data => {
//   this.productdata = data;
//   this.HomeDataDetails = this.productdata.HomeDataDetails;
//   console.log(this.HomeDataDetails);
// }, err => {
//   console.error(err);
// });

}
  public selectionItemForFilter(e) {
    const colsTempor = e.value;
    // tslint:disable-next-line: only-arrow-functions
    colsTempor.sort(function (a, b) {
      return a.index - b.index;
    });
    this.cols = [];
    this.cols = colsTempor;
    if (e.value.length > 10) {
      e.value.pop();
    }
  }
  selectEvent(item) {
    console.log(item);
  }

  selectItem(index, data, radiodata): void {
  this.modalAPICall =[];
  console.log(data);
  console.log(index);
  console.log(radiodata);
  this.selectedId = index;
  console.log(this.selectedId);
  this.value = data;
  this.radiovalue = radiodata;
   this.productRadioBox(index, this.value, this.radiovalue);
}

  productRadioBox(index, value, Item) {
    console.log(index);
    console.log(value);
    console.log(Item);
    this.selectedId = index;
    this.modalValue = value;
    this.radioItem = Item;
    this.momentiveService.CategoryEvent.next();
    console.log(this.selectedId);
    console.log(this.modalValue);
    console.log(this.radioItem);
    this.modalAPICall.push({
      'index': this.selectedId,
      'Category': this.modalValue,
      'Subcategory': this.radioItem,
    });
    console.log(this.modalAPICall);
    this.momentiveService.setCategoryData(this.modalAPICall);
    this.firstModal = false;
    this.secondModal = false;
    this.thirdModal = false;
    this.fourthModal = false;
    this.fifthModal = false;
    this.sixthModal = false;
    this.seventhModal = false;
    this.eightModal = false;
    if ( this.modalValue === 'compositionModal') {
    this.productTitle = 'Product Attributes';
    this.firstModal = true;
    // this.onChangeProductAttribute(this.radioItem);
    this.momentiveService.notifyObservable$.subscribe(value => console.log(value));
    setTimeout(() => {
      this.momentiveService.callMethodOfSecondComponent(this.radioItem);
    }, 0);
  } else if ( this.modalValue === 'complianceModal') {
    this.productTitle = 'Product Complaince';
    this.secondModal = true;
    // this.onChangeProductCompliance(this.radioItem);
    
    this.momentiveService.notifyObservable$.subscribe(value => console.log(value));
    setTimeout(() => {
      this.momentiveService.callMethodOfSecondComponent(this.radioItem);
    }, 0);
  } else if ( this.modalValue === 'communicationModal') {
    this.productTitle = 'Customer Communication';
    this.thirdModal = true;
    // this.onChangeCommunication(this.radioItem);
    
    this.momentiveService.notifyObservable$.subscribe(value => console.log(value));
    setTimeout(() => {
      this.momentiveService.callMethodOfSecondComponent(this.radioItem);
    }, 0);
  } else if ( this.modalValue === 'restrictedSubstanceModal') {
    this.productTitle = 'Restricted Substance';
    this.fourthModal = true;
    // this.onChangeRestricted(this.radioItem);
    this.momentiveService.notifyObservable$.subscribe(value => console.log(value));
    setTimeout(() => {
      this.momentiveService.callMethodOfSecondComponent(this.radioItem);
    }, 0);
  } else if ( this.modalValue === 'toxicologyModal') {
    this.productTitle = 'Toxicology';
    this.fifthModal = true;
    // this.onChangeToxicology(this.radioItem);
    this.momentiveService.notifyObservable$.subscribe(value => console.log(value));
    setTimeout(() => {
      this.momentiveService.callMethodOfSecondComponent(this.radioItem);
    }, 0);
  } else if ( this.modalValue === 'salesModal') {
    this.productTitle = 'Sales Information';
    this.sixthModal = true;
    // this.onChangeSales(this.radioItem);
    this.momentiveService.notifyObservable$.subscribe(value => console.log(value));
    setTimeout(() => {
      this.momentiveService.callMethodOfSecondComponent(this.radioItem);
    }, 0);
  }
    if ( this.modalValue === 'reportModal') {
    this.productTitle = 'Report Data';
    this.seventhModal = true;
  }
    if ( this.modalValue === 'serviceReportModal') {
    this.productTitle = 'Self Service Report';
    this.eightModal = true;
  }
  }

  setMyStyles() {
    const styles = {
      position: this.product_type.length > 16 ? 'absolute' : 'none',
    };
    return styles;
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

intialSort() {
  return 0;
}
fireEvent(event) {
if (event === 'productDetails') {
  $('#basicDetails').modal('show');
}
}


MouseModalBox(id: any, data: any) {
  const index = id;
  console.log(id);
  const Item = null;
  const extractData = data;
  console.log(data);
  const modalOpenData = extractData.value;
  modalOpenData.forEach(obj => {
    if (obj.tab_modal) {
      const ModalBoxId = obj.tab_modal;
      setTimeout(function() {
          this.openId = '#' + ModalBoxId;
          console.log(this.openId);
          $(this.openId).modal('show');
       }, 100);
       if (index === 0){
        const Item = 'Basic Information'
        this.selectItem(index, ModalBoxId, Item);
       }
       if (index === 1){
        const Item = 'Notification Status'
        this.selectItem(index, ModalBoxId, Item);
       }
       if (index === 2){
        const Item = 'US FDA Letter'
        this.selectItem(index, ModalBoxId, Item);
       }
       if (index === 3){
        const Item = 'Study Title and Date'
        this.selectItem(index, ModalBoxId, Item);
       }
       if (index === 4){
        const Item = 'GADSL'
        this.selectItem(index, ModalBoxId, Item);
       }
       if (index === 5){
        const Item = 'Sales Volume'
        this.selectItem(index, ModalBoxId, Item);
       }
       if (index === 6){
        const Item = 'Released Documents'
        this.selectItem(index, ModalBoxId, Item);
       }
    }});
}



}
