import { Component, OnInit, ViewChild, ElementRef,ViewContainerRef } from '@angular/core';
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
  selector: 'app-ontology-documents',
  templateUrl: './ontology-documents.component.html',
  styleUrls: ['./ontology-documents.component.css']
})
export class OntologyDocumentsComponent implements OnInit {

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
  ontologyHeading:any;
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
  ontologyassignment:any=[];
  ontologyDocumetskey:any=[];
  selectedSpecList: any = []
  public items$: Observable<product_Name[]>;
  public input$ = new Subject<string | null>();
  @ViewChild('code', { static: false }) private codeRef?: ElementRef<HTMLElement>;

  seletedOntologyDocumentKey:any
  selectedProductKey:any
  editedOntologyDocuments:any
  documentsProductKey:any
  documentsProductKey_category:any
  unassignedExtractedData:any=[];
  unassignedIntialData:any =[];
  unassignedUpdatedData:any =[];
  copyOntologyExtractDocuments:any =[];
  ontologyDocumentUpdatedData:any=[];
  ontologyUserUpdatedDetails:any=[];

  constructor(private fb: FormBuilder, private route: ActivatedRoute,public toastr: ToastrManager, vcr: ViewContainerRef,
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
      'Category_details': { Category: "ontology", Subcategory: "assigned" },
      'product_Level':this.momentiveService.getProductLevelDetails(),
      'Mat_Level':this.momentiveService.getMaterialLevelDetails(),
      'CAS_Level':this.momentiveService.getCasLevelDetails(),

    });

    this.momentiveService.getOntologyDocumentss(this.ontologyServiceDetails).subscribe(data => {
      this.ontologyFileDocuments = data;
      this.ontologyProductsName = this.ontologyFileDocuments.filter((element) => (element.category === this.documentCategory));
      this.PDfOntology = this.ontologyProductsName[0][this.documentCategory].filter((element) => (element.id == this.documentId));
      if (this.PDfOntology) {
        //this.extractedFields = this.ontologyPdfFileData[0].Extract_Field;
        this.extarctPDFData = this.PDfOntology[0].Extract_Field;
        this.copyOntologyExtractDocuments = JSON.parse(JSON.stringify(this.extarctPDFData));
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
      console.log(this.pdfUrl);
      // let SAS_token ='?sv=2019-02-02&ss=b&srt=sco&sp=rl&se=2020-05-29T20:19:29Z&st=2020-04-02T12:19:29Z&spr=https&sig=aodIg0rDPVsNEJY7d8AerhD79%2FfBO9LZGJdx2j9tsCM%3D';
      // let urlPDF = this.pdfUrl + SAS_token;
      this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl);
      console.log(this.Url);
    });

    // ONtology Key Pair Value Function
    this.momentiveService.getOntologyManagement().subscribe(data => {
      this.ontologyassignment = data;
      console.log(this.ontologyassignment);
      this.ontologyDocumetskey = this.ontologyassignment[0].product_Details
      console.log(this.ontologyDocumetskey);
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


  clearOntology() {
    this.extarctPDFData ={};
    delete this.extarctPDFData.ontologyKey;
    this.extarctPDFData = this.copyOntologyExtractDocuments
    console.log(this.extarctPDFData);
    this.copyOntologyExtractDocuments = JSON.parse(JSON.stringify(this.extarctPDFData));
    this.ontologyExtractKey = this.keyselected
    console.log(this.extarctPDFData);
  }
  //Ontology Key-value Pair Readonly Option
 


  //Ontology Update Functionality
  onChangeData(data) {
    console.log(data);
    this.seletedOntologyDocumentKey = data;
    this.disabledCondition = false;
  }

    //Ontology Edit Functionality
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
    this.unassignedIntialData = JSON.parse(JSON.stringify(this.PDfOntology));
    let update_Extract = {}
    console.log(this.unassignedIntialData);
    console.log(this.selectedProductKey);
    if(this.selectedProductKey.length) {
      if(this.PDfOntology[0].productName == this.selectedProductKey[0].name && this.PDfOntology.product_Key == this.selectedProductKey[0].type) {
        this.documentsProductKey = this.PDfOntology[0].productName;
        this.documentsProductKey_category = this.PDfOntology[0].product_Key;
      } else {
        this.documentsProductKey = this.seletedOntologyDocumentKey[0].name 
        this.documentsProductKey_category = this.seletedOntologyDocumentKey[0].type
      }
    } else {
      alert('Please Select Product')
    }
 
    this.unassignedExtractedData.forEach(element =>
      {
        update_Extract [element.key] = element.value
      });

      console.log(update_Extract);
      if(this.selectedProductKey.length) {
      this.unassignedUpdatedData.push({
        "ontology_Id":this.unassignedIntialData[0].sql_Id,
        "solr_Id": this.unassignedIntialData[0].solr_Id,
        'data_extract':this.unassignedIntialData[0].data_extract,
        "productName": this.documentsProductKey,
        "product_Key":this.documentsProductKey_category,
        "Extract_Field": update_Extract,
        "updated_By" : localStorage.getItem('userName')
        
      })
        console.log(this.unassignedUpdatedData);
        this.momentiveService.getontologyUpdatedDocuments(this.unassignedUpdatedData).subscribe(data => {
          console.log(data);

          let responseData = data
          if(responseData[0].status = 200) {
            
            this.toastr.successToastr('Ontology Assigned Documents'+' '+ responseData[0].message, 'Success!');
          } else {
            this.toastr.warningToastr('Ontology Assigned Documents' +' '+ responseData[0].message, 'warning!');
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
    let idx = this.unassignedExtractedData.indexOf(data);
    console.log(idx);
    if(idx == -1){
      this.unassignedExtractedData.push(data);
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
    this.router.navigate(['ontology']);
  }
  ontologyUserDetails() {
    this.ontologyDocumentUpdatedData = this.PDfOntology;
    this.ontologyHeading = this.ontologyDocumentUpdatedData[0].fileName
    this.momentiveService.ontologyDocumnetsLogDetails({"id":this.ontologyDocumentUpdatedData[0].solr_Id}).subscribe(data =>{
      console.log(data);
      this.ontologyUserUpdatedDetails = data;
    })
  }
}
