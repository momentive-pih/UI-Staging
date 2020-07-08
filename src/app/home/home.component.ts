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
import { CategoriesPipe } from '../pipes/categories.pipe'
import { element } from 'protractor';
declare var $: any;

export interface Item {
  id: string,
  name: string
}

export interface DownLineItem {
  item: Item,
  parent: DownLineItem
}

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
  basicProperties: any = [];
  sidebarData: any;
  sidebarCategoriesData: any = [];
  sidebarCategoriesHomeData: any = [];
  selectedSpecList: any = [];
  basicDetails = true;
  HomeDataDetails: any = [];
  intialDataDetails: any;
  categoriesIntialData: any;
  modalAPICall: any = [];
  @Input() radioItem: any;
  radiovalue: any;
  sidebarTopIcon = false;
  Pihloader = true;
  selectedValue: string;
  openId: any;
  productdata: any = [];
  cateogryType: any = [];
  intialSelctedData: any = [];
  UserSelectedProducts: any;
  highlightedDiv: number;
  buttonName = 'Hide Categories';
  selectedType: string = "All";
  globalSearchData: any = [];
  valSelect: any = [];
  sidebarNewCategoriesHomeData: any = []
  HeaderNewCategoriesHomeData: any = [];
  NewHomeData: any = [];
  EmptyProductLevel: boolean = false;
  objectKeys = Object.keys;
  searchCategories: any;
  filterCategoryItem: any;
  filterHomeData: any = [];
  subscriptionData:any;

  categoryitems = [];
  categoryBaseddata = [];
  public AllowParentSelection = true;
  public RestructureWhenChildSameName = false;
  public ShowFilter = true;
  public Disabled = false;
  public FilterPlaceholder = 'Type here to filter elements...';
  public MaxDisplayed = 5;

  public simpleSelected = {
    id: 'all',
    name: 'all',
  }

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router,
    private momentiveService: MomentiveService) {

    // this.subscriptionData = this.momentiveService.homeEvent.subscribe(data => {
    //   this.ngOnInit();
    // });
  }

  ngOnInit() {

    this.momentiveService.currentMessage.subscribe(message => {
      console.log(message);
      this.EmptyProductLevel = message;
    })


    // sidebarCategories Details MOmentive-JSON API CALL
    //  this.filterCategoryItem = JSON.parse(localStorage.getItem('categorySetData'));
    //  console.log(this.filterCategoryItem);
    //  this.HeaderNewCategoriesHomeData = JSON.parse(JSON.stringify(this.filterCategoryItem ))

    this.subscriptionData = this.momentiveService.categoryDetailsData.subscribe(res => {
      console.log(res);
      this.HeaderNewCategoriesHomeData = res;
      this.HeaderNewCategoriesHomeData.forEach(element => {
        if (element.name === 'All') {
          this.homeAPICall();
        } else {
          this.homecategoryFilter();
        }
      })

    })

 

      // Home Page API CALL
    this.intialSelctedData = localStorage.getItem('SearchBarData');
    console.log(this.intialSelctedData);
    this.globalSearchData = JSON.parse(this.intialSelctedData);
    console.log('**userData**')
    console.log(this.globalSearchData);


    // sidebarCategories Details MOmentive-JSON API CALL
    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.sidebarNewCategoriesHomeData = this.productdata.sidebarCategoriesHomeData;
      this.sidebarCategoriesHomeData = JSON.parse(JSON.stringify(this.sidebarNewCategoriesHomeData));
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

  homeAPICall() {
    this.basicProperties =[];
    this.basicProperties = this.momentiveService.getbasicLevelDetails();
    console.log(this.basicProperties);
    if (this.basicProperties.length > 0) {
      this.UserSelectedProducts = [];
      this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
      this.UserSelectedProducts = [{
        'Spec_id': this.selectedSpecList,
        'product_Level': this.momentiveService.getProductLevelDetails(),
        'Mat_Level': this.momentiveService.getMaterialLevelDetails(),
        'CAS_Level': this.momentiveService.getCasLevelDetails(),
      }]
    } else {
      this.UserSelectedProducts = [];
      this.UserSelectedProducts = this.momentiveService.selectedProduct;
    }
    console.log(this.UserSelectedProducts);
    this.intialDataDetails = [];
    this.categoriesIntialData =[];
    this.momentiveService.getHomePageData(this.UserSelectedProducts).subscribe(data => {
      if (Object.keys(data).length > 0) {
        this.Pihloader = false;
        this.intialDataDetails = data;
        this.categoriesIntialData = JSON.parse(JSON.stringify(data));
        console.log("**********************************88")
        console.log(this.categoriesIntialData);
        // const size = Object.keys(this.intialDataDetails).length;
      } else {
        this.Pihloader = true;
      }
    }, err => {
      console.error(err);
    });

  }
  selectEvent(item) {
    console.log(item);
  }
  selectCategoryType(data) {
    console.log(data);
    this.NewHomeData = [];
    this.sidebarNewCategoriesHomeData = [];
    this.sidebarCategoriesHomeData.forEach(element => {
      element.searchField.forEach(ele => {
        if (ele == data) {
          this.sidebarNewCategoriesHomeData.push(element);
          console.log(this.sidebarNewCategoriesHomeData);
        }
      })
    });

    //Right side filter code
    // this.sidebarNewCategoriesHomeData.forEach(element => {
    //   this.NewHomeData.push(element.name);
    //  });
    //  console.log(this.NewHomeData);
    //  console.log(this.categoriesIntialData);
    //  const filtered = Object.keys(this.categoriesIntialData)
    // .filter(key => this.NewHomeData.includes(key))
    // .reduce((obj, key) => {
    //   obj[key] = this.categoriesIntialData[key];
    //   return obj;
    // }, {});
    //     this.intialDataDetails = filtered;
    //     console.log(this.intialDataDetails);
  }

  //(keyup)="onSearchChange($event.target.value)"
  // onSearchChange(searchValue: string): void {  
  //   console.log(searchValue);
  //   if(searchValue.length > 2) {

  //   }
  // }
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
      this.buttonName = 'Hide Categories'
      this.momentiveService.callMethodOfRadioComponent(true);
    }
    else {
      this.highlightedDiv = newValue;
      this.buttonName = 'Show Categories'
      this.momentiveService.callMethodOfRadioComponent(false);
    }
  }

  homecategoryFilter() {
    this.basicProperties =[];
    this.basicProperties = this.momentiveService.basicLevelList;
    console.log(this.basicProperties);
    if (this.basicProperties.length > 0) {
      this.UserSelectedProducts = [];
      this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
      this.UserSelectedProducts = [{
        'Spec_id': this.selectedSpecList,
        'product_Level': this.momentiveService.getProductLevelDetails(),
        'Mat_Level': this.momentiveService.getMaterialLevelDetails(),
        'CAS_Level': this.momentiveService.getCasLevelDetails(),
      }]
    } else {
      this.UserSelectedProducts = [];
      this.UserSelectedProducts = this.momentiveService.selectedProduct;
    }
    console.log(this.UserSelectedProducts);
    this.intialDataDetails = [];
    this.categoriesIntialData =[];
    this.momentiveService.getHomePageData(this.UserSelectedProducts).subscribe(data => {
      if (Object.keys(data).length > 0) {
        this.Pihloader = false;
        this.categoriesIntialData = data;
        this.NewHomeData = [];
        //Right side filter code
        this.HeaderNewCategoriesHomeData.forEach(element => {
          element.searchField.forEach(elem => {
            this.NewHomeData.push(elem);
          })
        });
        console.log(this.NewHomeData);
        console.log(this.categoriesIntialData);
        const filtered = Object.keys(this.categoriesIntialData)
          .filter(key => this.NewHomeData.includes(key))
          .reduce((obj, key) => {
            obj[key] = this.categoriesIntialData[key];
            return obj;
          }, {});
        this.intialDataDetails = filtered;
        console.log(this.intialDataDetails);
      } else {
        this.Pihloader = true;
      }
    }, err => {
      console.error(err);
    });
  }
  ngOnDestroy() {
    this.subscriptionData.unsubscribe();
}
}
