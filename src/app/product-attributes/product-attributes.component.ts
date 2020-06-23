import { Component, OnInit, ViewChild, ElementRef, Input, ViewContainerRef } from '@angular/core';
import { Attribute, IfStmt } from '@angular/compiler';
import { MatTableDataSource } from '@angular/material';
import { TableModule } from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { MomentiveService } from '../service/momentive.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material/select';
import * as xlsx from 'xlsx';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DomSanitizer } from '@angular/platform-browser';
import { GhsLabelingPipe } from '../pipes/ghs-labeling.pipe';
import { element } from 'protractor';
import { SvtCompositionFilterPipe } from '../pipes/svt-composition-filter.pipe';
import { LegalCompositionFilterPipe } from '../pipes/legal-composition-filter.pipe';
import { StdCompositionFilterPipe } from '../pipes/std-composition-filter.pipe';


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
  cols: any = [];
  legalProducts: any = [];
  selectedlegalProducts: any = [];
  selectedColumns: any = [];

  // GHS Labeling
  ghsLabelingData: any = [];
  copyghsLabelingData: any = [];
  ghsLabelingHeader: any = [];
  selectedLabelingProducts: any = [];
  selectedLabelingColumns: any = [];
  legalpaginator = false;
  private colsTempor: any = [];
  public columnOptions: any = [];
  searchGHSText: any;

  // Composition Data
  legalCompositionData: any = [];
  legalCompositionHead: any = [];
  selectedlegalCompositionProducts: any = [];
  hunderedCompositionHead: any = [];
  hunderedCompositionData: any = [];
  copyhunderedCompositionData: any = [];
  selectedhunderedCompositionProducts: any = [];
  standardCompositionHead: any = [];
  standardCompositionData: any = [];
  copystandardCompositionData: any = [];
  copylegalCompositionData: any = [];
  selectedStandardCompositionProducts: any = [];
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
  legalUsageData: any = []
  sideSpecList: any = [];
  specCompData: any = [];
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
  CompProductLevel: any = [];
  allMaterialLevel: any = [];
  activeMaterial: any = [];
  firstSpecData: any;
  compositionRating: any;
  notFoundComposition: any;
  compositionlocations: any = [];
  copyExcelGhsLabelingData: any = [];
  compositionDataLevel: boolean = true
  compositionStandardData: any = [];
  standardUsageData: any = [];
  compistionSpecArray: any = [];
  selectedValue: string;
  imgaePreviewUrl: any;
  moleclularWeightDetailDataPage: any;
  filename: any;
  Extract_Result: any;
  searchGhsLabelText: any;
  pdfUrl: any;
  Url: any;
  isDesc: boolean = false;
  columnName: any;
  usagePart: any;
  selectedUsage: string = "Public";
  usageTypes: any;
  usageBaseData: any;
  sortDir = 1;//1= 'ASE' -1= DSC
  molecularweightDetailsPage: any;
  categorizeArrayData: any = [];
  productLevelCategoy: any = [];
  materialLevelCategoy: any = [];
  casLevelCategoy: any = [];
  productAttributeChemicalStructures: any = [];
  productAttributemolecular_Formula: any = [];
  productAttributemolecular_Weight: any = [];
  structureFormulaCheck: any = [];
  chemiaclSection: boolean = true;
  formulaSection: boolean = false;
  weightSection: boolean = false;
  searchStandardCompositionText: string = '';
  searchLegalComposition: string = '';
  searchSVTComposition: string = '';

  chemicalStructureproductLevel: any = [];
  chemicalStructurematerialLevel: any = [];
  chemicalStructurecasLevel: any = [];

  molecularFormulaProductLevel: any = [];
  molecularFormulaMaterialLevel: any = [];
  molecularFormulaCasLevel: any = [];
  molecularWeightProductLevel: any = [];
  molecularWeightMaterialLevel: any = [];
  molecularWeightCasLevel: any = [];


  ManufractureDiagramProductLevel: any = [];
  ManufractureDiagramMaterialLevel: any = [];
  ManufractureDiagramCasLevel: any = [];
  SynthesisDiagramProductLevel: any = [];
  SynthesisDiagramMaterialLevel: any = [];
  SynthesisDiagramCasLevel: any = [];
  compositionMaterialDataHead: any = [];
  exportGhsLabelingDatas: any = [];
  structureFormulaCheckData = "Chemical Structure"
  flowDiagramCheck: any = [];
  flowDiagramCheckData = "Manufacturing Flow Diagram";
  showImage: boolean;
  showPdf: boolean
  tableHeight: boolean = false;
  topcheckedData: boolean = true;
  ManufractureSection: boolean = true
  synthesisSection: boolean = false;
  contentHeight: boolean = false;
  intiallocationDetails: any;
  compDataCheck: any
  compositionslocations: any = []
  /** control for the selected speclist */
  public specListData: FormControl = new FormControl();
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
  @ViewChild('ghsTable', { static: false }) ghsTable: ElementRef;
  addcomposition: FormGroup;
  validityComposition: FormGroup;

  copyExcelstandardCompositionData: any = [];
  copySVTCompositionData: any = [];
  copyExcelSVTCompositionData: any = [];
  copyLegalCompositionData: any = [];
  copyExcelLegalCompositionData: any = [];
  chemicalStructurecasLevelHead: any = [];
  molecularFormulaCasLevelHead: any = [];
  molecularWeightCasLevelHead: any = [];
  ManufractureDiagramCasLevelHead: any = [];
  SynthesisDiagramCasLevelHead: any = [];

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
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer, private fb: FormBuilder, private router: Router, private momentiveService: MomentiveService,
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
    this.contentHeight = false;
    this.momentiveService.notifyCheckObservable$.subscribe(value => {
      console.log(value);
      this.topcheckedData = value;
      this.contentHeight = !this.contentHeight;
    })


    this.addcomposition = this.fb.group({
      selectedComposition: new FormControl('')
    });
    this.validityComposition = this.fb.group({
      selectedRegionlocation: new FormControl('')
    })


  }
  ngOnInit() {

    //Modal box Resizeable and Draggable code
    $('.modal-content').resizable({
      alsoResize: ".modal-dialog",
      handles: 'e, w',
    });
    $("#lightbox").draggable();
    $('#lightbox').on('hidden.bs.modal', function (e) {
      if (!($('.modal.in').length)) {
        $('#lightbox').css({
          top: 0,
          left: 0,
        });
      }

      $('.modal-content').removeAttr('style');
      $('.modal-dialog').removeAttr('style');
    });


    $(".wmd-view-topscroll").scroll(function () {
      $(".wmd-view")
        .scrollLeft($(".wmd-view-topscroll").scrollLeft());
    });
    $(".wmd-view").scroll(function () {
      $(".wmd-view-topscroll")
        .scrollLeft($(".wmd-view").scrollLeft());
    });


    //Report Data Header
    this.compositionMaterialDataHead = [
      { "field": "real_Spec_Id", "header": "Real Specification-NamProd", "display": 'none' },
      { "field": "material_Number", "header": "Material Number", "display": 'true' },
      { "field": "description", "header": "Material Description", "display": 'true' },
      { "field": "bdt", "header": "Basic Data Text", "display": 'true' },
    ]

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




    this.usagePart = [{
      "type": "Public",
      "value": "Public"
    }, {
      "type": "All Usage",
      "value": "All Usage"
    }],

      this.structureFormulaCheck = [
        {
          "name": "Chemical Structure",
          "value": "chemical Structure"
        },
        {
          "name": "Molecular Formula",
          "value": "Molecular Formula"
        },
        {
          "name": "Molecular weight",
          "value": "Molecular Weight"
        }]

    this.flowDiagramCheck = [{
      "name": "Manufacturing Flow Diagram",
      "value": "Manufacturing Flow Diagram"
    },
    {
      "name": "Synthesis Diagram",
      "value": "Synthesis Diagram"
    }
    ]
    //GHS Labeling Table header
    this.ghsLabelingDataHeader = [
      { "field": "spec_Id", "header": "Specification Id-NAM Prod" },
      { "field": "regulatory_Basis", "header": "Regulatory Basis" },
      { "field": "usage", "header": "Usage" },
      { "field": "symbols", "header": "Symbols" },
      { "field": "signal_Word", "header": "Signal Word" },
      { "field": "hazard_Statements", "header": "Hazard Statements" },
      { "field": "prec_Statements", "header": "Precautionary Statement General" },
      { "field": "prstd", "header": "Precautionary Statement Disposal" },
      { "field": "prstp", "header": "Precautionary Statement Prevention" },
      { "field": "prstr", "header": "Precautionary Statement Response" },
      { "field": "prsts", "header": "Precautionary Statement Storage" },
      { "field": "additional_Information_remarks", "header": "Additional Information / Remarks", "width": "20%" }
    ],



      this.chemicalStructurecasLevelHead = [

        { "field": "spec_Id", "header": "Specification ID" },
        { "field": "productName", "header": "Identifier" },
        { "field": "product_Type", "header": "Identifier Category/Type" },
        { "field": "standardComposition", "header": "Standard Composition" },
        { "field": "legalComposition", "header": "Legal Composition" },
        { "field": "file_Source", "header": "File Source" },
        { "field": "fileName", "header": "CAS Diagram" }
      ],
      this.molecularFormulaCasLevelHead = [
        { "field": "spec_Id", "header": "Specification ID" },
        { "field": "productName", "header": "Identifier" },
        { "field": "product_Type", "header": "Identifier Category/Type" },
        { "field": "standardComposition", "header": "Standard Composition" },
        { "field": "legalComposition", "header": "Legal Composition" },
        { "field": "file_Source", "header": "File Source" },
        { "field": "fileName", "header": "CAS Diagram" }
      ],
      this.molecularWeightCasLevelHead = [
        { "field": "spec_Id", "header": "Specification ID" },
        { "field": "productName", "header": "Identifier" },
        { "field": "product_Type", "header": "Identifier Category/Type" },
        { "field": "standardComposition", "header": "Standard Composition" },
        { "field": "legalComposition", "header": "Legal Composition" },
        { "field": "file_Source", "header": "File Source" },
        { "field": "fileName", "header": "File Name" }
      ],
      this.ManufractureDiagramCasLevelHead = [
        { "field": "spec_Id", "header": "Specification ID" },
        { "field": "productName", "header": "Identifier" },
        { "field": "product_Type", "header": "Identifier Category/Type" },
        { "field": "standardComposition", "header": "Standard Composition" },
        { "field": "legalComposition", "header": "Legal Composition" },
        { "field": "file_Source", "header": "File Source" },
        { "field": "fileName", "header": "File Name" }
      ],
      this.SynthesisDiagramCasLevelHead = [
        { "field": "spec_Id", "header": "Specification ID" },
        { "field": "productName", "header": "Identifier" },
        { "field": "product_Type", "header": "Identifier Category/Type" },
        { "field": "standardComposition", "header": "Standard Composition" },
        { "field": "legalComposition", "header": "Legal Composition" },
        { "field": "file_Source", "header": "File Source" },
        { "field": "fileName", "header": "File Name" }
      ]
    this.compositionDataLevel = true;
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
      'product_Level': this.momentiveService.getProductLevelDetails(),
      'Mat_Level': this.momentiveService.getMaterialLevelDetails(),
      'CAS_Level': this.momentiveService.getCasLevelDetails(),
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
          this.potentialAPPData = false;
          this.PotentialApplicationDetails = this.primaryProductApplication;
          this.categorizeProductType(this.PotentialApplicationDetails);
        } else {
          this.potentialAPPData = true;
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
  productAttributeGHSLabeling(labeldata) {
    let usageValue = labeldata;
    this.ProductAttributeLoader = true;
    this.productAttributeAPIData = [];
    this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
    console.log(this.selectedSpecList);
    this.CategoryDetails = { index: 1, Category: "Product Attributes", Subcategory: "GHS Labeling" }
    this.productAttributeAPIData.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': this.CategoryDetails,
      'product_Level': this.momentiveService.getProductLevelDetails(),
      'Mat_Level': this.momentiveService.getMaterialLevelDetails(),
      'CAS_Level': this.momentiveService.getCasLevelDetails(),
    });
    console.log(this.productAttributeAPIData)
    this.momentiveService.getProductAttributes(this.productAttributeAPIData).subscribe(data => {
      console.log(data);
      this.productdata = data;
      console.log(this.productdata);
      if (this.productdata[0].ghs_Labeling.length > 0) {
        this.ProductAttributeLoader = false;
        this.pihAlertMessage = false;
        if (usageValue == 'Public') {
          this.ghsLabelingHeader = this.ghsLabelingDataHeader;
          this.usageBaseData = this.productdata[0].ghs_Labeling
          this.ghsLabelingData = this.usageBaseData.filter(element =>
            element.usage.includes('PUBLIC'));
          console.log(this.ghsLabelingData);
          this.copyghsLabelingData = JSON.parse(JSON.stringify(this.ghsLabelingData));
          console.log(this.copyghsLabelingData)
        }
        else if (usageValue == 'All') {
          this.ghsLabelingHeader = this.ghsLabelingDataHeader;
          this.ghsLabelingData = this.productdata[0].ghs_Labeling;
          this.copyghsLabelingData = JSON.parse(JSON.stringify(this.ghsLabelingData));
          console.log(this.copyghsLabelingData)
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


  //Dropdown select Function
  selectUsageType(value) {
    console.log(value);
    this.usageTypes = value;
    if (this.usageTypes === 'Public') {
      this.productAttributeGHSLabeling('Public');
    } else if (this.usageTypes === 'All Usage') {
      this.productAttributeGHSLabeling('All');
    }
  }
  //Composition Product and material Level Details
  productAttributeComposition() {
    this.ProductAttributeLoader = true;
    this.pihAlertMessage = false;
    this.productAttributeAPIData = [];

    this.CategoryDetails = { index: 3, Category: "Product Attributes", Subcategory: "Composition" }
    console.log(this.CategoryDetails);
    this.productAttributeAPIData.push({
      'Spec_id': this.specCompData,
      'Category_details': this.CategoryDetails,
      'product_Level': this.momentiveService.getProductLevelDetails(),
      'Mat_Level': this.momentiveService.getMaterialLevelDetails(),
      'CAS_Level': this.momentiveService.getCasLevelDetails(),
    });
    console.log(this.productAttributeAPIData)
    this.momentiveService.getProductAttributes(this.productAttributeAPIData).subscribe(data => {
      console.log(data);
      this.productData = data;
      this.CompProductLevel = this.productData[0].product_Level;
      this.productLevelDetails = this.CompProductLevel[0];

      this.allMaterialLevel = this.productData[0].all_material;
      this.allMaterialLevel.forEach(element => {
        element.material_Number = parseInt(element.material_Number);
      });
      this.activeMaterial = this.productData[0].active_material
      this.activeMaterial.forEach(element => {
        element.material_Number = parseInt(element.material_Number);
      });

      this.addcomposition.get('selectedComposition').setValue('Standard, 100 % & INCI Composition');
      this.compDataCheck = this.addcomposition.get('selectedComposition').value;
      if (this.compDataCheck == 'Standard, 100 % & INCI Composition') {

        this.compositionSHI = true;
        this.compositionLegalTypes = false;
        this.svtCompositionLevel = false;
      } else {
        this.compositionSHI = false;
        this.compositionLegalTypes = true;
        this.svtCompositionLevel = true;
      }


      this.compositionlocations = JSON.parse(JSON.stringify(this.productData[0].std_hund_usage));
      this.legalCompositionData = JSON.parse(JSON.stringify(this.productData[0].legal_values.legal_composition));
      this.SVT_table = JSON.parse(JSON.stringify(this.productData[0].legal_values.svt));

      this.copyLegalCompositionData = JSON.parse(JSON.stringify(this.legalCompositionData));
      this.copySVTCompositionData = JSON.parse(JSON.stringify(this.SVT_table));
      console.log(this.SVT_table);
      console.log(this.compositionlocations);

      this.validityComposition.get('selectedRegionlocation').setValue(this.compositionlocations[0].name);
      this.compositionStandardData = JSON.parse(JSON.stringify(this.productData[0].std_values));
      this.copystandardCompositionData = JSON.parse(JSON.stringify(this.compositionStandardData));

      console.log(this.compositionStandardData);
      // if(this.compositionStandardData.length > 0) {
      //   this.svtCompositionLevel = true;
      // } else {
      //   this.svtCompositionLevel = false;
      // }
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
      'product_Level': this.momentiveService.getProductLevelDetails(),
      'Mat_Level': this.momentiveService.getMaterialLevelDetails(),
      'CAS_Level': this.momentiveService.getCasLevelDetails(),
    });
    console.log(this.productAttributeAPIData)
    this.momentiveService.getProductAttributes(this.productAttributeAPIData).subscribe(data => {
      console.log(data);
      this.productdata = data;
      this.productAttributeStructures = this.productdata;
      console.log(this.productAttributeStructures);
      this.productAttributeChemicalStructures = this.productAttributeStructures[0].chemical_Structure;
      this.productAttributemolecular_Formula = this.productAttributeStructures[1].molecular_Formula;
      console.log(this.productAttributemolecular_Formula);
      this.productAttributemolecular_Weight = this.productAttributeStructures[2].molecular_Weight;
      if ((this.productAttributeChemicalStructures.length > 0) || (this.productAttributemolecular_Formula.length > 0) || (this.productAttributemolecular_Weight.length > 0)) {
        this.ProductAttributeLoader = false;
        this.pihAlertMessage = false;
        this.productAttributeStructures = this.productdata;
        console.log(this.productAttributeStructures);
        this.chemicalStructureTable = this.productAttributeChemicalStructures;


        this.chemicalStructureTable.forEach(element => {
          this.chemicalStructurematerialLevel = [];
          this.chemicalStructureproductLevel = [];
          this.chemicalStructurecasLevel = [];
          if (element.product_Type == 'BDT' || element.product_Type == 'MATNBR') {
            this.chemicalStructurematerialLevel.push(element);
            console.log(this.chemicalStructurematerialLevel);
          }
          else if (element.product_Type == 'NAMPROD' || element.product_Type == 'NAMSYN' || element.product_Type == 'REALSPEC') {
            this.chemicalStructureproductLevel.push(element);
            console.log(this.chemicalStructureproductLevel);
          }
          else if (element.product_Type == 'NUMCAS' || element.product_Type == 'CHEMICAL' || element.product_Type == 'PURESPEC') {
            this.chemicalStructurecasLevel.push(element);
            console.log(this.chemicalStructurecasLevel);
          }
        })

        this.molecularFormulaTable = this.productAttributemolecular_Formula;
        console.log(this.molecularFormulaTable);
        this.molecularFormulaMaterialLevel = [];
        this.molecularFormulaProductLevel = [];
        this.molecularFormulaCasLevel = [];
        this.molecularFormulaTable.forEach(element => {
          if (element.product_Type == 'BDT' || element.product_Type == 'MATNBR') {
            this.molecularFormulaMaterialLevel.push(element);
            console.log(this.molecularFormulaMaterialLevel);
          }

          else if (element.product_Type == 'NUMCAS' || element.product_Type == 'CHEMICAL' || element.product_Type == 'PURESPEC') {
            this.molecularFormulaCasLevel.push(element);
          }
          else if (element.product_Type == 'NAMPROD' || element.product_Type == 'NAMSYN' || element.product_Type == 'REALSPEC') {
            this.molecularFormulaProductLevel.push(element);
            console.log(this.molecularFormulaProductLevel);
          }
        })

        this.molecularWeightTable = this.productAttributemolecular_Weight;
        this.molecularWeightMaterialLevel = [];
        this.molecularWeightProductLevel = [];
        this.molecularWeightCasLevel = [];
        this.molecularWeightTable.forEach(element => {
          if (element.product_Type == 'BDT' || element.product_Type == 'MATNBR') {
            this.molecularWeightMaterialLevel.push(element);
            console.log(this.molecularWeightMaterialLevel);
          }
          else if (element.product_Type == 'NAMPROD' || element.product_Type == 'NAMSYN' || element.product_Type == 'REALSPEC') {
            this.molecularWeightProductLevel.push(element);
            console.log(this.molecularWeightProductLevel);
          }
          else if (element.product_Type == 'NUMCAS' || element.product_Type == 'CHEMICAL' || element.product_Type == 'PURESPEC') {
            this.molecularWeightCasLevel.push(element);
            console.log(this.molecularWeightCasLevel);
          }
        })
      }
      else {
        this.pihAlertMessage = true;
        this.ProductAttributeLoader = false;
      }

    }, err => {
      console.error(err);
    });

  }

  molecularWeightDocumentPage(data) {
    this.moleclularWeightDetailDataPage = true;
    console.log(data);
    this.molecularweightDetailsPage = data;
    console.log(this.molecularweightDetailsPage);
    this.filename = this.molecularweightDetailsPage.fileName;
    this.Extract_Result = this.molecularweightDetailsPage.moelcular_Weight;
    this.pdfUrl = this.molecularweightDetailsPage.file_Path;
    console.log(this.pdfUrl);
    this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl);
    console.log(this.Url);
  }
  backTostructurePage() {
    this.moleclularWeightDetailDataPage = false;
    this.structureFormulaCheckData = 'Molecular weight'
  }

  onChangeStructureFormula(item) {
    if (item == 'Chemical Structure') {
      this.chemiaclSection = true;
      this.formulaSection = false;
      this.weightSection = false;

    } else if (item == 'Molecular Formula') {
      this.chemiaclSection = false;
      this.formulaSection = true;
      this.weightSection = false;

    } else if (item == 'Molecular weight') {
      this.chemiaclSection = false;
      this.formulaSection = false;
      this.weightSection = true;

    }
  }


  onChangeFlowDiagram(item) {
    if (item == 'Manufacturing Flow Diagram') {
      this.ManufractureSection = true;
      this.synthesisSection = false;

    } else if (item == 'Synthesis Diagram') {
      this.ManufractureSection = false;
      this.synthesisSection = true;
    }
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
      'product_Level': this.momentiveService.getProductLevelDetails(),
      'Mat_Level': this.momentiveService.getMaterialLevelDetails(),
      'CAS_Level': this.momentiveService.getCasLevelDetails(),
    });
    console.log(this.productAttributeAPIData)
    this.momentiveService.getProductAttributes(this.productAttributeAPIData).subscribe(data => {
      console.log(data);
      this.productdata = data;
      console.log(this.productdata);
      this.basicDetailsproducts = this.productdata;
      this.ManufractureDiagramCheck = this.basicDetailsproducts[0].manufacture_Flow;
      this.SynthesisDiagramCheck = this.basicDetailsproducts[1].synthesis_Diagram;
      if (this.ManufractureDiagramCheck.length > 0 || this.SynthesisDiagramCheck.length > 0) {
        this.ProductAttributeLoader = false;
        this.pihAlertMessage = false;
        if (this.ManufractureDiagramCheck.length > 0) {
          this.ManufractureDiagramPart = true;
          this.ManufractureDiagram = this.ManufractureDiagramCheck;
          this.ManufractureDiagramMaterialLevel = [];
          this.ManufractureDiagramProductLevel = [];
          this.ManufractureDiagramCasLevel = [];
          this.ManufractureDiagram.forEach(element => {
            if (element.product_Type == 'BDT' || element.product_Type == 'MATNBR') {
              this.ManufractureDiagramMaterialLevel.push(element);
            }
            else if (element.product_Type == 'NAMPROD' || element.product_Type == 'NAMSYN' || element.product_Type == 'REALSPEC') {
              this.ManufractureDiagramProductLevel.push(element);
            }
            else if (element.product_Type == 'NUMCAS' || element.product_Type == 'CHEMICAL' || element.product_Type == 'PURESPEC') {
              this.ManufractureDiagramCasLevel.push(element);
            }
          })

        } else {
          this.ManufractureDiagramPart = false;
        }
        this.SynthesisDiagramCheck = this.basicDetailsproducts[1].synthesis_Diagram;
        if (this.SynthesisDiagramCheck.length > 0) {
          this.SynthesisDiagramPart = true;
          this.SynthesisDiagram = this.SynthesisDiagramCheck;
          this.SynthesisDiagramMaterialLevel = [];
          this.SynthesisDiagramProductLevel = [];
          this.SynthesisDiagramCasLevel = [];
          this.SynthesisDiagram.forEach(element => {
            if (element.product_Type == 'BDT' || element.product_Type == 'MATNBR') {
              this.SynthesisDiagramMaterialLevel.push(element);
            }
            else if (element.product_Type == 'NAMPROD' || element.product_Type == 'NAMSYN' || element.product_Type == 'REALSPEC') {
              this.SynthesisDiagramProductLevel.push(element);
            }
            else if (element.product_Type == 'NUMCAS' || element.product_Type == 'CHEMICAL' || element.product_Type == 'PURESPEC') {
              this.SynthesisDiagramCasLevel.push(element);
            }
          })
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
      this.productAttributeGHSLabeling('Public');
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
      this.compositionlocations = [];
      this.legalCompositionData = [];
      this.compositionStandardData = [];

      this.getIntialSpecList();
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
    this.searchLegalComposition = "";
    this.searchSVTComposition = "";
    this.searchStandardCompositionText = "",
      console.log(value);
    this.compositionlocations = [];
    this.compostionCheck = value;
    if (this.compostionCheck === 'Legal Composition') {
      this.compositionLegalTypes = true;
      this.compositionSHI = false;
      this.productAttributeAPIData = [];
      this.CategoryDetails = { index: 0, Category: "Composition", Subcategory: "Legal Composition" }
      this.productAttributeAPIData.push({
        'Spec_id': this.specCompData,
        'Category_details': this.CategoryDetails,
        'product_Level': this.momentiveService.getProductLevelDetails(),
        'Mat_Level': this.momentiveService.getMaterialLevelDetails(),
        'CAS_Level': this.momentiveService.getCasLevelDetails(),
      });
      console.log(this.productAttributeAPIData)
      this.momentiveService.getProductAttributes(this.productAttributeAPIData).subscribe(data => {
        console.log(data);
        this.productdata = data;
        if (this.productdata != 0) {
          this.compositionRating = true;
          this.notFoundComposition = false;
          this.compositionlocations = this.productdata;
          console.log(this.compositionlocations);
          this.validityComposition.get('selectedRegionlocation').setValue(this.compositionlocations[0].name);
          this.legalCompositionData = JSON.parse(JSON.stringify(this.productData[0].legal_values.legal_composition));
          this.SVT_table = JSON.parse(JSON.stringify(this.productData[0].legal_values.svt));
          console.log(this.SVT_table);
          console.log(this.legalCompositionData);
          if (this.SVT_table.length > 0) {
            this.svtCompositionLevel = true;
          } else {
            this.svtCompositionLevel = false;
          }
        } else {
          this.compositionRating = false;
          this.notFoundComposition = true;
        }
      });

    } else if (this.compostionCheck === 'Standard, 100 % & INCI Composition') {
      this.compositionLegalTypes = false;
      this.svtCompositionLevel = false;
      this.compositionSHI = true;
      this.productAttributeAPIData = [];
      this.compositionlocations = [];
      // this.selectedSpecList = this.momentiveService.categorySelectedSPECList;
      this.CategoryDetails = { index: 0, Category: "Composition", Subcategory: "Standard, 100 % & INCI Composition" }
      this.productAttributeAPIData.push({
        'Spec_id': this.specCompData,
        'Category_details': this.CategoryDetails,
        'product_Level': this.momentiveService.getProductLevelDetails(),
        'Mat_Level': this.momentiveService.getMaterialLevelDetails(),
        'CAS_Level': this.momentiveService.getCasLevelDetails(),
      });
      console.log(this.productAttributeAPIData)
      this.momentiveService.getProductAttributes(this.productAttributeAPIData).subscribe(data => {
        console.log(data);
        this.productdata = data;
        if (this.productdata != 0) {
          this.compositionRating = true;
          this.notFoundComposition = false;
          this.compositionlocations = this.productdata;
          this.validityComposition.get('selectedRegionlocation').setValue(this.compositionlocations[0].name);
          this.compositionStandardData = JSON.parse(JSON.stringify(this.productData[0].std_values));
          this.copystandardCompositionData = JSON.parse(JSON.stringify(this.compositionStandardData));
          console.log(this.compositionlocations);
        } else {
          this.compositionRating = false;
          this.notFoundComposition = true;
        }
      });
    }

  }

  //Legal Composition API call
  SubLevelComposition(value) {
    this.searchLegalComposition = "";
    this.searchSVTComposition = "";
    this.productAttributeAPIData = [];
    this.legalCompositionData = [];
    this.compositionStandardData = [];
    this.SVT_table = [];
    this.compositionDataLevel = true;
    console.log(value);
    this.subLevelData = value;
    this.compostionCheck = this.addcomposition.get('selectedComposition').value;
    if (this.compostionCheck == 'Standard, 100 % & INCI Composition') {
      this.CategoryDetails = { Subcategory: this.compostionCheck, validity: this.subLevelData }
      this.productAttributeAPIData.push({
        'Spec_id': this.specCompData,
        'Category_details': this.CategoryDetails,
        'product_Level': this.momentiveService.getProductLevelDetails(),
        'Mat_Level': this.momentiveService.getMaterialLevelDetails(),
        'CAS_Level': this.momentiveService.getCasLevelDetails(),
      });
      console.log(this.productAttributeAPIData);
      this.momentiveService.getProductAttributes(this.productAttributeAPIData).subscribe(data => {
        console.log(data);
        this.productdata = data;
        this.compositionStandardData = this.productdata;
        this.copystandardCompositionData = JSON.parse(JSON.stringify(this.compositionStandardData));
        console.log(this.compositionStandardData);
      });
    }
    else {
      this.CategoryDetails = { Subcategory: this.compostionCheck, validity: this.subLevelData }
      this.productAttributeAPIData.push({
        'Spec_id': this.specCompData,
        'Category_details': this.CategoryDetails,
        'product_Level': this.momentiveService.getProductLevelDetails(),
        'Mat_Level': this.momentiveService.getMaterialLevelDetails(),
        'CAS_Level': this.momentiveService.getCasLevelDetails(),
      });
      console.log(this.productAttributeAPIData);
      this.momentiveService.getProductAttributes(this.productAttributeAPIData).subscribe(data => {
        console.log(data);
        this.productdata = data;
        this.compositionStandardData = this.productdata;
        this.legalCompositionData = this.productdata.legal_composition;
        this.copyLegalCompositionData = JSON.parse(JSON.stringify(this.legalCompositionData));
        if (this.compositionStandardData.svt.length > 0) {
          this.svtCompositionLevel = true;
          this.SVT_table = this.productdata.svt;
          this.copySVTCompositionData = JSON.parse(JSON.stringify(this.SVT_table));
          console.log(this.SVT_table)
        } else {
          this.svtCompositionLevel = false;
        }
      });
    }



    if (this.compostionCheck === "Legal Composition" && this.subLevelData === 'REACH: REG_REACH') {
      if (this.SVT_table.length > 0) {
        this.svtCompositionLevel = true;
        this.SVT_table = this.productdata.svt
      } else {
        this.svtCompositionLevel = false;
      }
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
  onSortClick(event, data) {
    let columndata = data;
    console.log(columndata);
    console.log(event);
    let target = event.currentTarget,
      classList = target.classList;

    if (classList.contains('fa-caret-up')) {
      classList.remove('fa-caret-up');
      classList.add('fa-caret-down');
      this.sortDir = -1;
    } else {
      classList.add('fa-caret-up');
      classList.remove('fa-caret-down');
      this.sortDir = 1;
    }
    this.GhsLabelsort(columndata);
  }
  GhsLabelsort(property) {
    this.isDesc = !this.isDesc; //change the direction    
    this.columnName = property;
    let direction = this.isDesc ? 1 : -1;

    this.ghsLabelingData.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      }
      else if (a[property] > b[property]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });
  };

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


  // exportToCompostionExcel(table, name) {
  //   var uri = 'data:application/vnd.ms-excel;base64,'
  //     , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
  //     , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
  //     , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
  //   if (!table.nodeType) table = document.getElementById(table)

  //   var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
  //   window.location.href = uri + base64(format(template, ctx))
  // }
  exportToCompostionExcel() {
    this.copyExcelstandardCompositionData = []
    console.log(this.StandardCompositiontable);
    this.copystandardCompositionData.forEach(element => {
      this.copyExcelstandardCompositionData.push({
        'Pure Specification Id': element.pure_spec_Id,
        'Real Specificaion Id': element.real_Spec_Id,
        'Cas Number': element.cas_Number,
        'Ingredient Name': element.ingredient_Name,
        'Standard Composition Component Type': element.std_Componant_Type,
        'Standard Composition  Value': element.std_value,
        'Standard Composition  Unit': element.std_unit,
        '100 % Composition Component Type': element.hundrd_Componant_Type,
        '100 % Composition value': element.hundrd_value,
        '100 % Composition Unit': element.hundrd_unit,
        'INCI Composition Component Type': element.inci_Componant_Type,
        'INCI Composition value & Unit': element.inci_value_unit,
      });
    });
    const ws: xlsx.WorkSheet =
      xlsx.utils.json_to_sheet(this.copyExcelstandardCompositionData);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'Standard Composition Table.xlsx');
  }
  exportToLegalExcel() {
    this.copyExcelLegalCompositionData = [];
    this.copyLegalCompositionData.forEach(element => {
      this.copyExcelLegalCompositionData.push({
        'Pure Specification Id': element.pure_spec_Id,
        'Real Specificaion Id': element.real_Spec_Id,
        'Cas Number': element.cas_Number,
        'Ingredient Name': element.ingredient_Name,
        'Legal Composition Component Type': element.legal_Componant_Type,
        'Legal Composition  Value': element.legal_value,
        'Legal Composition  unit': element.legal_unit
      });
    });
    const ws: xlsx.WorkSheet =
      xlsx.utils.json_to_sheet(this.copyExcelLegalCompositionData);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'Legal Composition Table.xlsx');
  }
  exportToSVTExcel() {
    this.copyExcelSVTCompositionData = [];
    this.copySVTCompositionData.forEach(element => {
      this.copyExcelSVTCompositionData.push({
        'Pure Specification Id': element.pure_spec_Id,
        'Real Specificaion Id': element.real_Spec_Id,
        'SVT LV - 2018': element.SVT_LV_eight,
        'SVT LV - 2019': element.SVT_LV_nine,
        'SVT LV - 2020': element.SVT_LV_twenty,
        'SVT LV Amount Limit in tonnes': element.amount_limit_SVT_LV,
        'SVT TE-2018': element.SVT_TE_eight,
        'SVT TE-2019': element.SVT_TE_nine,
        'SVT TE-2020': element.SVT_TE_Twenty,
        'SVT TE Amount Limit in tonnes': element.amount_limit_SVT_TE,
        'SVT AN-2018': element.SVT_AN_eight,
        'SVT AN-2019': element.SVT_AN_nine,
        'SVT AN-2020': element.SVT_AN_twenty,
        'SVT AN Amount Limit in tonnes': element.amount_limit_SVT_AN,
      });
    });
    const ws: xlsx.WorkSheet =
      xlsx.utils.json_to_sheet(this.copyExcelSVTCompositionData);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'SVT Table.xlsx');
  }

  exportToGhsLabelingExcel() {
    console.log(this.copyghsLabelingData);
    this.copyghsLabelingData.forEach(element => {
      if (element.symbols) {
        delete element.symbols;
      }
    })
    this.copyghsLabelingData.forEach(element => {
      this.copyExcelGhsLabelingData.push({
        'Specification Id': element.spec_Id,
        'Regulatory Basis': element.regulatory_Basis,
        'Signal word': element.signal_Word,
        'Symbols Text': element.symbols_Text,
        'Hazard statement': element.hazard_Statements,
        'Precautionary Statement General': element.prec_Statements,
        'Precautionary Statement Disposal': element.prstd,
        'Precautionary Statement Prevention': element.prstp,
        'Precautionary Statement Response': element.prstr,
        'Precautionary Statement Storage': element.prsts,
        'Additional Information Remarks': element.additional_Information_remarks,
        'Usage': element.usage,
      });
    });
    console.log(this.copyghsLabelingData)
    const ws: xlsx.WorkSheet =
      xlsx.utils.json_to_sheet(this.copyExcelGhsLabelingData);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'GhsLabeling.xlsx');
  }
  //SpecID Intial Droopdownlist
  getIntialSpecList() {

    this.SPECdropdownList = this.momentiveService.getCategorySpecList()
    this.SpecListDetails = this.SPECdropdownList;
    // set initial selection
    this.specListData.setValue(this.SpecListDetails[0]);

    this.firstSpecData = this.specListData.setValue(this.SpecListDetails[0]);
    // load the initial speclist list
    this.filteredspecList.next(this.SpecListDetails.slice());
    // listen for search field value changes
    this.specFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterSPECListMulti();
      });
    console.log(this.SPECdropdownList);

    this.specCompData.push(this.specListData.value);
    console.log(this.specCompData);
  }

  CompositionSpecChange(data) {
    console.log(data)
    this.specCompData = []
    this.specCompData.push(data);
    console.log(this.specCompData);
    this.productAttributeComposition();
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
  imagePreview(data, imageType) {

    $('#lightbox').on('shown.bs.modal', function () {
      $(this).find('.modal-dialog').addClass('modal-lg');
    });
    console.log(data);
    if (imageType == 'png') {
      this.showImage = true;
      this.showPdf = false;
      this.imgaePreviewUrl = data;
    } else if (imageType == 'pdf') {
      this.showPdf = true;
      this.showImage = false;
      this.imgaePreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data);
      console.log(this.imgaePreviewUrl);
    }

  }
  moreTableData() {
    this.tableHeight = !this.tableHeight;
  }

  categorizeProductType(productData) {
    this.materialLevelCategoy = [];
    this.productLevelCategoy = [];
    this.casLevelCategoy = [];

    this.categorizeArrayData = productData;
    this.categorizeArrayData.forEach(element => {
      if (element.product_Type == 'BDT' || element.product_Type == 'MATNBR') {
        this.materialLevelCategoy.push(element);
      }
      else if (element.product_Type == 'NAMPROD' || element.product_Type == 'NAMSYN' || element.product_Type == 'REALSPEC') {
        this.productLevelCategoy.push(element);
      }
      else if (element.product_Type == 'NUMCAS' || element.product_Type == 'CHEMICAL' || element.product_Type == 'PURESPEC') {
        this.casLevelCategoy.push(element);
      }
    })
    console.log(this.productLevelCategoy);
    console.log(this.materialLevelCategoy);
    console.log(this.casLevelCategoy);

  }

  DownloadProfilePic(data) {
    ;
    console.log(data);
    var url = data;
    window.open(url);
  }

}

