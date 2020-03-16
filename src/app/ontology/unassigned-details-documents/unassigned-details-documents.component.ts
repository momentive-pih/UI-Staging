import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatDatepickerInputEvent} from '@angular/material/datepicker';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption} from '@ng-select/ng-select';
import { MomentiveService} from './../../service/momentive.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
// tslint:disable-next-line: class-name
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
  historyHeading: string ;
  // tslint:disable-next-line: variable-name
  product_Name: any = [];
  reactiveForm: FormGroup;
  // tslint:disable-next-line: variable-name
  product_type: any = [];
  // tslint:disable-next-line: variable-name
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
  ontologyExtractKey : any = [];
  extractKeys: any = [];
  disabledkey = true;
  objectKeys = Object.keys;
  fileURL:any;
  file:any;
  pdfSrc:any;
  ontologyServiceDetails:any = [];
  selectedSpecList:any = []

  public items$: Observable<product_Name[]>;
  public input$ = new Subject<string | null>();
  @ViewChild('code', {static: false}) private codeRef?: ElementRef<HTMLElement>;

  

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
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
      console.log(this.documentId);
      console.log(this.documentCategory);
      console.log(this.Product_Id);
    });

    this.ontologyServiceDetails =[];
    this.ontologyServiceDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details' : { Category: "ontology", Subcategory: "unassigned"}
    });
      console.log(this.ontologyServiceDetails)

    this.momentiveService.getOntologyDocumentss(this.ontologyServiceDetails).subscribe(data => {
      this.ontologyFileDocuments = data;
      console.log(this.ontologyFileDocuments);
      this.ontologyProductsName = this.ontologyFileDocuments.filter((element) => (element.category === this.documentCategory));
      console.log(this.ontologyProductsName);
      console.log(this.ontologyProductsName[0][this.documentCategory]);
      this.PDfOntology = this.ontologyProductsName[0][this.documentCategory].filter((element) => (element.id == this.documentId));
      console.log(this.PDfOntology);
      if (this.PDfOntology) {
        //this.extractedFields = this.ontologyPdfFileData[0].Extract_Field;
        this.extarctPDFData = this.PDfOntology[0].Extract_Field;
        console.log( this.extarctPDFData);
        this.extractKeys = this.extarctPDFData.ontologyKey;
        console.log(this.extractKeys);
        this.extractProductKey = this.extractKeys.split(',');
        console.log(this.extractProductKey);
         delete this.extarctPDFData.ontologyKey;
         console.log(this.extractKeys);

        this.extractProductKey.forEach(element => {
         this.keyselected.push({name:element, product: 'Nam Prod'});
        });
        console.log(this.keyselected);
        this.ontologyExtractKey = this.keyselected;
        console.log(this.ontologyExtractKey);
   
        // this.extractFieldsForm.controls.extractNamedetails.setValue( this.extarctPDFData);
      }
      this.filename = this.PDfOntology[0].fileName;
      this.productName = this.PDfOntology[0].productName;
      this.pdfUrl = this.PDfOntology[0].url;
      console.log(this.filename);
      console.log(this.productName);
      console.log(this.pdfUrl);
       this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl);
       console.log(this.Url);
});

     
      


//     this.momentiveService.getOntologyDocuments().subscribe(data => {
//       this.ontologyFileDocuments = data;
//       this.ontologyProductsName = this.ontologyFileDocuments.ontology_documents;
//       console.log(this.ontologyProductsName);
//       this.PDfOntology = this.ontologyProductsName.filter((element) => (element.productName === this.Product_Id));
//       console.log(this.PDfOntology);
//       this.ontologyNewDocuments = this.PDfOntology.filter((element) => (element.category === this.documentCategory));
//       console.log(this.ontologyNewDocuments);
//       this.ontologyPdfFileData = this.ontologyNewDocuments[0][this.documentCategory].filter((element) => (element.id === this.documentId));
//       console.log(this.ontologyPdfFileData);
//       if (this.ontologyPdfFileData) {
//         // this.extractedFields = this.ontologyPdfFileData[0].Extract_Field;
//         this.extarctPDFData = this.ontologyPdfFileData[0].Extract_Field;
//         console.log( this.extarctPDFData);
//         this.extractKeys = this.extarctPDFData.ontology_Key;
//         this.extractProductKey = this.extractKeys.split(',');
//         console.log(this.extractProductKey);
//          delete this.extarctPDFData.ontology_Key;
//          console.log(this.extractKeys);

//         this.extractProductKey.forEach(element => {
//          this.keyselected.push({name:element, product: 'Nam Prod'});
//         });
//         console.log(this.keyselected);
//         this.ontologyExtractKey = this.keyselected;
//         console.log(this.ontologyExtractKey);
   
//         // this.extractFieldsForm.controls.extractNamedetails.setValue( this.extarctPDFData);
//       }
//       this.filename = this.ontologyPdfFileData[0].fileName;
//       this.productName = this.ontologyPdfFileData[0].productName;
//       this.pdfUrl = this.ontologyPdfFileData[0].url;
//       console.log(this.filename);
//       console.log(this.productName);
//       console.log(this.pdfUrl);
//       this.Url = this.sanitizer.bypassSecurityTrustResourceUrl(this.pdfUrl);
//       console.log(this.Url);
// });




  // Product Name
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


  submitProduct(data) {
    this.disabledkey = false;
  }

  setMyStyles() {
    const styles = {
      position: this.product_type.length > 16 ? 'absolute' : 'none',
    };
    return styles;
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

extractFields() {
  console.log(this.extractFieldsForm.value);
}
editOntology(data) {
  console.log(data);
  if (data) {
    this.disabledCondition = false;
    this.disabledkey = false;
  }

}
updateOntology(data) {
  console.log(data);
  this.disabledkey = false;
}
ReadOntology(data) {
  console.log(data);
}
documentKey(data) {
  console.log(data);
  }
}
