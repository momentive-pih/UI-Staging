import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
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
import { MomentiveService } from '../service/momentive.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductAttributesComponent } from '../product-attributes/product-attributes.component';
import { timingSafeEqual } from 'crypto';
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
  products_Empty = false;
  value: string;
  type: string;
  items: string[];
  selectedIndex: number;
  selectedId: any;
  selectedboxId: any;
  productTitle: any;
  modalValue: string;
  firstModal = false;
  secondModal = false;
  thirdModal = false;
  fourthModal = false;
  fifthModal = false;
  sixthModal = false;
  seventhModal = false;
  eightModal = false;
  cols: any[];
  basicProperties:any =[];
  sidebarData: any;
  sidebarCategoriesData: any = [];
  sidebarCategoriesHomeData:any=[];
  selectedSpecList:any = [];
  basicDetails = true;
  HomeDataDetails: any = [];
  intialDataDetails: any;
  modalAPICall: any = [];
  @Input() radioItem: any;
  radiovalue: any;
  sidebarTopIcon = false;
  Pihloader = true;
  selectedValue: string;
  openId: any;
  productdata: any = [];
  intialSelctedData:any =[];
  UserSelectedProducts: any;
  highlightedDiv: number;
  buttonName ='Hide Categories';
  globalSearchData:any=[];
  EmptyProductLevel:boolean=false;
  objectKeys = Object.keys;
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router,
    private momentiveService: MomentiveService) {

    this.momentiveService.homeEvent.subscribe(data => {
      this.ngOnInit();
    });
  }

  ngOnInit() {


    this.momentiveService.currentMessage.subscribe(message => {
      console.log(message);
      this.EmptyProductLevel = message;
    })
 
  
    // Home Page API CALL
    this.intialSelctedData = localStorage.getItem('SearchBarData');
    console.log(this.intialSelctedData);
    this.globalSearchData = JSON.parse(this.intialSelctedData);
    console.log('**userData**')
    console.log(this.globalSearchData);
    
    this.basicProperties = this.momentiveService.basicLevelList;
    console.log(this.basicProperties);
    if(this.basicProperties.length > 0) {
      this.UserSelectedProducts = [];
      this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
      this.UserSelectedProducts =[{
        'Spec_id': this.selectedSpecList,
        'product_Level':this.momentiveService.getProductLevelDetails(),
        'Mat_Level':this.momentiveService.getMaterialLevelDetails(),
        'CAS_Level':this.momentiveService.getCasLevelDetails(),
      }]
    } else {
      this.UserSelectedProducts = [];
      this.UserSelectedProducts = this.momentiveService.selectedProduct;
    }
    console.log(this.UserSelectedProducts);
    this.intialDataDetails =[];
    this.momentiveService.getHomePageData(this.UserSelectedProducts).subscribe(data => {
      if (Object.keys(data).length > 0) {
        this.Pihloader = false;
        this.intialDataDetails = data;
        console.log(this.intialDataDetails);
        // const size = Object.keys(this.intialDataDetails).length;
      } else {
        this.Pihloader = true;
      }
    }, err => {
      console.error(err);
    });

    // sidebarCategories Details MOmentive-JSON API CALL
    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.sidebarCategoriesHomeData = this.productdata.sidebarCategoriesHomeData
      console.log(this.sidebarCategoriesHomeData);
    }, err => {
      console.error(err);
    });

    // Modal BOX Categories Details MOmentive-JSON API CALL
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

  }
  public selectionItemForFilter(e) {
    const colsTempor = e.value;
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

  //Sub Category Click Function
  selectItem(index, data, radiodata): void {
    this.modalAPICall = [];
    this.selectedId = index;
    this.value = data;
    this.radiovalue = radiodata;
    this.productRadioBox(index, this.value, this.radiovalue);
  }

//Seven Categories Details Page Click Function:
  productRadioBox(index, value, Item) {
    this.selectedId = index;
    this.modalValue = value;
    this.radioItem = Item;
    this.momentiveService.CategoryEvent.next();
    this.modalAPICall.push({
      'index': this.selectedId,
      'Category': this.modalValue,
      'Subcategory': this.radioItem,
    });
    this.momentiveService.setCategoryData(this.modalAPICall);
    this.firstModal = false;
    this.secondModal = false;
    this.thirdModal = false;
    this.fourthModal = false;
    this.fifthModal = false;
    this.sixthModal = false;
    this.seventhModal = false;
    this.eightModal = false;
    if (this.modalValue === 'compositionModal') {
      this.productTitle = 'Product Attributes';
      this.firstModal = true;
      this.momentiveService.notifyObservable$.subscribe(value => console.log(value));
      setTimeout(() => {
        this.momentiveService.callMethodOfSecondComponent(this.radioItem);
      }, 0);
    } else if (this.modalValue === 'complianceModal') {
      this.productTitle = 'Product Compliance';
      this.secondModal = true;
      this.momentiveService.notifyObservable$.subscribe(value => console.log(value));
      setTimeout(() => {
        this.momentiveService.callMethodOfSecondComponent(this.radioItem);
      }, 0);
    } else if (this.modalValue === 'communicationModal') {
      this.productTitle = 'Customer Communication';
      this.thirdModal = true;
      this.momentiveService.notifyObservable$.subscribe(value => console.log(value));
      setTimeout(() => {
        this.momentiveService.callMethodOfSecondComponent(this.radioItem);
      }, 0);
    } else if (this.modalValue === 'restrictedSubstanceModal') {
      this.productTitle = 'Restricted Substance';
      this.fourthModal = true;
      this.momentiveService.notifyObservable$.subscribe(value => console.log(value));
      setTimeout(() => {
        this.momentiveService.callMethodOfSecondComponent(this.radioItem);
      }, 0);
    } else if (this.modalValue === 'toxicologyModal') {
      this.productTitle = 'Toxicology';
      this.fifthModal = true;
      this.momentiveService.notifyObservable$.subscribe(value => console.log(value));
      setTimeout(() => {
        this.momentiveService.callMethodOfSecondComponent(this.radioItem);
      }, 0);
    } else if (this.modalValue === 'salesModal') {
      this.productTitle = 'Sales Information';
      this.sixthModal = true;
      this.momentiveService.notifyObservable$.subscribe(value => console.log(value));
      setTimeout(() => {
        this.momentiveService.callMethodOfSecondComponent(this.radioItem);
      }, 0);
    }
    if (this.modalValue === 'reportModal') {
      this.productTitle = 'Report Data';
      this.seventhModal = true;
    }
    if (this.modalValue === 'serviceReportModal') {
      this.productTitle = 'Self Service Report';
      this.eightModal = true;
    }
  }

  //Modal Box Top select Option CSS
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

  // Categories Detail Page Function Call
  MouseModalBox(id: any, data: any) {
    const index = id;
    const Item = null;
    const extractData = data;
    const modalOpenData = extractData.value;
    modalOpenData.forEach(obj => {
      if (obj.tab_modal) {
        const ModalBoxId = obj.tab_modal;
        setTimeout(function () {
          this.openId = '#' + ModalBoxId;
          console.log(this.openId);
          $(this.openId).modal('show');
        }, 100);
        if (index === 0) {
          const Item = 'Basic Information'
          this.selectItem(index, ModalBoxId, Item);
        }
        if (index === 1) {
          const Item = 'Notification Status'
          this.selectItem(index, ModalBoxId, Item);
        }
        if (index === 2) {
          const Item = 'US FDA Letter'
          this.selectItem(index, ModalBoxId, Item);
        }
        if (index === 3) {
          const Item = 'Study Title and Date'
          this.selectItem(index, ModalBoxId, Item);
        }
        if (index === 4) {
          const Item = 'GADSL'
          this.selectItem(index, ModalBoxId, Item);
        }
        if (index === 5) {
          const Item = 'Sales Volume'
          this.selectItem(index, ModalBoxId, Item);
        }
        if (index === 6) {
          const Item = 'Released Documents'
          this.selectItem(index, ModalBoxId, Item);
        }
      }
    });
  }


  toggleHighlight(newValue: number) {
    if (this.highlightedDiv === newValue) {
      this.highlightedDiv = 0;
      this.buttonName ='Hide Categories'
      this.momentiveService.callMethodOfRadioComponent(true);
    }
    else {
      this.highlightedDiv = newValue;
      this.buttonName ='Show Categories'
      this.momentiveService.callMethodOfRadioComponent(false);
    }
  }


}
