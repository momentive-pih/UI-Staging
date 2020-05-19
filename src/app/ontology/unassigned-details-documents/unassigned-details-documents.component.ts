import { Component, OnInit, ViewChild, ElementRef,ViewContainerRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { MomentiveService } from './../../service/momentive.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var $: any;
interface product_Name {
  name: string;
}

@Component({
  selector: 'app-unassigned-details-documents',
  templateUrl: './unassigned-details-documents.component.html',
  styleUrls: ['./unassigned-details-documents.component.css']
})
export class UnassignedDetailsDocumentsComponent implements OnInit {

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
  ontologyHeading:any;
  seletedOntologyDocumentKey:any;
  selectedProductKey:any;
  file: any;
  ontologyDocumetskey:any;
  copyOntologyExtractDocuments:any;
  copyOntologyDocuments:any;
  documentsProductKey:any;
  documentsProductKey_category:any;
  editedOntologyDocuments:any;
  pdfSrc: any;
  ontologyUnassignment:any=[];
  ontologyServiceDetails: any = [];
  unassignedExtractedData:any=[];
  selectedSpecList: any = [];
  unassignedIntialData:any;
  extractDocument:any;
  PIHpdfURL: any;
  unassignedUpdatedData:any =[];
  ontologyDocumentUpdatedData:any =[];
  ontologyUserUpdatedDetails:any=[];
  public items$: Observable<product_Name[]>;
  public input$ = new Subject<string | null>();
  @ViewChild('code', { static: false }) private codeRef?: ElementRef<HTMLElement>;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,public toastr: ToastrManager, vcr: ViewContainerRef,
    private router: Router, private sanitizer: DomSanitizer,
    private momentiveService: MomentiveService) {

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

    //Ontology Unassigned Documents API Call
    this.ontologyServiceDetails = [];
    this.ontologyServiceDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': { Category: "ontology", Subcategory: "unassigned" }
    });
    this.momentiveService.getOntologyDocumentss(this.ontologyServiceDetails).subscribe(data => {
      this.ontologyFileDocuments = data;
      this.ontologyProductsName = this.ontologyFileDocuments.filter((element) => (element.category === this.documentCategory));
      this.PDfOntology = this.ontologyProductsName[0][this.documentCategory].filter((element) => (element.id == this.documentId));
      if (this.PDfOntology) {
        console.log(this.PDfOntology);
        //this.extractedFields = this.ontologyPdfFileData[0].Extract_Field;
        this.extarctPDFData = this.PDfOntology[0].Extract_Field;
        console.log(this.extarctPDFData);
        this.copyOntologyExtractDocuments = JSON.parse(JSON.stringify(this.extarctPDFData));
        console.log(this.copyOntologyExtractDocuments);
        this.extractKeys = this.extarctPDFData.ontologyKey;
        this.extractProductKey = this.extractKeys.split(',');
        delete this.extarctPDFData.ontologyKey;
     
        console.log(this.extarctPDFData);
       
        this.extractProductKey.forEach(element => {
          this.keyselected.push({ name: element, product: 'Nam Prod' });
        });
        this.ontologyExtractKey = this.keyselected;
        // this.extractFieldsForm.controls.extractNamedetails.setValue( this.extarctPDFData);
      }
      this.filename = this.PDfOntology[0].fileName;
      this.productName = this.PDfOntology[0].productName;
      this.pdfUrl = this.PDfOntology[0].url;
      console.log(this.pdfUrl);
      this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl);
      console.log(this.Url);
    });


     // ontology Unasigned Key-value API Call
 // Product name

 this.momentiveService.getOntologyManagement().subscribe(data => {
  this.ontologyUnassignment = data;
  console.log(this.ontologyUnassignment);
  this.ontologyDocumetskey = this.ontologyUnassignment[0].product_Details
  console.log(this.ontologyDocumetskey);

}, err => {
  console.error(err);
});

    this.placeholder = 'Enter the Details';
    this.keyword = 'name';
    this.historyHeading = 'Recently selected';
  }

  //Search Related Functionality
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
  clearCheck(data) {
    console.log(data);
  }

  onFocused(data) {
    this.onChangeSearch(data);
  }
  submitProduct(data) {
    this.disabledkey = false;
  }
  createOwner(value) {
    console.log(value);
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

  //ontology unassigned Key-value Pair Search  function
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

  //Extract Function
  extractFields() {
    console.log(this.extractFieldsForm.value);
  }
  //Edit Function

  
  clearOntology() {
    this.extarctPDFData ={};
    delete this.extarctPDFData.ontologyKey;
    this.extarctPDFData = this.copyOntologyExtractDocuments
    console.log(this.extarctPDFData);
    this.copyOntologyExtractDocuments = JSON.parse(JSON.stringify(this.extarctPDFData));
    this.ontologyExtractKey = this.keyselected
    console.log(this.extarctPDFData);
  }

  onChangeData(data) {
    console.log(data);
    this.seletedOntologyDocumentKey = data;
    this.disabledCondition = false;
  }

  editOntology(data) {
    console.log(data);
    this.editedOntologyDocuments = this.PDfOntology;
    if (data) {
      this.disabledCondition = false;
      this.disabledkey = false;
    }
  }

  //Update Function
  updateOntology(data) {
    console.log(data);

    this.selectedProductKey = this.reactiveForm.get('Searchname').value;
    console.log(this.selectedProductKey);
    let update_Extract ={}
    if(this.selectedProductKey.length == 0){
      alert('Please select Product Key')
    } else if(this.selectedProductKey.length > 0 && this.selectedProductKey[0].name == 'No-key-value') {
     alert('Please select Product Key')
    } else {
     this.unassignedIntialData = JSON.parse(JSON.stringify(this.PDfOntology));
     console.log(this.unassignedIntialData);

     this.unassignedExtractedData.forEach(element =>
      {
        update_Extract [element.key] = element.value
      });
      console.log(update_Extract);
       this.unassignedUpdatedData.push({
        "ontology_Id":this.unassignedIntialData[0].sql_Id,
        "solr_Id": this.unassignedIntialData[0].solr_Id,
        'data_extract':this.unassignedIntialData[0].data_extract,
        "productName": this.seletedOntologyDocumentKey[0].name,
        "product_Key":this.seletedOntologyDocumentKey[0].type,
        "Extract_Field": update_Extract,
        "updated_By" : localStorage.getItem('userName')
      })
  
        console.log(this.unassignedUpdatedData);
        this.momentiveService.getontologyUpdatedDocuments(this.unassignedUpdatedData).subscribe(data => {
          console.log(data);
          let responseData = data
          if(responseData[0].status = 200) {
            this.toastr.successToastr('Ontology Unassigned Documents' +' '+ responseData[0].message, 'Success!');
          } else {
            this.toastr.warningToastr('Ontology Unassigned Documents' +' '+ responseData[0].message, 'warning!');
          }
       
          this.disabledkey = true;
          this.disabledCondition = true;
        })
       
    }

  
  }
  //Readonly Function
  ReadOntology(data) {
    console.log(data);
  }
  documentKey(data) {
    console.log(data);
    this.extractDocument = data;
    let idx = this.unassignedExtractedData.indexOf(this.extractDocument);
    console.log(idx);
    if(idx == -1){
     console.log(this.extractDocument);
      this.unassignedExtractedData.push(this.extractDocument);
      console.log(this.unassignedExtractedData);
   
    } 
   
      
    // let idx = this.unassignedExtractedData.indexOf(data.key == data.key)
    // if(idx == -1){
    //   this.unassignedExtractedData.push(data);
    //   console.log(this.unassignedExtractedData);
    // } else  {
    //     this.unassignedExtractedData.splice(idx,1);
    //     this.unassignedExtractedData.push(data);
    //     console.log(this.unassignedExtractedData);
    // }
  }
  backOntology() {
    this.router.navigate(['ontology/unassigned-documents']);
  }
  ontologyUserDetails() {
    this.ontologyDocumentUpdatedData = this.PDfOntology;
    this.ontologyHeading = this.ontologyDocumentUpdatedData[0].fileName;
    this.momentiveService.ontologyDocumnetsLogDetails({"id":this.ontologyDocumentUpdatedData[0].solr_Id}).subscribe(data =>{
      console.log(data);
      this.ontologyUserUpdatedDetails = data;
    })
 }
}
