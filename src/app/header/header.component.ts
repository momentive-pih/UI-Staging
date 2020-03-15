import { AfterViewInit, Component, OnDestroy , OnInit, ViewChild, ElementRef,ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Attribute, IfStmt } from '@angular/compiler';
import { MatTableDataSource } from '@angular/material';
import { TableModule } from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { HomeService } from '../service/home-service.service';
import { Observable, Subject ,ReplaySubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption, NgSelectComponent } from '@ng-select/ng-select';
import { MomentiveService } from '../service/momentive.service';
import { Router, ActivatedRoute, NavigationStart, NavigationExtras} from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import * as xlsx from 'xlsx';



declare var $: any;
interface product {
  name: string;
}

interface Bank {
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
  SpecreactiveForm:FormGroup
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
  copysidebarData: any = [];
  productLsr_Name: any = [];
  productSilsoft_Name: any = [];
  Searchname: any;
  productCAS_Number: any;
  basicDetails = true;
  submitDetails = false;
  intialData_Details: any = [];
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
  basicProperties: any = []
  searchAlertMessage: any;
  relatedProducts = true;
  searchLoader = false;
  searchTextTerms:any;
  searchTerm:any;
  objectKeys = Object.keys;
  public items$: Observable<product[]>;
  public input$ = new Subject<string | null>();

  /**SPECID dropdown List */

  SPECdropdownList:any = [];
  selectedSPECItems:any = [];
  dropdownSettings = {};
  firstSpecData = [];
  selectedSpecList:any = [];
  banks:any = [];
  specDataListDetails:any;
  sideSpecList:any;
  userSelectedSPECDetails:any=[];
  basicPropertiesLoader:any;
  public loading;
  notifier:any;
  userSelectedProducts:any;

  userCASFilter:any = {cas_Number:''};
  userMaterialFilter: any = {material_Number:''};
  userProductFilter:any = {prodIdentifiers:''};

    /** control for the selected bank for multi-selection */
    public bankMultiCtrl: FormControl = new FormControl();
     
    /** control for the MatSelect filter keyword multi-selection */
    public bankMultiFilterCtrl: FormControl = new FormControl();
  
    /** list of banks filtered by search keyword */
    public filteredBanksMulti: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);
  
    @ViewChild('multiSelect',{static:false}) multiSelect: MatSelect;
  
    /** Subject that emits when the component has been destroyed. */
    protected _onDestroy = new Subject<void>();

  @ViewChild('code', {
    static: false
  }) private codeRef?: ElementRef<HTMLElement>;

  @ViewChild('code', {
    static: true
  }) myselect: ElementRef;

  @ViewChild('basicProduct', { static: false }) basicProduct: ElementRef;

  @ViewChild('basicMaterial', { static: false }) basicMaterial: ElementRef;

  @ViewChild('basicCas', { static: false }) basicCas: ElementRef;

  constructor(private fb: FormBuilder,public toastr: ToastrManager, vcr: ViewContainerRef,private route: ActivatedRoute, private router: Router, private homeService: HomeService, private momentiveService: MomentiveService) {

  

    this.momentiveService.homeEvent.subscribe(data =>{
      this.ngOnInit()
    })

    
  
    this.reactiveForm = fb.group({
      selectedSearchNew: ['', Validators.required],
    });
    console.log( this.reactiveForm.value);

    this.SpecreactiveForm = fb.group({
      selectedSPECItems: ['', Validators.required],
    })
    this.input$.subscribe(
      (term) => this.searchProduct(term, this.product_Name, this.Isfirst)); 
  }
  ngOnInit() {
    this.categoryType = 'NAM Product'
    this.url = window.location.href.includes('home');
    console.log(this.url);

    this.fireEvent(event);
    // intialData_Details
    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.intialData_Details = this.productdata.intialData_Details;
    }, err => {
      console.error(err);
    });
    // product_type
    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.product_type = this.productdata.product_type;
    }, err => {
      console.error(err);
    });
    $(document).on('click', function (event) {
      if (!$(event.target).closest('.dropdown-select').length) {
        $('.option-list, .search-box').hide();
      }
    });
    $('.select').click(function (event) {
      //$('.option-list, .search-box').hide();
      $(this).closest('.dropdown-select').find('.option-list, .search-box').toggle();
    });
    //Search

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
  selectEvent(item) {
    // do something with selected item
    console.log(item);
  }
  onChangeSearch(data) {
    if (data.length > 2) {
      console.log(data);
      this.product_NameData = this.product_Name.filter((ProductName) => (ProductName.includes(data)));
      console.log(this.product_NameData);
    }
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  onFocused(data) {
    this.onChangeSearch(data);
  }
  communicationProcess(data) {
    this.commuicationDataCheck = data;
    console.log(this.commuicationDataCheck);
    this.CommunicationHistoryData = this.CopycommunicationHistoryData.filter((communication) => (communication.customer_name === this.commuicationDataCheck || communication.product_name === this.commuicationDataCheck || communication.bu === this.commuicationDataCheck || communication.topic === this.commuicationDataCheck));
    console.log(this.CommunicationHistoryData);
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
  private searchProduct(term: string | null, arr, Isfirst) {
    this.suggestionDrop = true;
    this.searchTerm = term ? term : '';
    this.SearchProducts = {
      'SearchData': this.searchTerm
    };
    console.log(this.SearchProducts);
    this.searchDataLength = this.SearchProducts.SearchData.length;
    if (this.searchDataLength > 2 && Isfirst) {
      this.loading = true
      this.momentiveService.getAllEvents(this.SearchProducts).subscribe(data => {
        if (data.length > 0) {
          this.loading = false;
          console.log('inside', data.concat([]));
          this.product_Name = data;
          this.product_Name.forEach(element => {
            if (this.ProductDrop.indexOf(element.type) == -1) {
              this.ProductDrop.push(element.type);
            }
          });
               console.log(this.searchTerm);
              if(this.searchTerm.includes("*")) {
              const searchTermNew = this.searchTerm.split('*');
              this.searchTextTerms = searchTermNew[1];
              console.log(this.searchTextTerms);
            } 
            else {
              this.searchTextTerms = null;
            }
          
          this.items$ = this.product_Name.filter((product_Name) => {
            return product_Name.name.toLowerCase().startsWith(this.searchTerm.toLowerCase()) ||
             product_Name.type.toLowerCase().startsWith(this.searchTerm.toLowerCase()) || 
             product_Name.key.toLowerCase().startsWith(this.searchTerm.toLowerCase()) ||
             product_Name.name.toLowerCase().startsWith(this.searchTextTerms) 
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
    } else if (this.searchDataLength <= 0 && Isfirst) {
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
  onChangeData(data) {
    this.selectedProducts = true;
    this.selectedSearchText = data;
    this.secondaryNavBar = true;
    this.momentiveService.homeEvent.next();
    this.momentiveService.setSelectedProductData(this.selectedSearchText);
    this.router.navigate(['/app-home']);
    localStorage.setItem('SearchBarData', JSON.stringify(data))
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
        this.product_Name = res;
        this.product_Name.forEach(element => {
          if (this.ProductDrop.indexOf(element.type) == -1) {
            this.ProductDrop.push(element.type);
          }
        });
        if (this.product_Name.length > 0) {
          this.searchProduct('', this.product_Name, this.Isfirst);
        } else {
          alert('NO More Related Products Available');
          this.relatedProducts = false;
          this.product_Name = [];
          this.searchProduct('', this.product_Name, this.Isfirst)
        }
      }, err => {
        console.log(err);
      })
      this.getIntialSpecList(this.selectedSearchText);
    }
 
  }
  clearCheck() {
    this.product_Name = [];
    this.suggestionDrop = false;
    this.Isfirst = true;
    this.ProductDrop = [];
  }
  // fileter the Standard Composition-CAS Number
  casNumberFileter() {
    // tslint:disable-next-line: variable-name
    const CAS_data = '68083-19-2';
    this.standardCompositionData = this.copystandardCompositionData.filter((casNumber) => (casNumber.CAS_Number === CAS_data));
    console.log(this.standardCompositionData);
    this.hunderedCompositionData = this.copyhunderedCompositionData.filter((casNumber) => (casNumber.CAS_Number === CAS_data));
    console.log(this.hunderedCompositionData);
    this.legalCompositionData = this.copylegalCompositionData.filter((casNumber) => (casNumber.CAS_Number === CAS_data));
    console.log(this.legalCompositionData);
  }
  customerNameFilter() {
    const CustomerNameData = 'OU EUROBIO LAB';
    this.CommunicationHistoryData = this.CopycommunicationHistoryData.filter((customer) => (customer.customer_name == CustomerNameData));
    console.log(this.CommunicationHistoryData);
  }

  fireEvent(event) {
    if (event === 'productDetails') {
      $('#basicDetails').modal('show');

      this.productLevel = [];
      this.MaterialLevel = [];
      this.casLevel = [];
      this.basicPropertiesLoader = [];
      this.userSelectedProducts = this.momentiveService.selectedProduct
      this.momentiveService.getSpecList(this.userSelectedProducts).subscribe(data => {
        console.log(data)
      this.userSelectedSPECDetails = data;
      this.momentiveService.getBasicProperties(this.userSelectedSPECDetails).subscribe(data => {
      this.basicProperties = data;
      if(this.basicProperties.length > 0) {
        this.basicPropertiesLoader = false;
        this.productLevel = this.basicProperties[0].productLevel;
        this.MaterialLevel = this.basicProperties[0].materialLevel;
        this.casLevel = this.basicProperties[0].CASLevel;
      } else {
          this.basicPropertiesLoader = true;
      } 
   
      }, err => {
        console.error(err);
      });
    });
  } 
  }
  Ongtology() {
    this.router.navigate(['/app-ontology-home']);
  }
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

  //SpecID Droopdownlist
  getIntialSpecList(data) {
      const SpecListedData = data;
    this.momentiveService.getSpecList(SpecListedData).subscribe(data => {
      console.log(data)
      this.SPECdropdownList = data; 
      this.banks = this.SPECdropdownList;
      if(this.banks.length === 1) {
        this.specDataListDetails = false;
      } else {
        this.specDataListDetails = true;
      }
     // set initial selection
     this.bankMultiCtrl.setValue([this.banks[0]]);
     this.momentiveService.setCategorySpecList([this.banks[0]]);
     // load the initial bank list
     this.filteredBanksMulti.next(this.banks.slice());
     // listen for search field value changes
     this.bankMultiFilterCtrl.valueChanges
       .pipe(takeUntil(this._onDestroy))
       .subscribe(() => {
         this.filterBanksMulti();
       });
      console.log(this.SPECdropdownList);
    }, err => {
      console.log(err);
    })
  }

  
  selectAll(checkAll, select, values) {
    //this.toCheck = !this.toCheck;
    if(checkAll){
      select.update.emit(values); 
    }
    else{
      select.update.emit([]);
    }
  }

  selectedTopSpecList() {
    console.log(this.bankMultiCtrl.value);
    this.sideSpecList = this.bankMultiCtrl.value[0];
    console.log(this.sideSpecList);
     this.momentiveService.homeEvent.next();
     this.momentiveService.setSelectedProductData(this.sideSpecList);
     this.momentiveService.setCategorySpecList(this.bankMultiCtrl.value);
     this.toastr.successToastr('Specification ID Selected.', 'Success!');
  }


  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  toggleSelection(change) :void {
    this.filteredBanksMulti.pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(val => {
        if (change.checked) {
          this.bankMultiCtrl.patchValue(val);
        } else {
          this.bankMultiCtrl.patchValue([]);
        }
      })
      
  }


  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filteredBanksMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // this.multiSelect.compareWith = (a: Bank, b: Bank) => a && b && a.id === b.id;
      });
  }

  protected filterBanksMulti() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.bankMultiFilterCtrl.value;
    console.log(search)
    if (!search) {
      this.filteredBanksMulti.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanksMulti.next(
      this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }


  exportToBasicProductTable() {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.basicProduct.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'Product-Level.xlsx');
   }
   exportToBasicMaterialLevel() {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.basicMaterial.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'Material-Level.xlsx');
   }

   exportToBasicCasLevel() {
    const ws: xlsx.WorkSheet =   
    xlsx.utils.table_to_sheet(this.basicCas.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'CAS-Level.xlsx');
   }
}
