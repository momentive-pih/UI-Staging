import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MomentiveService} from './../../service/momentive.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-synonyms',
  templateUrl: './synonyms.component.html',
  styleUrls: ['./synonyms.component.css']
})
export class SynonymsComponent implements OnInit {

  synonymsFieldsForm: FormGroup;
  addField = false;
  ontologySynonymsDocuments: any = [];
  OntologyKeysynonyms: any =[];
  documentCASSynonyms: any;
  synonysKey: any = [];
  Ontologysynonyms: any = [];
  PDfOntology: any = [];
  ontologySynonym: any = [];
  selectedId:any;
  documentCategory: any;
  OntologySearchKeysynonyms: any = [];
  keySynonysms: any = [];
  globalSynonyms: any;
  SelectedKey: String;
  documentCategorySection = false;
  synonymsAddbtn = false;
  constructor(private formBuilder: FormBuilder, private momentiveService: MomentiveService, private route: ActivatedRoute,
    private router: Router) {
  this.synonymsFieldsForm = new FormGroup({
    synonymsFieldName: new FormControl()
 });

  }

  ngOnInit() {
    this.documentCategory = localStorage.getItem('ontologyDocumets');

    var retrievedData = localStorage.getItem("synonymsOntology");
    this.keySynonysms =  JSON.parse(retrievedData);
    console.log(this.keySynonysms);
    this.SelectedKey = this.keySynonysms[0].name;  
    let i = 0;
    this.selectedId = i;
 

    if(this.SelectedKey === null){
      this.globalSynonyms = false;
    } else if (this.SelectedKey.length > 0) {
      this.globalSynonyms = true;
    }

    // if ((localStorage.getItem('ontologyDocumets') === null) &&  (localStorage.getItem('ontologyCASDocumets') === null)) {
    //   this.documentCategorySection = true;
    // }

   
  
      if (localStorage.getItem('ontologyCASDocumets') === '68083-19-2' ) {
        this.momentiveService.getOntologyDocuments().subscribe(data => {
          this.ontologySynonymsDocuments = data;
          this.OntologyKeysynonyms = this.ontologySynonymsDocuments.Synonyms_CAS_Number;
          console.log(this.OntologyKeysynonyms);
          let i = 0;
          this.selectedId = i;
          this.Ontologysynonyms = this.OntologyKeysynonyms[i].Synonyms_CAS;
          console.log(this.Ontologysynonyms);
       
        }, err => {
        console.error(err);
      });
    }
  
    console.log(this.documentCategory);
    if (this.documentCategory === 'LSR2050' ) {
      this.documentCategorySection = true;
      this.momentiveService.getOntologyDocuments().subscribe(data => {
        this.ontologySynonymsDocuments = data;
        this.Ontologysynonyms = this.ontologySynonymsDocuments.synonyms_LSR2050;
        console.log(this.Ontologysynonyms);
      }, err => {
      console.error(err);
    });
  } else if (this.documentCategory === 'LSR2650') {
    this.documentCategorySection = true;
    this.momentiveService.getOntologyDocuments().subscribe(data => {
      this.ontologySynonymsDocuments = data;
      this.Ontologysynonyms = this.ontologySynonymsDocuments.synonyms_LSR2650;
      console.log(this.Ontologysynonyms);
    }, err => {
    console.error(err);
  });
  }

}

OntologySideKey(index) {
  console.log(index);
  this.selectedId = index;
  var retrievedData = localStorage.getItem("synonymsOntology");
  this.keySynonysms =  JSON.parse(retrievedData);
  console.log(this.keySynonysms);
  this.SelectedKey = this.keySynonysms[index].name;  
  console.log(this.selectedId);
}
  // synonymsFields() {
  //  this.addField = true;
  // }
  addSynonyms() {
    console.log(this.synonymsFieldsForm.value);
  }
  closeSynonyms() {
    this.addField = false;
  }
  WholeSynonyms() {
    this.router.navigate(['/ontology/whole-ontology-management']);
  }

  focusFunction () {
     this.synonymsAddbtn = true;
  }
  // focusOutFunction () {

  // }
}

