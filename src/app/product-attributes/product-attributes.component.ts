import { Component, OnInit, ViewChild, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { Attribute } from '@angular/compiler';
import { MatTableDataSource } from '@angular/material';
import { TableModule } from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { MomentiveService } from '../service/momentive.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import * as xlsx from 'xlsx';
import { ToastrManager } from 'ng6-toastr-notifications';

interface speclist {
  id: string;
  name: string;
}

declare var $: any;
$.fn.modal.Constructor.prototype._enforceFocus = function () { };
@Component({
  selector: 'app-product-attributes',
  templateUrl: './product-attributes.component.html',
  styleUrls: ['./product-attributes.component.css']
})
export class ProductAttributesComponent implements OnInit, OnDestroy {

  @Input() data: string;
  selecteditem: any;
  selectednav: 'active';
  product_Name: any = [];
  product_type: any = [];
  compositionPart: any = [];
  emptyProduct: string;
  compostionCheck: string;
  compositionLegalTypes = false;
  compositionSHI = true;
  value: string;
  type: string;
  modeselect = 'Legal Composition';
  items: string[];
  selectedIndex: number;
  selectedId: any;
  selectedboxId: any;
  /*Product Attributes */
  productAttributesCheck = 'Basic Information'
  productAttributeCheck: any = [];
  primaryInformtionTypes = true;
  ghsLabeling = false;
  structureAndFormulaTypes = false;
  compositionTypes = false;
  flowDiagrams = false;
  cols: any[];
  legalProducts: any[];
  selectedlegalProducts: any[];
  selectedColumns: any[];

  // GHS Labeling
  ghsLabelingData: any[];
  ghsLabelingHeader: any[];
  selectedLabelingProducts: any[];
  selectedLabelingColumns: any[];
  legalpaginator = false;
  private colsTempor: any[] = [];
  public columnOptions: any[];

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
  radiovalue: any;
  productData: any = [];
  productApplication: any = [];
  selectedSpec: any
  specDetails: any;
  objectKeys = Object.keys;
  subLevelData: any;
  svtCompositionLevel = false;
  UserSelectedProducts: any = [];
  SelectedUserData: any;
  compositionSpecID = false;
  SPECdropdownList: any = [];
  sideSpecList: any = [];
  SpecListDetails: any = [];
  sales: any = [];
  SVT_table: any = [];
  userSelectedProducts: any = [];
  scrollableCols: any[];
  ghsLabelingDataHeader: any = [];
  productAttributeStructures: any = []
  chemicalStructureTable: any = [];
  molecularFormulaTable: any = [];
  molecularWeightTable: any = [];
  ProductAttributeLoader: boolean = true;
  productAttributeAPIData: any = [];
  selectedSpecList: any = [];
  CategoryDetails: any = []
  productdata: any = []
  pihAlertMessage: boolean;
  basicDetailsproducts: any = [];
  primaryBasicDetails: any = [];
  primaryProductApplication: any = [];
  SynthesisDiagram: any = [];
  ManufractureDiagram: any = [];
  ManufractureDiagramPart: boolean;
  SynthesisDiagramPart: boolean;
  ManufractureDiagramCheck: any = [];
  SynthesisDiagramCheck: any = [];
  PotentialApplicationDetails: any = [];
  potentialAPPData: boolean;
  productLevelDetails: any = [];
  allMaterialLevel: any = [];
  activeMaterial: any = [];
  firstSpecData: any;
  compositionlocations: any = [];
  compositionDataLevel: boolean
  compositionStandardData: any = [];
  /** control for the selected speclist */
  public specList: FormControl = new FormControl();
  /** control for the MatSelect filter keyword */
  public specFilterCtrl: FormControl = new FormControl();
  /** list of speclists filtered by search keyword */
  public filteredspecList: ReplaySubject<speclist[]> = new ReplaySubject<speclist[]>(1);
  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  @ViewChild('singleSelect', { static: false }) singleSelect: MatSelect;
  @ViewChild('SVTtable', { static: false }) SVTtable: ElementRef;
  @ViewChild('StandardCompositiontable', { static: false }) StandardCompositiontable: ElementRef;
  @ViewChild('LegalCompositiontable', { static: false }) LegalCompositiontable: ElementRef;

  //Composition DropDown 
  compositionsTypes: any = [
    {
      name: "Standard, 100 % & INCI Composition",
      value: "SHI"
    },
    {
      name: "Legal Composition",
      value: "legal"
    }
  ]
  selectedlocation: any;
  selectedComposition: any;
  selectedLocationControl = new FormControl();
  selectedCompositionControl = new FormControl();


  constructor(private route: ActivatedRoute, private router: Router, private momentiveService: MomentiveService,
    public toastr: ToastrManager, vcr: ViewContainerRef, ) {

    this.momentiveService.notifyObservable$.subscribe(value => {
      this.selecteditem = value;
      console.log(this.selecteditem);
      this.productAttributebasicDetail();
      if (this.selecteditem) {
        setTimeout(() => {
          this.onChangeProductAttribute(this.selecteditem);
        }, 0);
      }
    });

  }
  ngOnInit() {

    // ProductAttribute Radio Box API Call
    this.momentiveService.getSearchData().subscribe(data => {
      this.productData = data;
      console.log(this.productData);
      this.productAttributeCheck = this.productData.productAttributeCheck;
      console.log(this.productAttributeCheck);
    }, err => {
      console.error(err);
    });
    // Table Header cols
    this.momentiveService.getSearchData().subscribe(data => {
      this.productData = data;
      this.cols = this.productData.cols;
      console.log(this.cols);
    }, err => {
      console.error(err);
    });

    //GHS Labeling Table header
    this.ghsLabelingDataHeader = [
      { "field": "spec_Id", "header": "Specification Id" },
      { "field": "regulatory_Basis", "header": "Regulatory Basis" },
      { "field": "usage", "header": "Usage" },
      { "field": "symbols", "header": "Symbols" },
      { "field": "signal_Word", "header": "Signal Word" },
      { "field": "hazard_Statements", "header": "Hazard Statements" },
      { "field": "prec_Statements", "header": "Prec Statements" },
      { "field": "additional_Information", "header": "Additional Information / Remarks", "width": "20%", "white-space": "pre-wrap" }
    ]
    this.compositionDataLevel = false;
  }

  //Basic Details API Call
  productAttributebasicDetail() {
    this.ProductAttributeLoader = true;
    this.pihAlertMessage = false;
    this.productAttributeAPIData = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = this.momentiveService.ProductCategoryData;
    console.log(this.CategoryDetails);
    this.productAttributeAPIData.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails[0],
    });
    console.log(this.productAttributeAPIData)
    this.momentiveService.getProductAttributes(this.productAttributeAPIData).subscribe(data => {
      console.log(data);
      this.productdata = data;
      console.log(this.productdata);
      if (this.productdata.length > 0) {
        this.ProductAttributeLoader = false;
        this.pihAlertMessage = false;
        this.basicDetailsproducts = this.productdata;
        console.log(this.basicDetailsproducts);
        this.primaryBasicDetails = this.basicDetailsproducts[0].basic_details;
        console.log(this.primaryBasicDetails);
        this.primaryProductApplication = this.basicDetailsproducts[1].product_Application;
        if (this.primaryProductApplication.length > 0) {
          this.PotentialApplicationDetails = this.primaryProductApplication;
          this.potentialAPPData = true;
        } else {
          this.potentialAPPData = false;
        }
        console.log(this.primaryProductApplication);
      }
      else {
        this.pihAlertMessage = true;
        this.ProductAttributeLoader = false;
      }

    }, err => {
      console.error(err);
    });
  }

  //GHS Labeling API Call
  productAttributeGHSLabeling() {
    this.ProductAttributeLoader = true;
    this.productAttributeAPIData = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = { index: 1, Category: "Product Attributes", Subcategory: "GHS Labeling" }
    this.productAttributeAPIData.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails,
    });
    console.log(this.productAttributeAPIData)
    this.momentiveService.getProductAttributes(this.productAttributeAPIData).subscribe(data => {
      console.log(data);
      this.productdata = data;
      console.log(this.productdata);
      if (this.productdata.length > 0) {
        this.ProductAttributeLoader = false;
        this.pihAlertMessage = false;
        this.ghsLabelingHeader = this.ghsLabelingDataHeader;
        this.ghsLabelingData = this.productdata[0].ghs_Labeling;
        console.log(this.ghsLabelingData);
      }
      else {
        this.pihAlertMessage = true;
        this.ProductAttributeLoader = false;
      }
    }, err => {
      console.error(err);
    });
  }

  //Composition Product and material Level Details
  productAttributeComposition() {
    this.ProductAttributeLoader = true;
    this.pihAlertMessage = false;
    this.productAttributeAPIData = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = { index: 3, Category: "Product Attributes", Subcategory: "Composition" }
    console.log(this.CategoryDetails);
    this.productAttributeAPIData.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails,
    });
    console.log(this.productAttributeAPIData)
    this.momentiveService.getProductAttributes(this.productAttributeAPIData).subscribe(data => {
      console.log(data);
      this.productData = data;
      this.productLevelDetails = this.productData[0].product_Level;
      console.log(this.productLevelDetails);
      this.allMaterialLevel = this.productData[0].all_material;
      this.activeMaterial = this.productData[0].active_material
    });

  }

  //Structure and Formulas API  Call
  productAttributeStructureAndFormulas() {
    this.ProductAttributeLoader = true;
    this.productAttributeAPIData = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = { index: 2, Category: "Product Attributes", Subcategory: "Structures and Formulas" }
    console.log(this.CategoryDetails);
    this.productAttributeAPIData.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails,
    });
    console.log(this.productAttributeAPIData)
    this.momentiveService.getProductAttributes(this.productAttributeAPIData).subscribe(data => {
      console.log(data);
      this.productdata = data;
      console.log(this.productdata);
      if (this.productdata.length > 0) {
        this.ProductAttributeLoader = false;
        this.pihAlertMessage = false;
        this.productAttributeStructures = this.productdata;
        console.log(this.productAttributeStructures);
        this.chemicalStructureTable = this.productAttributeStructures[0].chemical_Structure;
        this.molecularFormulaTable = this.productAttributeStructures[1].molecular_Formula;
        this.molecularWeightTable = this.productAttributeStructures[2].molecular_Weight;
      }
      else {
        this.pihAlertMessage = true;
        this.ProductAttributeLoader = false;
      }

    }, err => {
      console.error(err);
    });

  }

  //Flow Diagram Function Call
  productAttributeFlowdiagram() {
    this.ProductAttributeLoader = true;
    this.pihAlertMessage = false;
    this.productAttributeAPIData = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = { index: 4, Category: "Product Attributes", Subcategory: "Flow Diagrams" }
    console.log(this.CategoryDetails);
    this.productAttributeAPIData.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails,
    });
    console.log(this.productAttributeAPIData)
    this.momentiveService.getProductAttributes(this.productAttributeAPIData).subscribe(data => {
      console.log(data);
      this.productdata = data;
      console.log(this.productdata);
      if (this.productdata.length > 0) {
        this.ProductAttributeLoader = false;
        this.pihAlertMessage = false;
        this.basicDetailsproducts = this.productdata;
        this.ManufractureDiagramCheck = this.basicDetailsproducts[0].manufacture_Flow;
        if (this.ManufractureDiagramCheck.length > 0) {
          this.ManufractureDiagramPart = true;
          this.ManufractureDiagram = this.ManufractureDiagramCheck;
        } else {
          this.ManufractureDiagramPart = false;
        }
        this.SynthesisDiagramCheck = this.basicDetailsproducts[1].synthesis_Diagram;
        if (this.SynthesisDiagramCheck.length > 0) {
          this.SynthesisDiagramPart = true;
          this.SynthesisDiagram = this.SynthesisDiagramCheck;
        } else {
          this.SynthesisDiagramPart = false;
        }
      }
      else {
        this.pihAlertMessage = true;
        this.ProductAttributeLoader = false;
      }

    }, err => {
      console.error(err);
    });
  }


  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  CompositionTypes(value) {
    this.compostionCheck = value;
  }
  //Selcted Radio Button function
  selectItem(index, data, radiodata): void {
    this.selectedId = index;
    this.value = data;
    this.radiovalue = radiodata;
  }

  //Top radio button change Function
  onChangeProductAttribute(item) {
    this.productAttributesCheck = item;
    if (this.productAttributesCheck === 'Basic Information') {
      this.primaryInformtionTypes = true;
      this.ghsLabeling = false;
      this.structureAndFormulaTypes = false;
      this.compositionTypes = false;
      this.flowDiagrams = false;
      this.productAttributebasicDetail();
    } else if (this.productAttributesCheck === 'GHS Labeling') {
      this.primaryInformtionTypes = false;
      this.ghsLabeling = true;
      this.structureAndFormulaTypes = false;
      this.compositionTypes = false;
      this.flowDiagrams = false;
      this.productAttributeGHSLabeling();
    } else if (this.productAttributesCheck === 'Structures and Formulas') {
      this.primaryInformtionTypes = false;
      this.ghsLabeling = false;
      this.structureAndFormulaTypes = true;
      this.compositionTypes = false;
      this.flowDiagrams = false;
      this.productAttributeStructureAndFormulas();
    } else if (this.productAttributesCheck === 'Composition') {
      this.primaryInformtionTypes = false;
      this.ghsLabeling = false;
      this.structureAndFormulaTypes = false;
      this.compositionTypes = true;
      this.flowDiagrams = false;
      this.userSelectedProducts = this.momentiveService.selectedProduct
      this.getIntialSpecList(this.userSelectedProducts);
      this.productAttributeComposition();

    } else if (this.productAttributesCheck === 'Flow Diagrams') {
      this.primaryInformtionTypes = false;
      this.ghsLabeling = false;
      this.structureAndFormulaTypes = false;
      this.compositionTypes = false;
      this.flowDiagrams = true;
      this.productAttributeFlowdiagram()
    }
  }

  //Composition API Call
  compositionProcess(value) {
    console.log(value);
    this.compostionCheck = value;
    if (this.compostionCheck === 'Legal Composition') {
      this.compositionLegalTypes = true;
      this.compositionSHI = false;
      this.productAttributeAPIData = [];
      this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
      console.log(this.selectedSpecList);
      this.CategoryDetails = { index: 0, Category: "Composition", Subcategory: "Legal Composition" }
      this.productAttributeAPIData.push({
        'Spec_id': this.selectedSpecList,
        'Category_details': this.CategoryDetails,
      });
      console.log(this.productAttributeAPIData)
      this.momentiveService.getProductAttributes(this.productAttributeAPIData).subscribe(data => {
        console.log(data);
        this.productdata = data;
        this.compositionlocations = this.productdata;
        console.log(this.compositionlocations);
      });

    } else if (this.compostionCheck === 'Standard, 100 % & INCI Composition') {
      this.compositionLegalTypes = false;
      this.compositionSHI = true;
      this.productAttributeAPIData = [];
      this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
      this.CategoryDetails = { index: 0, Category: "Composition", Subcategory: "Standard, 100 % & INCI Composition" }
      this.productAttributeAPIData.push({
        'Spec_id': this.selectedSpecList,
        'Category_details': this.CategoryDetails,
      });
      console.log(this.productAttributeAPIData)
      this.momentiveService.getProductAttributes(this.productAttributeAPIData).subscribe(data => {
        console.log(data);
        this.productdata = data;
        this.compositionlocations = this.productdata;
        console.log(this.compositionlocations);
      });
    }

  }

  //Legal Composition API call
  SubLevelComposition(value) {
    this.productAttributeAPIData = [];
    this.compositionDataLevel = true;
    console.log(value);
    this.subLevelData = value;
    this.selectedSpecList = this.firstSpecData;
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    this.CategoryDetails = { Subcategory: this.compostionCheck, validity: this.subLevelData }
    this.productAttributeAPIData.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails
    });
    console.log(this.productAttributeAPIData);
    this.momentiveService.getProductAttributes(this.productAttributeAPIData).subscribe(data => {
      console.log(data);
      this.productdata = data;
      this.compositionStandardData = this.productdata;
      this.legalCompositionData = this.productdata.legal_composition;
      this.SVT_table = this.productdata.svt;
    });

    if (this.compostionCheck === "Legal Composition" && this.subLevelData === 'REACH: REG_REACH') {
      this.svtCompositionLevel = true;
    } else {
      this.svtCompositionLevel = false;
    }
  }

  //Table Sort functionality
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

  getAddressData() {
    this.momentiveService.getSearchData().subscribe(data => {
      this.product_Name = data;
      console.log(this.product_Name);
    }, err => {
      console.error(err);
    });
  }


  //SVT table Export Excel
  exportToSVTTableExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.SVTtable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'SVTtable.xlsx');
  }
  // Standard Table Export Excel
  exportToStandardCompostionExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.StandardCompositiontable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'StandardCompositiontable.xlsx');
  }

  //Legal Table Export Excel
  exportToLegalCompostionExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.LegalCompositiontable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'LegalCompositiontable.xlsx');
  }


  //SpecID Intial Droopdownlist
  getIntialSpecList(data) {
    const SpecListedData = data;
    console.log(SpecListedData);
    this.momentiveService.getSpecList(SpecListedData).subscribe(data => {
      console.log(data)
      this.SPECdropdownList = data;
      this.SpecListDetails = this.SPECdropdownList;
      // set initial selection
      this.specList.setValue(this.SpecListDetails[0]);

      this.firstSpecData = this.specList.setValue(this.SpecListDetails[0]);
      // load the initial speclist list
      this.filteredspecList.next(this.SpecListDetails.slice());
      // listen for search field value changes
      this.specFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
          this.filterSPECListMulti();
        });
      console.log(this.SPECdropdownList);
    }, err => {
      console.log(err);
    })
  }


  selectedTopSpecList() {
    console.log(this.specList.value);
    this.sideSpecList = this.specList.value;
    console.log(this.sideSpecList);
    this.toastr.successToastr('Specification ID Selected.', 'Success!');
  }


  ngAfterViewInit() {
    this.setInitialValue();
  }


  //Sets the initial value after the filteredspecList are loaded initially
  protected setInitialValue() {
    this.filteredspecList
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // this.multiSelect.compareWith = (a: speclist, b: speclist) => a && b && a.id === b.id;
      });
  }

  //Fileter the SpecList
  protected filterSPECListMulti() {
    if (!this.SpecListDetails) {
      return;
    }
    let search = this.specFilterCtrl.value;
    console.log(search)
    if (!search) {
      this.filteredspecList.next(this.SpecListDetails.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredspecList.next(
      this.SpecListDetails.filter(speclist => speclist.name.toLowerCase().indexOf(search) > -1)
    );
  }
}
