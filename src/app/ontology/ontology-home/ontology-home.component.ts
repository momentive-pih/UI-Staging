import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Attribute } from '@angular/compiler';
import { MatTableDataSource} from '@angular/material';
import {TableModule} from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption} from '@ng-select/ng-select';
import { MomentiveService} from './../../service/momentive.service';
import { Router, ActivatedRoute , NavigationStart, NavigationExtras } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-ontology-home',
  templateUrl: './ontology-home.component.html',
  styleUrls: ['./ontology-home.component.css']
})
export class OntologyHomeComponent implements OnInit {

  ontologyFileDocuments: any = [];
  ontologyNewDocuments: any = [];
  PDfOntology: any = [];
  documentCategory: any;
  documentCategorySection = false;
  productIdFilter: any
  unassignedDocument:boolean = true;;
  keyDocuments: any =[];
  alertText: any;
  ontologyServiceDetails:any = [];
  selectedSpecList:any = [];
  ontologyassignedDocument:boolean = true;
  ontologyAlertDocument:boolean = false;



  constructor(private route: ActivatedRoute,
              private router: Router, private momentiveService: MomentiveService) {

                this.momentiveService.homeEvent.subscribe(data => {
                  this.ngOnInit();
                });
               }

  ngOnInit() {

    this.ontologyServiceDetails =[];
    this.selectedSpecList = this.momentiveService.getCategorySpecList();
    console.log(this.selectedSpecList);
    this.ontologyServiceDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details' : { Category: "ontology", Subcategory: "assigned"}
    });
      console.log(this.ontologyServiceDetails)
      this.ontologyassignedDocument = true;
      this.momentiveService.getOntologyDocumentss(this.ontologyServiceDetails).subscribe(data => {
        console.log(data);
      this.ontologyFileDocuments = data;
      if(this.ontologyFileDocuments.length > 0) {
        this.ontologyassignedDocument = false;
        this.ontologyAlertDocument = false;
      } else {
        this.ontologyAlertDocument = true;
        this.ontologyassignedDocument = false;
      }
      console.log(this.ontologyFileDocuments);
    }, err => {
      console.error(err);
    });







    // this.documentCategory = localStorage.getItem('ontologyDocumets');
    // console.log(this.documentCategory);
    // var retrievedData = localStorage.getItem("synonymsOntology");
    // this.keyDocuments =  JSON.parse(retrievedData);
    // console.log(this.keyDocuments);

    // if(this.keyDocuments === null){
    //   this.unassignedDocument = true;
    //   this.alertText = "Please select the products";
    // } else if (this.keyDocuments.length > 0) {
    //   this.unassignedDocument= false;
    //   this.documentCategory = this.keyDocuments[0].name;  
    //   console.log(this.documentCategory);

    //   if ((this.documentCategory === 'LSR2050')||(this.documentCategory === 'LSR2650')) {
    //     this.unassignedDocument= false;
    //     this.momentiveService.getOntologyDocuments().subscribe(data => {
    //     this.ontologyFileDocuments = data;
    //     this.PDfOntology = this.ontologyFileDocuments.ontology_documents;
    //     this.PDfOntology = this.PDfOntology.filter((element: { productName: any; }) => (element.productName === this.documentCategory));
    //     console.log(this.PDfOntology);
    //   }, err => {
    //     console.error(err);
    //   });
    // } else if ((this.documentCategory != 'LSR2050')||(this.documentCategory != 'LSR2650')) {
    //   this.unassignedDocument= true;
    //    this.alertText = "No documents for the Selected Product";
    // }
    // }

    

      $("a.collapsed").click(function(){
        $(this).find(".btn:contains('answer')").toggleClass("collapsed");
    });

  }


 ontologyDocuments(id: any, categeory: any, productName: any) {
   console.log(id);
   const navigationExtras: NavigationExtras = {
    queryParams: {
      'document_id' : id,
      'category_Name': categeory,
      'Product_Name': productName
    }
  };
   this.router.navigate(['ontology/ontology-documents'], navigationExtras);
 }


 unassigned() {
  this.router.navigate(['ontology/unassigned-documents'])
 }
 expand() {
    $('.collapse').collapse('show');
    }
collapse() {
    $('.collapse').collapse('hide');
}
}
