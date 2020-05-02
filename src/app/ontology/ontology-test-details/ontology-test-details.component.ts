import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { MomentiveService } from './../../service/momentive.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
interface product_Name {
  name: string;
}

@Component({
  selector: 'app-ontology-test-details',
  templateUrl: './ontology-test-details.component.html',
  styleUrls: ['./ontology-test-details.component.css']
})
export class OntologyTestDetailsComponent implements OnInit {

  sideSearchData: any;
  dateForm: FormGroup;
  name = '';
  selectednav: 'active';
  secondaryNavBar = false;
  placeholder: string;
  keyword: string;
  historyHeading: string;
  product_Name: any = [];
  reactiveForm: FormGroup;
  product_type: any = [];
  emptyProduct: string;
  value: string;
  type: string;
  items: string[];
  selectedIndex: number;
  selectedId: any;
  selectedboxId: any;
  product_NameData: any[];
  Searchname: any;
  // New Data;
  productdata: any = [];
  extractFieldsForm: FormGroup;
  documentId: any;
  PDfOntology: any = [];
  ontologyFileDocuments: any = [];
  ontologyNewDocuments: any = [];
  ontologyPdfDocument: any;
  filename: any;
  productName: any;
  pdfUrl: any;
  Url: any;
  extractedFields: any = [];
  documentCategory: any = [];
  ontologyPdfFileData: any = [];
  ontologyProductsName: any = [];
  Product_Id: any = [];
  extarctPDFData: any = [];
  Newitems: any = [];
  keyselected: any = [];
  disabledCondition = true;
  ontology_Lsr_key: any = [];
  extractProductKey: any = [];
  ontologyExtractKey: any = [];
  extractKeys: any = [];
  disabledkey = true;
  objectKeys = Object.keys;
  fileURL: any;
  file: any;
  pdfSrc: any;
  ontologyServiceDetails: any = [];
  selectedSpecList: any = []
  public items$: Observable<product_Name[]>;
  public input$ = new Subject<string | null>();
  @ViewChild('code', { static: false }) private codeRef?: ElementRef<HTMLElement>;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
    private router: Router, private sanitizer: DomSanitizer,
    private momentiveService: MomentiveService) {
      //Intial Page Load
    this.momentiveService.homeEvent.subscribe(data => {
      this.ngOnInit();
    });


    this.reactiveForm = fb.group({
      Searchname: ['', Validators.required]
    });

    this.extractFieldsForm = this.fb.group({
      extractNamedetails: [''],
    });

    this.items$ = this.input$.pipe(
      map((term) => this.searchProduct(term, this.product_Name))
    );


  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.documentId = params["document_id"];
      this.documentCategory = params["category_Name"];
      this.Product_Id = params["Product_Name"]
    });

    //ontology Documents List API Call
    this.ontologyServiceDetails = [];
    this.selectedSpecList = this.momentiveService.getCategorySpecList();
    this.ontologyServiceDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': { Category: "ontology", Subcategory: "assigned" }
    });

    this.momentiveService.getOntologyDocumentss(this.ontologyServiceDetails).subscribe(data => {
      this.ontologyFileDocuments = data;
      this.ontologyProductsName = this.ontologyFileDocuments.filter((element) => (element.category === this.documentCategory));
      this.PDfOntology = this.ontologyProductsName[0][this.documentCategory].filter((element) => (element.id == this.documentId));
      if (this.PDfOntology) {
        //this.extractedFields = this.ontologyPdfFileData[0].Extract_Field;
        this.extarctPDFData = this.PDfOntology[0].Extract_Field;
        this.extractKeys = this.extarctPDFData.ontologyKey;
        this.extractProductKey = this.extractKeys.split(',');
        delete this.extarctPDFData.ontologyKey;
        this.extractProductKey.forEach(element => {
          this.keyselected.push({ name: element, product: 'Nam Prod' });
        });
        this.ontologyExtractKey = this.keyselected;
        // this.extractFieldsForm.controls.extractNamedetails.setValue( this.extarctPDFData);
      }
      this.filename = this.PDfOntology[0].fileName;
      this.productName = this.PDfOntology[0].productName;
      this.pdfUrl = this.PDfOntology[0].url;
      // this.pdfSrc = 'https://clditdevstorpih.blob.core.windows.net/momentive-sources-pih/sharepoint-pih/toxicology-pih/studies-tox-team-pih/raw/-Y-12900' + this.pdfUrl;
      //  this.Url = this.sanitizer.bypassSecurityTrustUrl(this.pdfSrc);

      this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl);
      // this.file = new Blob([this.Url], { type: 'application/pdf' });
      // this.fileURL = URL.createObjectURL(this.file);
      console.log(this.fileURL);
      console.log(this.Url);
    });

    // ONtology Key Pair Value Function
    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.ontology_Lsr_key = this.productdata.Ontology_product_Name;
      console.log(this.productdata);
    }, err => {
      console.error(err);
    });
    this.placeholder = 'Enter the Details';
    this.keyword = 'name';
    this.historyHeading = 'Recently selected';
  }


  groupByFn = (item) => item.product;

  selectEvent(item) {
    console.log(item);
  }
  onChangeSearch(data) {
    if (data.length > 2) {
      console.log(data);
      this.product_NameData = this.product_Name.filter((ProductName) => (ProductName.includes(data)));
      console.log(this.product_NameData);
    }
  }
  
  //Search Field Clear Function
  clearCheck(data) {
    console.log(data);
  }
  onChangeData(data) {
    console.log(data);
    this.disabledCondition = false;
  }
  onFocused(data) {
    this.onChangeSearch(data);
  }

//Button Disable Function
  submitProduct(data) {
    this.disabledkey = false;
  }

  //Multiselect Keypair Value functionality
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

  //Key-value Pair Search Field Functions
  private searchProduct(term: string | null, arr): product_Name[] {
    const searchTerm = term ? term : '';
    if (searchTerm.length > 0) {
      return arr.filter((product_Name) => {
        return product_Name.name.toLowerCase().startsWith(searchTerm.toLowerCase());
      });
    }
  }

  intialSort() {
    return 0;
  }

  //Ontology Extract Field Functionality
  extractFields() {
    console.log(this.extractFieldsForm.value);
  }

  //Ontology Edit Functionality
  editOntology(data) {
    console.log(data);
    if (data) {
      this.disabledCondition = false;
      this.disabledkey = false;
    }
  }

  //Ontology Update Functionality
  updateOntology(data) {
    console.log(data);
    this.disabledkey = false;
  }

  //Ontology Key-value Pair Readonly Option
  ReadOntology(data) {
    console.log(data);
  }

  documentKey(data) {
    console.log(data);
  }
}

