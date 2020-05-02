import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MomentiveService } from './../../service/momentive.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SynonymsFilterPipe } from './../pipes/synonyms-filter.pipe';

declare var $: any;

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
  userFilter: any = { key: '' };

  constructor(private formBuilder: FormBuilder, private momentiveService: MomentiveService, private route: ActivatedRoute,
    private router: Router) {
    this.synonymsFieldsForm = new FormGroup({
      synonymsFieldName: new FormControl()
    });
  }

  ngOnInit() {
    // Synonyms API Call
    this.momentiveService.getOntologyManagement().subscribe(data => {
      this.ontologyManagementSynonyms = data;
      if (this.ontologyManagementSynonyms[0].ontology_Details.length > 0) {
        this.ontologySynonymsLoader = false;
        this.Ontologysynonyms = this.ontologyManagementSynonyms[0].ontology_Details
      }
    }, err => {
      console.error(err);
    });
    // Edit Synonyms Reactive Form Field
    this.addSynonyms = this.formBuilder.group({
      product_Name: ['', Validators.required],
      key_Value: ['', Validators.required],
      created_by: ['', Validators.required],
      created_date: ['', Validators.required]
    });
  }
  focusFunction() {
    this.synonymsAddbtn = true;
  }
  //Submit Function
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addSynonyms.invalid) {
      return;
    }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.addSynonyms.value))
  }
  //Add Synonyms Function
  addNewSynonyms() {

  }
}
