import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Attribute, IfStmt } from '@angular/compiler';
import { MatTableDataSource } from '@angular/material';
import { TableModule } from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption, NgSelectComponent } from '@ng-select/ng-select';
import { MomentiveService } from '../service/momentive.service';
import { Router, ActivatedRoute, NavigationStart, NavigationExtras } from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect, MatOption } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PihFilterPipe } from '../pipes/pih-filter.pipe';
import { CasLevelFilterPipe } from '../pipes/cas-level-filter.pipe';
import { ProductLevelPipe } from '../pipes/product-level.pipe';

import * as xlsx from 'xlsx';
import { element } from 'protractor';
declare var $: any;
interface product {
  name: string;
}
interface SPECListData {
  id: string;
  name: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  sideSearchData: any;
  name = '';
  selectednav: 'active';
  secondaryNavBar = false;
  placeholder: string;
  keyword: string;
  historyHeading: string;
  product_Name: any = [];
  ProductDrop: any = [];
  reactiveForm: FormGroup;
  SpecreactiveForm: FormGroup
  product_type: any = [];
  copyproduct_type: any = [];
  compositionPart: any = [];
  value: string;
  type: string;
  cols: any[];
  SearchProducts: any;
  searchDataLength: any;
  searchProductList: any = [];
  selectedCategoryKey: any;
  sidebarselectedData: any = [];
  // Composition Data
  legalCompositionData: any[];
  legalCompositionHead: any[];
  selectedlegalCompositionProducts: any[];
  hunderedCompositionHead: any[];
  hunderedCompositionData: any[];
  copyhunderedCompositionData: any[];
  selectedhunderedCompositionProducts: any[];
  standardCompositionHead: any[];
  standardCompositionData: any[];
  copystandardCompositionData: any[];
  copylegalCompositionData: any[];
  selectedStandardCompositionProducts: any[];
  ExcelStandardData = [];
  ExcelStandardSubData = [];
  newStandardData = [];
  // Communication History
  CommunicationHistoryData: any[];
  CommunicationHistoryHead: any[];
  commuicationDataCheck: any;
  CopycommunicationHistoryData: any[];
  events: any;
  showDatefield = false;
  ExcelCommunicationHistoryData = [];
  product_NameData: any[];
  sidebarData: any;
  productLsr_Name: any = [];
  productSilsoft_Name: any = [];
  Searchname: any;
  productCAS_Number: any;
  basicDetails = true;
  submitDetails = false;
  productLevel: any = [];
  MaterialLevel: any = [];
  casLevel: any = [];
  LsrproductLevel: any = [];
  LsrMaterialLevel: any = [];
  LsrcomponentLevel: any = [];
  HomeDataDetails: any = [];
  basicBoxDetails = false;
  sidenavDetails: any;
  searchRelatedMessage = false;
  // New Data;
  productdata: any = [];
  categoriesType: any = [];
  url: any;
  currentURL: any;
  sidebarIcon = true;
  Isfirst = true;
  sidebarselectedKey: any;
  searchdropdownlist = false;
  selectedSearchText: any
  selectedSearchNew: any;
  suggestionDrop = false;
  nextLibAvailable = true;
  categoriesTypeCount: any;
  categoriesCount: any = [];
  typecount = {};
  categoryType: any;
  selectedproductType: any;
  selectedProducts = false;
  basicProperties: any = [];
  searchAlertMessage: any;
  relatedProducts = true;
  searchLoader = false;
  searchTextTerms: any;
  searchTextONTTerms: any = [];
  searchTerm: any;
  objectKeys = Object.keys;
  public items$: Observable<product[]>;
  public input$ = new Subject<string | null>();
  /**SPECID dropdown List */
  SPECdropdownList: any = [];
  selectedSPECItems: any = [];
  dropdownSettings = {};
  firstSpecData = [];
  SpecListsselectedSpecList: any = [];
  SpecLists: any = [];
  specDataListDetails: any;
  specDataSelectListDetails:any;
  sideSpecList: any;
  userSelectedSPECDetails: any = [];
  basicLevelExcelCompositionData:any=[];
  copybasicLevelCompositionData:any=[];
  basicPropertiesLoader: any;
  public loading;
  notifier: any;
  userSelectedProducts: any;
  userCASFilter: any = { cas_Number: '' };
  userMaterialFilter: any = { material_Number: '' };
  userProductFilter: any = { prodIdentifiers: '' };

  SpecSplitNewTerm: any;
  NewSpecList: any = [];
  NewCheckedSpecList: any = [];
  secondLevelSearch: any = [];
  basicProperitiesAPIDetails: any = [];
  limitedSPec: any = [];
  newLimitedData:any = []


  //Get Material and CAS Level Details:

  CASLevelAPIData: any = [];
  basicCASPropertiesDetails: any = [];
  CASRealSpecList: any = [];
  selectedAPISpecList: any = [];
  myCASArrayFilteredData: any = [];
  casAPILevel: any = [];
  tempMyCAS: any = [];

  MATAPILevel: any = [];
  myMATArrayFilteredData: any = [];
  MATLevelAPIData: any = [];
  basicMATPropertiesDetails: any = [];
  tempMyMAT: any = [];

  ProductLevelAPIData: any = [];
  ProductAPILevel: any = [];
  ProductFileterdData: any = [];
  basicProductPropertiesDetails: any = []

  searchProductText:any;
  searchMaterialText:any;
  searchCASText:any;
  loggedUserName:string;


  /** control for the selected SPEC_List for multi-selection */
  public specMultiCtrl: FormControl = new FormControl();
  /** control for the MatSelect filter keyword multi-selection */
  public specMultiFilterCtrl: FormControl = new FormControl();
  /** list of SPEC_Lists filtered by search keyword */
  public filteredSpecMulti: ReplaySubject<SPECListData[]> = new ReplaySubject<SPECListData[]>(1);

  @ViewChild('multiSelect', { static: false }) multiSelect: MatSelect;
  @ViewChild('allSelected', { static: false }) private allSelected: MatOption;
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  @ViewChild('code', { static: false }) private codeRef?: ElementRef<HTMLElement>;
  @ViewChild('code', { static: true }) myselect: ElementRef;
  @ViewChild('basicProduct', { static: false }) basicProduct: ElementRef;
  @ViewChild('basicMaterial', { static: false }) basicMaterial: ElementRef;
  @ViewChild('basicCas', { static: false }) basicCas: ElementRef;

  constructor(private fb: FormBuilder, public toastr: ToastrManager, vcr: ViewContainerRef, private route: ActivatedRoute, private router: Router, private momentiveService: MomentiveService) {
    this.momentiveService.homeEvent.subscribe(data => {
      this.ngOnInit()
    })
    // Search Bar Formgroup
    this.reactiveForm = fb.group({
      selectedSearchNew: ['', Validators.required],
    });

    // SPEC List Reactive Form 
    this.SpecreactiveForm = fb.group({
      selectedSPECItems: ['', Validators.required],
    })
    this.input$.subscribe(
      (term) => this.searchProduct(term, this.product_Name, this.Isfirst));
  }

  ngOnInit() {

    this.url = window.location.href.includes('home');
    console.log(this.url);
    this.basicPropertiesEvent(event);

  
    console.log("8888888888888")
    this.loggedUserName = localStorage.getItem('userName');
    console.log(this.loggedUserName);
    // product_type
    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.product_type = this.productdata.product_type;
    }, err => {
      console.error(err);
    });

    //Search Key Dropdown function 
    $(document).on('click', function (event) {
      if (!$(event.target).closest('.dropdown-select').length) {
        $('.option-list, .search-box').hide();
      }
    });
    $('.select').click(function (event) {
      $(this).closest('.dropdown-select').find('.option-list, .search-box').toggle();
    });
   
    


    //Main Search Bar Placeholder & Other Details
    this.placeholder = 'Enter the Details';
    this.keyword = 'name';
    this.historyHeading = 'Recently selected';
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      clearSearchFilter: false,
      allowSearchFilter: true
    };
  }

  //GroupBY function In Search Bar
  groupByFn = (item) => item.product;
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
  onChangeSearch(data) {
    if (data.length > 2) {
      console.log(data);
      this.product_NameData = this.product_Name.filter((ProductName) => (ProductName.includes(data)));
      console.log(this.product_NameData);
    }
  }
  onFocused(data) {
    this.onChangeSearch(data);
  }

  //Multiselect Dropdown Related Functions
  selectEvent(item) {
    console.log(item);
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

  //Main Search Field Functinoality
  private searchProduct(term: string | null, arr, Isfirst) {
    this.suggestionDrop = true;
    this.searchTerm = term ? term : '';
    this.SearchProducts = {
      'SearchData': this.searchTerm
    };

    console.log(this.SearchProducts);
    this.searchDataLength = this.SearchProducts.SearchData.length;
    // if (this.searchTerm.length < 1) {
    //   this.product_Name = [];
    // }
    if (this.searchDataLength > 2 && Isfirst) {
      this.loading = true
      this.momentiveService.getAllEvents(this.SearchProducts).subscribe(data => {
        console.log(data);
        if (data.length > 0) {
          console.log('inside', data.concat([]));
          this.product_Name = data;
          this.loading = false;
          this.product_Name.forEach(element => {
            if (this.ProductDrop.indexOf(element.type) == -1) {
              this.ProductDrop.push(element.type);
            }
          });
          console.log(this.searchTerm);
          if (this.searchTerm.includes("*")) {
            const searchTermNew = this.searchTerm.split('*');
            this.searchTextTerms = searchTermNew[1];
            this.searchTextONTTerms = searchTermNew[0].toLowerCase();
            console.log(this.searchTextONTTerms);
          } else {
            this.searchTextTerms = this.searchTerm;
          }

         
         
          this.items$ = this.product_Name.filter((product_Name) => {
            return product_Name.name.toLowerCase().startsWith(this.searchTerm.toLowerCase()) ||
              product_Name.type.toLowerCase().startsWith(this.searchTerm.toLowerCase()) ||
              product_Name.key.toLowerCase().startsWith(this.searchTerm.toLowerCase()) ||
              product_Name.name.toLowerCase().includes(this.searchTextTerms.toLowerCase()) ||
              product_Name.name.toLowerCase().startsWith(this.searchTextTerms.toLowerCase())
             
          });
          if(this.searchTextONTTerms === 'ont') {
            console.log(this.product_Name);
            this.items$ = this.product_Name;
          }
        } else {
          this.product_Name = [];
          this.loading = false;
          this.items$ = this.product_Name.filter((product_Name) => {
            return product_Name.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
              product_Name.type.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
              product_Name.key.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
              product_Name.name.toLowerCase().includes(this.searchTextTerms.toLowerCase())
          });
        }
      }, err => {
        console.log(err);
      })
    } else if (Isfirst === false) {
      this.loading = false;
      this.items$ = this.product_Name.filter((product_Name) => {
        return product_Name.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          product_Name.type.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          product_Name.key.toLowerCase().includes(this.searchTerm.toLowerCase())
      });

    } else if (this.searchDataLength === 0 || this.searchDataLength <= 0 && Isfirst) {
      this.loading = false;
      this.product_Name = [];
      this.ProductDrop = [];
      this.clearCheck();
      this.items$ = this.product_Name.filter((product_Name) => {
        return product_Name.name.toLowerCase().startsWith(this.searchTerm.toLowerCase()) ||
          product_Name.type.toLowerCase().startsWith(this.searchTerm.toLowerCase()) ||
          product_Name.key.toLowerCase().startsWith(this.searchTerm.toLowerCase());
      });
    }
    else if (this.searchDataLength === 0 && Isfirst) {
      this.loading = false;
      this.product_Name = [];
      this.items$ = this.product_Name.filter((product_Name) => {
        return product_Name.name.toLowerCase().startsWith(this.searchTerm.toLowerCase()) ||
          product_Name.type.toLowerCase().startsWith(this.searchTerm.toLowerCase()) ||
          product_Name.key.toLowerCase().startsWith(this.searchTerm.toLowerCase());
      });
    } 
    
  }
  compareAccounts = (item, selected) => {
    if (selected.name && item.name) {
      return item.name === selected.name;
    }
    if (item.name && selected.name) {
      return item.name === selected.name;
    }
    return false;
  };

  //Second Level Search Functinality
  onChangeData(data) {
    console.log(data)
    this.selectedProducts = true;
    this.selectedSearchText = data;
    this.secondaryNavBar = true;
    this.momentiveService.setSelectedProductData(this.selectedSearchText);
    this.router.navigate(['/app-home']);
    localStorage.setItem('SearchBarData', JSON.stringify(data));
    if (data.length <= 0) {
      this.product_Name = [];
      this.basicDetails = true;
      this.selectedProducts = false;
      this.searchProduct('', this.product_Name, this.Isfirst)
      this.router.navigate(['/app-pageindex']);
      this.secondaryNavBar = false;
    }
    this.product_Name = [];
    if (data.length > 0) {
      this.selectedProducts = true;
      this.product_Name = [];
      this.ProductDrop = [];
      this.momentiveService.getSelectedProducts(data).subscribe((res) => {
        this.Isfirst = false;
        console.log(res);
        const SearchArrayData = res;
        this.secondLevelSearch = SearchArrayData[0].search_List;
        this.momentiveService.setBasicLevelDetails(SearchArrayData[0].basic_properties);
        this.getIntialSpecList(this.selectedSearchText);
        this.product_Name = this.secondLevelSearch;
        this.product_Name.forEach(element => {
          if (this.ProductDrop.indexOf(element.type) == -1) {
            this.ProductDrop.push(element.type);
          }
        });
        if (this.product_Name.length > 0) {
          this.searchProduct('', this.product_Name, this.Isfirst);
          this.relatedProducts = true;
        } else {
          alert('NO More Related Products Available');
          this.relatedProducts = false;
          this.product_Name = [];
          this.searchProduct('', this.product_Name, this.Isfirst)
        }
      }, err => {
        console.log(err);
      })
    }
  }

  //Clear Function for Search Data:
  clearCheck() {
    if (this.searchTerm.length < 1) {
      this.product_Name = [];
      this.suggestionDrop = false;
      this.Isfirst = true;
      this.ProductDrop = [];
    }
  }

  //BAsic Properties API Call
  basicPropertiesEvent(event) {
    if (event === 'productDetails') {
      $('#basicDetails').modal('show');
      this.productLevel = [];
      this.MaterialLevel = [];
      this.casLevel = [];
      this.basicPropertiesLoader = true;
      this.basicProperties = this.momentiveService.basicLevelList;
      console.log(this.basicProperties);
      if (this.basicProperties) {
        this.basicPropertiesLoader = false;
        this.productLevel = this.basicProperties[0].product_Level;
        this.MaterialLevel = this.basicProperties[0].material_Level;
        this.MaterialLevel.forEach(element => {
          element.material_Number = parseInt(element.material_Number);
        });
        this.casLevel = this.basicProperties[0].cas_Level;
        this.copybasicLevelCompositionData = JSON.parse(JSON.stringify(this.casLevel));
      } else {
        this.basicPropertiesLoader = true;
      }
    }
  }
  //Ontology Page Redirect
  Ongtology() {
    this.router.navigate(['/app-ontology-home']);
  }
  //Page Routing in PIH
  changePage(url, data) {
    if (data) {
      this.sidebarIcon = true;
    } else {
      this.sidebarIcon = false;
    }
    this.router.navigate(['/' + url]);
  }
  UnassignedDocuments() {
    this.router.navigate(['ontology/unassigned-documents'])
  }
  OntologyMasterManagement() {
    this.router.navigate(['/ontology/synonyms']);
  }
  home() {
    this.router.navigate(['/app-pageindex']);
  }
  OntologyTest() {
    this.router.navigate(['/ontology/ontology-test']);
  }
  OtherSAPTable() {
    this.router.navigate(['/app-other-tables']);
  }

  //SpecID Droopdownlist
  getIntialSpecList(data) {
    this.NewSpecList = [];
    console.log(this.NewSpecList);
    const SpecListedData = data;
    this.momentiveService.getSelectedProducts(SpecListedData).subscribe(data => {
      console.log(data)
      this.SPECdropdownList = data;
      this.SpecLists = this.SPECdropdownList[0].selected_spec_list;
      this.momentiveService.setAllSpecList(this.SpecLists);

      if (this.SpecLists.length === 1) {
        this.specDataListDetails = false;
      } else {
        this.specDataListDetails = true;
      }
      console.log(this.SpecLists[0]);
      const specNewData = this.SpecLists[0].name.split('|');
      this.SpecSplitNewTerm = specNewData[0];
      console.log(this.SpecSplitNewTerm);
      console.log(this.SpecLists);
      this.SpecLists.forEach(element => {
        const NewDataSpec = element.name.split('|');
        let SplitedSpecTerm = NewDataSpec[0];
        if (SplitedSpecTerm === this.SpecSplitNewTerm) {
          console.log(this.NewSpecList);
          this.NewSpecList.push(element);
          console.log(this.NewSpecList);
        }
      });
      // set initial selection
       this.toggleSelection('false')
      this.specMultiCtrl.setValue(this.NewSpecList);
      this.momentiveService.setCategorySpecList(this.NewSpecList);
      this.getAPICallCASDetails();
      this.getAPICallMATDetails();
      this.getAPICallProductDetails();
      this.momentiveService.homeEvent.next();
      // load the initial SPEC_List list
      this.filteredSpecMulti.next(this.SpecLists.slice());
      // listen for search field value changes
      this.specMultiFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filteredSpecListMulti();
        });
      console.log(this.SPECdropdownList);
    }, err => {
      console.log(err);
    })
  }
  selectCheckBoxMethod(selected: boolean, checkedValue) {
    console.log(this.specMultiCtrl.value.length);
    console.log(this.specMultiCtrl.value)
    this.NewSpecList = this.specMultiCtrl.value;
    console.log(this.NewSpecList);
    console.log(selected);
    let temp = [];
    this.filteredSpecMulti.pipe(takeUntil(this._onDestroy))
    .subscribe((val) => {
    const specNewData = checkedValue.name.split('|');
    this.SpecSplitNewTerm = specNewData[0];
    console.log(this.SpecSplitNewTerm);
    console.log(this.SpecLists);
    val.forEach(element => {
      const NewDataSpec = element.name.split('|');
      let SplitedSpecTerm = NewDataSpec[0];
      if (SplitedSpecTerm === this.SpecSplitNewTerm) {
        temp.push(element);
        console.log(temp);
      }
    });
    console.log(temp);
    temp.forEach(element => {
      const index = this.NewSpecList.indexOf(element);
      if (index > -1) {
        this.NewSpecList.splice(index, 1);
      }
    });
    console.log(this.NewSpecList);
    console.log(temp);
    if (selected == true) {
      console.log(this.NewSpecList)
      this.NewSpecList = this.NewSpecList.concat(temp);
    } else if (selected == false) {
      this.NewSpecList = this.NewSpecList.concat([]);
    }
  });
  console.log(this.NewSpecList)
    this.specMultiCtrl.patchValue(this.NewSpecList);
  }

  //Submit Selected SPEC Details
  selectedTopSpecList() {
    console.log(this.specMultiCtrl.value);
    this.sideSpecList = this.specMultiCtrl.value;
    console.log(this.sideSpecList);
    //Home page API Call chaning the SPEc-Id;
    // this.momentiveService.setSelectedProductData(this.sideSpecList);
    this.momentiveService.setCategorySpecList(this.specMultiCtrl.value);
    console.log(this.specMultiCtrl.value)
    this.getAPICallCASDetails();
    this.getAPICallMATDetails();
    this.getAPICallProductDetails();
    this.momentiveService.homeEvent.next();
    this.toastr.successToastr('Specification ID Selected.', 'Success!');
  }
  ngAfterViewInit() {
    this.setInitialValue();
  }

  //Destroy the API Call
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  //Filter Option In SPEC ID
  toggleSelection(change): void {

    console.log(this.SpecLists);
    this.newLimitedData = [];
    this.filteredSpecMulti.pipe(takeUntil(this._onDestroy))
      .subscribe((val) => {
        if (change.checked) {
          // alert('Allow To Select Only 20 SPEC List');
          this.limitedSPec = [];
          console.log(val);
          this.limitedSPec = val;
          this.newLimitedData = this.limitedSPec.slice(0, 20);
          console.log(this.newLimitedData);
          this.specMultiCtrl.setValue(this.newLimitedData);
          console.log(this.specMultiCtrl);
        } else {
          this.limitedSPec = val;
          this.newLimitedData = this.limitedSPec.slice(0, 1);
          console.log(this.newLimitedData);
          this.specMultiCtrl.setValue(this.newLimitedData);
        }
      });
  }
  //Sets the initial value after the filteredSPEC_Lists are loaded initially
  protected setInitialValue() {
    this.limitedSPec = [];
    this.filteredSpecMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // this.multiSelect.compareWith = (a: SPEC_List, b: SPEC_List) => a && b && a.id === b.id;
      });
  }

  //Multiple Select In Spec ID
  protected filteredSpecListMulti() {
    if (!this.SpecLists) {
      return;
    }
    // get the search keyword
    let search = this.specMultiFilterCtrl.value;
    console.log(search)
    if (!search) {
      this.filteredSpecMulti.next(this.SpecLists.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the SPEC_Lists
    this.filteredSpecMulti.next(
      this.SpecLists.filter(SPEC_List => SPEC_List.name.toLowerCase().indexOf(search) > -1)
    );
  }

  exportToBasicCasLevel() {
    this.basicLevelExcelCompositionData =[];
   this.copybasicLevelCompositionData.forEach(element => {
     this.basicLevelExcelCompositionData.push({
       'Pure Specification Id' : element.pure_Spec_Id,
       'Chemical Name' : element.chemical_Name,
       'Cas Number' : element.cas_Number
       
     });
     });
   const ws: xlsx.WorkSheet =   
   xlsx.utils.json_to_sheet(this.basicLevelExcelCompositionData);
   const wb: xlsx.WorkBook = xlsx.utils.book_new();
   xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
   xlsx.writeFile(wb, 'Basic Level Composition Table.xlsx');
  }

  //Export Excel in Product Level Details
  exportToBasicProductTable() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.basicProduct.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'Product-Level.xlsx');
  }
  //Export Excel in Material Level Details
  exportToBasicMaterialLevel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.basicMaterial.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'Material-Level.xlsx');
  }
  //Export Excel in CAS Level Details
  // exportToBasicCasLevel() {
  //   const ws: xlsx.WorkSheet =
  //     xlsx.utils.table_to_sheet(this.basicCas.nativeElement);
  //   const wb: xlsx.WorkBook = xlsx.utils.book_new();
  //   xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   xlsx.writeFile(wb, 'CAS-Level.xlsx');
  // }


  //API Parameter sending Call Details:
  getAPICallCASDetails() {
    this.myCASArrayFilteredData = [];
    this.tempMyCAS = [];
    this.casAPILevel = [];
    this.CASLevelAPIData = this.momentiveService.basicLevelList;
    console.log(this.CASLevelAPIData);
    console.log(this.CASLevelAPIData[0].cas_Level);
    if (this.CASLevelAPIData[0].cas_Level.length > 1) {
      this.CASLevelAPIData[0].cas_Level.forEach(element => {
        this.basicCASPropertiesDetails = element.spec_Nam_List;
        console.log(this.basicCASPropertiesDetails);
        this.selectedAPISpecList = this.momentiveService.getCategorySpecList();
        console.log(this.selectedAPISpecList);
        this.tempMyCAS.push(this.basicCASPropertiesDetails.filter((el) => {
          return this.selectedAPISpecList.some((f) => {
            return f.name === el.real_Spec_Id;
          });
        }));
      });

      this.tempMyCAS.forEach(element => {
        element.forEach(innerElement => {
          this.myCASArrayFilteredData.push(innerElement);
        })
      })


      let combArr = [];
      console.log(this.myCASArrayFilteredData);
      let clone = JSON.parse(JSON.stringify(this.myCASArrayFilteredData));
      clone.forEach(element => {
        let comb = element.pure_Spec_Id + '-' + element.cas_Number + '-' + element.chemical_Name;
        if (combArr.indexOf(comb) != -1) {
          this.casAPILevel.forEach(innerElement => {
            let pure_Spec = innerElement.pure_Spec_Id;
            let cas_Num = innerElement.cas_Number;
            let chem_Name = innerElement.chemical_Name;

            if (pure_Spec == element.pure_Spec_Id && cas_Num == element.cas_Number && chem_Name == element.chemical_Name)
              innerElement.real_Spec_Id.push(element.real_Spec_Id)
          });
        } else {
          combArr.push(comb);
          let real_spec = element.real_Spec_Id;
          element.real_Spec_Id = [];
          element.real_Spec_Id.push(real_spec);
          this.casAPILevel.push(element);
        }
      });
    } else {
      let SingleCASDetails = [];
      let singleRealSpec = [];
      this.casAPILevel = [];
      let singleCASData = this.CASLevelAPIData[0].cas_Level[0];
      let singleRealspectemp = this.CASLevelAPIData[0].cas_Level[0].spec_Nam_List
      singleRealspectemp.forEach(element => {
        singleRealSpec.push(element.real_Spec_Id);
      });

      SingleCASDetails.push({
        "pure_Spec_Id": singleCASData.pure_Spec_Id,
        "cas_Number": singleCASData.cas_Number,
        "chemical_Name": singleCASData.chemical_Name,
        "real_Spec_Id": singleRealSpec
      });
      console.log(SingleCASDetails);
      this.casAPILevel = SingleCASDetails;
    }
    console.log('****CAS****');
    console.log(this.casAPILevel);

    this.momentiveService.setCasLevelDetails(this.casAPILevel);
  }

  getAPICallMATDetails() {
    this.getAPICallProductDetails();
    this.myMATArrayFilteredData = [];
    this.tempMyMAT = [];
    this.MATAPILevel = [];
    this.MATLevelAPIData = this.momentiveService.basicLevelList;
    console.log(this.MATLevelAPIData);
    console.log(this.MATLevelAPIData[0].material_Level.length);
    if (this.MATLevelAPIData[0].material_Level.length > 1) {
      this.MATLevelAPIData[0].material_Level.forEach(element => {
        this.basicMATPropertiesDetails = element.spec_Nam_List;
        console.log(this.basicMATPropertiesDetails);
        this.selectedAPISpecList = this.momentiveService.getCategorySpecList();
        this.tempMyMAT.push(this.basicMATPropertiesDetails.filter((el) => {
          return this.selectedAPISpecList.some((f) => {
            return f.name === el.real_Spec_Id;
          });
        }));
      });
      console.log(this.tempMyMAT);
      this.tempMyMAT.forEach(element => {
        element.forEach(innerElement => {
          this.myMATArrayFilteredData.push(innerElement);
        })
      })


      this.MATAPILevel = [];
      let combArr = [];
      console.log(this.myMATArrayFilteredData);
      let clone = JSON.parse(JSON.stringify(this.myMATArrayFilteredData));
      clone.forEach(element => {
        let comb = element.bdt + '-' + element.material_Number + '-' + element.description;
        if (combArr.indexOf(comb) != -1) {
          this.MATAPILevel.forEach(innerElement => {
            let mat_bdt = innerElement.bdt;
            let mat_Num = innerElement.material_Number;
            let mat_desc = innerElement.description;

            if (mat_bdt == element.bdt && mat_Num == element.material_Number && mat_desc == element.description)
              innerElement.real_Spec_Id.push(element.real_Spec_Id)
          });
        } else {
          combArr.push(comb);
          let real_spec = element.real_Spec_Id;
          element.real_Spec_Id = [];
          element.real_Spec_Id.push(real_spec);
          this.MATAPILevel.push(element);
        }
      });
    } else {
      let SingleMATDetails = [];
      let singleRealSpec = [];
      this.MATAPILevel = [];
      let singleMATData = this.MATLevelAPIData[0].material_Level[0];
      let singleRealspectemp = this.MATLevelAPIData[0].material_Level[0].spec_Nam_List
      singleRealspectemp.forEach(element => {
        singleRealSpec.push(element.real_Spec_Id);
      });

      SingleMATDetails.push({
        "bdt": singleMATData.bdt,
        "material_Number": singleMATData.material_Number,
        "description": singleMATData.description,
        "real_Spec_Id": singleRealSpec
      });
      console.log(SingleMATDetails);
      this.MATAPILevel = SingleMATDetails;
    }
    console.log('****MAT****');
    console.log(this.MATAPILevel);
    this.momentiveService.setMaterialLevelDetails(this.MATAPILevel);
  }

  getAPICallProductDetails() {
    this.ProductAPILevel = [];
    this.ProductLevelAPIData = this.momentiveService.basicLevelList;
    console.log(this.ProductLevelAPIData)
    this.basicProductPropertiesDetails = this.ProductLevelAPIData[0].product_Level;
    console.log(this.basicProductPropertiesDetails)
    this.selectedAPISpecList = this.momentiveService.getCategorySpecList();
    console.log(this.selectedAPISpecList);
    let SplitedSpecTerm = [];
    this.selectedAPISpecList.forEach(element => {
      let NewDataSpec = element.name.split(' | ');
      SplitedSpecTerm.push({ 'name': NewDataSpec[0] });
    });
    console.log('***SPECList***')
    console.log(SplitedSpecTerm);
    this.ProductAPILevel = this.basicProductPropertiesDetails.filter((el) => {
      return SplitedSpecTerm.some((f) => {
        return f.name === el.real_Spec_Id;
      });
    });
    console.log('****Product****');
    console.log(this.ProductAPILevel);
    this.momentiveService.setProductLevelDetails(this.ProductAPILevel);
  }
  keySearch(){
    document.getElementById("myDropdown").classList.toggle("show");
  }

}
