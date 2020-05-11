import { Component, OnInit , ViewChild, ElementRef,ViewContainerRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MomentiveService } from './../../service/momentive.service';
import { Observable, Subject } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { SynonymsFilterPipe } from './../pipes/synonyms-filter.pipe';
import { element } from 'protractor';

declare var $: any;
interface Person {
  name: string;
  product:string;
}


@Component({
  selector: 'app-synonyms',
  templateUrl: './synonyms.component.html',
  styleUrls: ['./synonyms.component.css']
})
export class SynonymsComponent implements OnInit {
  addSynonyms: FormGroup;
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
  ExistDataCheck:any;
  searchTextTerms:any;

 
  

  public items$: Observable<Person[]>;
  public input$ = new Subject<string | null>();
  @ViewChild('code', { static: false }) private codeRef?: ElementRef<HTMLElement>;
  constructor(private formBuilder: FormBuilder,public toastr: ToastrManager, vcr: ViewContainerRef, private momentiveService: MomentiveService, private route: ActivatedRoute,
    private router: Router) {
      
      this.items$ = this.input$.pipe(
        map((term) => this.searchPeople(term))
      )

  }

  ngOnInit() {
     this.SynonymsManagement();
    this.addSynonyms = new FormGroup({
      synonymsName: new FormControl(''),
      SearchProductname: new FormControl(),

   });


      // Product name

      this.momentiveService.getOntologyManagement().subscribe(data => {
        this.ontologyManagementSynonyms = data;
        console.log(this.ontologyManagementSynonyms);
        this.synonymskey = this.ontologyManagementSynonyms[0].product_Details
        console.log(this.synonymskey);
      }, err => {
        console.error(err);
      });
     
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
      }
    }, err => {
      console.error(err);
    });
}
  private searchPeople(term: string | null): Person[] {
    const searchTerm = term ? term : '';

    if (searchTerm.includes("*")) {
      const searchTermNew = searchTerm.split('*');
      this.searchTextTerms = searchTermNew[1];
      console.log(this.searchTextTerms);
    } else {
      this.searchTextTerms = searchTerm;
    }
    return this.synonymskey.filter((person) => {
      return person.name.toString().toLowerCase().startsWith(searchTerm.toString().toLowerCase()) ||
      person.key.toString().toLowerCase().includes(searchTerm.toString().toLowerCase()) ||
      person.type.toString().toLowerCase().startsWith(searchTerm.toString().toLowerCase()) ||
      person.name.toString().toLowerCase().startsWith(this.searchTextTerms.toString().toLowerCase()) 
    });
  }

  onChangeData(data) {
    console.log(data);
    this.searchSynonymsName =data;
  }
  //Submit Function
  onSubmit() {
   
      console.log(this.addSynonyms);
      this.synonymsData = this.addSynonyms.value;
      console.log(this.synonymsData);
      this.synonymsCheckData = this.synonymsData.synonymsName;
      this.ExistDataCheck = false;
      this.Ontologysynonyms.forEach(element => {
        if(element.synonyms == this.synonymsCheckData) {
               this.ExistDataCheck = true;  
               return false;
         }
       });
      if(!this.ExistDataCheck) {
        console.log(this.synonymsData);
        let addSynonymsData = {
          'ontologySynonyms' : this.synonymsData.synonymsName,
          'synonymsProductName' : this.searchSynonymsName.name,
          'synonymsProductType' : this.searchSynonymsName.type,
          'synonymsCreatedBy' : 'PIH-admin',
          'synonymsUpdatedBy' : 'PIH-admin'
        }
        console.log(addSynonymsData);
        this.momentiveService.addSynonymsEvent(addSynonymsData).subscribe(data =>{
          console.log(data)
          this.toastr.successToastr('Synonyms Added Successfully .', 'Success!');
          this.SynonymsManagement();
        },err => {
          console.error(err);
        })
      } else {
          this.toastr.warningToastr('Synonyms Already Exist .', 'Alert!');
      }
    
    
  
  }
 

   

  



}
