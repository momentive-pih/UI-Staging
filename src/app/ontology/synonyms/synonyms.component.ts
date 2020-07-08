import { Component, OnInit , ViewChild, ElementRef,ViewContainerRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MomentiveService } from './../../service/momentive.service';
import { Observable, Subject } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { SynonymsFilterPipe } from './../pipes/synonyms-filter.pipe';
import { element } from 'protractor';
import { FooterColumnGroup } from 'primeng/primeng';

declare var $: any;
interface Person {
  name: string;
}


@Component({
  selector: 'app-synonyms',
  templateUrl: './synonyms.component.html',
  styleUrls: ['./synonyms.component.css']
})
export class SynonymsComponent implements OnInit {
  addSynonyms: FormGroup;
  editSynonyms: FormGroup;
  submitted = false;
  synonymsFieldsForm: FormGroup;
  addField = false;
  ontologySynonymsDocuments: any = [];
  OntologyKeysynonyms: any = [];
  documentCASSynonyms: any;
  synonysKey: any = [];
  Ontologysynonyms: any = [];
  PDfOntology: any = [];
  ontologySynonym: any = [];
  selectedId: any;
  documentCategory: any;
  OntologySearchKeysynonyms: any = [];
  keySynonysms: any = [];
  globalSynonyms: any;
  searchText:any;
  SelectedKey: String;
  documentCategorySection = false;
  ontologySynonymsLoader: boolean = true;
  synonymsAddbtn = false;
  ontologyManagementSynonyms: any = [];
  productdata:any=[];
  synonymskey:any=[];
  product_NameData:any =[];
  synonyms_product_Name:any=[];
  synonymsData:any;
  SearchProductname:any =[];
  searchProduct:any;
  synonymsCheckData:any;
  userFilter: any = { key: '' };
  searchSynonymsName:any;
  synonyms_solr_Id:any;
  synonyms_id:any;
  ExistDataCheck:any;
  searchTextTerms:any;
  UpdatedSynonymsValue:any;
  synonymsUpdateButton: boolean = false;
  updatedProductkey:any;
  updatedProductKeyCategory:any;
  synonysProductKey:any;
  synonysProductKey_category:any;
  disabledkey:boolean=true;
  copyOntologySynonys:any=[];
  synonymsManagementData:any;
  synonymsUserUpdatedDetails:any =[];
  SearchProducts:any=[];
  product_Name:any =[];
  searchDataLength:any;
  
  

  public items$: Observable<Person[]>;
  public input$ = new Subject<string | null>();
  @ViewChild('code', { static: false }) private codeRef?: ElementRef<HTMLElement>;
  constructor(private formBuilder: FormBuilder,public toastr: ToastrManager, vcr: ViewContainerRef, private momentiveService: MomentiveService, private route: ActivatedRoute,
    private router: Router) {
      
    //  this.input$.pipe(
    //     map((term) => this.searchPeople(term))
    //   )

      this.input$.subscribe(
        (term) => this.searchPeople(term,this.product_Name));
    
  }

  ngOnInit() {
     this.SynonymsManagement();
    this.addSynonyms = new FormGroup({
      synonymsName: new FormControl(''),
      SearchProductname: new FormControl(),

   });

   this.editSynonyms = new FormGroup({
    editSearchProductname : new FormControl('')
   })


      // Product name

      // this.momentiveService.getOntologyManagement().subscribe(data => {
      //   this.ontologyManagementSynonyms = data;
      //   console.log(this.ontologyManagementSynonyms);
      //   this.synonymskey = this.ontologyManagementSynonyms[0].product_Details
      //   console.log(this.synonymskey);
      // }, err => {
      //   console.error(err);
      // });
     
  }

SynonymsManagement() {
    // Synonyms API Call
    this.momentiveService.getOntologyManagement().subscribe(data => {
      this.ontologyManagementSynonyms = data;
      console.log(this.ontologyManagementSynonyms);
      this.synonymskey = this.ontologyManagementSynonyms[0].product_Details
      if (this.ontologyManagementSynonyms[0].ontology_Details.length > 0) {
        this.ontologySynonymsLoader = false;
        this.Ontologysynonyms = this.ontologyManagementSynonyms[0].ontology_Details
        this.Ontologysynonyms.forEach(element => {
            element.editable = true;
        })
        this.copyOntologySynonys = JSON.parse(JSON.stringify(this.Ontologysynonyms));
      }
    }, err => {
      console.error(err);
    });
}


  private searchPeople(term: string | null, arr){
    const searchTerm = term ? term : '';
    console.log(searchTerm);
    this.SearchProducts = {
      'SearchData': searchTerm
    }
    this.searchDataLength = this.SearchProducts.SearchData.length;

    if (this.searchDataLength > 1) {
    this.momentiveService.postOntologyProductSearch(this.SearchProducts).subscribe(data => {
      console.log(data);
      if (data) {
        console.log('inside');
        this.product_Name = data;
        if (searchTerm.includes("*")) {
          const searchTermNew = searchTerm.split('*');
          this.searchTextTerms = searchTermNew[1];
          console.log(this.searchTextTerms);
        } else {
          this.searchTextTerms = searchTerm;
        }
        this.items$ =  this.product_Name.filter((person) => {
          return person.name.toString().toLowerCase().startsWith(searchTerm.toString().toLowerCase()) ||
          person.key.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) ||
          person.type.toString().toLowerCase().startsWith(searchTerm.toString().toLowerCase()) ||
          person.name.toString().toLowerCase().startsWith(this.searchTextTerms.toString().toLowerCase()) 
        });
      }

    });
  
  }
  }
  

  onChangeData(data) {
    console.log(data);
    this.searchSynonymsName = data;
  }
  //Submit Function
  synonymsAdd() {
      console.log(this.addSynonyms);
      this.synonymsData = this.addSynonyms.value;
      console.log(this.synonymsData);
      this.synonymsCheckData = this.synonymsData.synonymsName;
      this.ExistDataCheck = false;
     console.log(this.Ontologysynonyms.length);
     if(this.Ontologysynonyms.length > 0) {
      this.Ontologysynonyms.forEach(element => {
        if(element.synonyms == this.synonymsCheckData) {
               this.ExistDataCheck = true;  
               return false;
         }
       });
      }
      if(!this.ExistDataCheck) {
        console.log(this.synonymsData);
        let addSynonymsData = {
          'ontologySynonyms' : this.synonymsData.synonymsName,
          'synonymsProductName' : this.searchSynonymsName.name,
          'synonymsProductType' : this.searchSynonymsName.type,
          'synonymsCreatedBy' : localStorage.getItem('userName'),
          'synonymsUpdatedBy' : localStorage.getItem('userName')
        }
        console.log(addSynonymsData);
        this.momentiveService.addSynonymsEvent(addSynonymsData).subscribe(data =>{
          console.log(data)

          let responseData = data
          if(responseData[0].status = 200) {
            this.toastr.successToastr('Synonyms' +'  '+ responseData[0].message, 'Success!');
          } else {
            this.toastr.warningToastr('Synonyms' +'  '+responseData[0].message, 'warning!');
          }
        
          
          this.addSynonyms.reset();
          this.SynonymsManagement();
         
        },err => {
          console.error(err);
        })
      } else {
          this.toastr.warningToastr('Synonyms Already Exist .', 'Alert!');
          this.addSynonyms.reset();
      }
  
  }
 
  synonymsEdit(synonymsValue) {
    this.synonymsUpdateButton = true;
    this.disabledkey = false;
    synonymsValue.editable = false;
    console.log(synonymsValue);
    this.updatedProductkey = synonymsValue.key;
    this.updatedProductKeyCategory = synonymsValue.key_Category;
    // this.synonyms_id = synonymsValue.id;
    // this.synonyms_solr_Id = synonymsValue.solr_id;
    // this.addSynonyms.controls["synonymsName"].setValue(synonymsValue.synonyms);
    //  this.addSynonyms.controls["SearchProductname"].setValue(synonymsValue.key);
  }
  synonymsClearData() {
    this.Ontologysynonyms = this.copyOntologySynonys;
    this.copyOntologySynonys = JSON.parse(JSON.stringify(this.Ontologysynonyms));

  }

  synonymsUpdate(data) {
    this.UpdatedSynonymsValue = data;
    console.log(this.UpdatedSynonymsValue);
    if(this.UpdatedSynonymsValue.key == this.updatedProductkey && this.UpdatedSynonymsValue.key_Category == this.updatedProductKeyCategory) {
      this.synonysProductKey = this.UpdatedSynonymsValue.key;
      this.synonysProductKey_category = this.UpdatedSynonymsValue.key_Category;
    } else {
      this.synonysProductKey = this.searchSynonymsName.name 
      this.synonysProductKey_category = this.searchSynonymsName.type
    }
    this.ExistDataCheck = false;  
    if(this.Ontologysynonyms.length > 0) {
    this.Ontologysynonyms.forEach(element => {
      if(element.synonyms == this.synonymsCheckData) {
             this.ExistDataCheck = true;  
             return false;
       }
     });
    }

     if(!this.ExistDataCheck) {
      let addSynonymsData = {
        'ontology_Id' : this.UpdatedSynonymsValue.id,
        'solr_Id': this.UpdatedSynonymsValue.solr_Id,
        'ontologySynonyms' :   this.UpdatedSynonymsValue.synonyms,
        'synonymsProductName' : this.synonysProductKey,
        'synonymsProductType' :  this.synonysProductKey_category,
        'synonymsCreatedBy' :  localStorage.getItem('userName'),
        'synonymsUpdatedBy' : localStorage.getItem('userName')
      }
      console.log(addSynonymsData);
      this.momentiveService.addSynonymsEvent(addSynonymsData).subscribe(data =>{
        console.log(data)
        this.toastr.successToastr('Synonyms Updated Successfully .', 'Success!');
        this.synonymsUpdateButton = false;
        this.disabledkey = true;
        this.SynonymsManagement();
      },err => {
        console.error(err);
      })
    
     } else {
      this.toastr.warningToastr('Synonyms Already Exist .', 'Alert!');
     }
  }

  synonymsUserDetails(data) {
    console.log(data);
    this.synonymsManagementData = data;
    console.log(this.synonymsManagementData);
    this.momentiveService.ontologyManagementLogDetails({"id":this.synonymsManagementData.id}).subscribe(data =>{
      console.log(data);
      this.synonymsUserUpdatedDetails = data;
    })

  }
}
