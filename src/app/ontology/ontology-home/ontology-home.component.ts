import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Attribute } from '@angular/compiler';
import { MatTableDataSource } from '@angular/material';
import { TableModule } from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';
import { MomentiveService } from './../../service/momentive.service';
import { Router, ActivatedRoute, NavigationStart, NavigationExtras } from '@angular/router';
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
  unassignedDocument: boolean = true;;
  keyDocuments: any = [];
  alertText: any;
  ontologyServiceDetails: any = [];
  selectedSpecList: any = [];
  ontologyassignedDocument: boolean = true;
  ontologyAlertDocument: boolean = false;
  constructor(private route: ActivatedRoute,
    private router: Router, private momentiveService: MomentiveService) {

    this.momentiveService.homeEvent.subscribe(data => {
      this.ngOnInit();
    });
  }

  ngOnInit() {


      //Collapse script
  $('.collapsed').on('show.bs.collapse', function () {
    $('.collapsed').each(function(){
        $(this).collapse('hide');
    });
  });
//ontology Documents list API Call
    this.ontologyServiceDetails = [];
    this.selectedSpecList = this.momentiveService.getCategorySpecList();
    this.ontologyServiceDetails.push({
      'Spec_id': this.selectedSpecList,
      'Category_details': { Category: "ontology", Subcategory: "assigned" },
      'product_Level':this.momentiveService.getProductLevelDetails(),
      'Mat_Level':this.momentiveService.getMaterialLevelDetails(),
      'CAS_Level':this.momentiveService.getCasLevelDetails(),
    });
    this.ontologyassignedDocument = true;
    this.momentiveService.getOntologyDocumentss(this.ontologyServiceDetails).subscribe(data => {
      this.ontologyFileDocuments = data;
      if (this.ontologyFileDocuments.length > 0) {
        this.ontologyassignedDocument = false;
        this.ontologyAlertDocument = false;
      } else {
        this.ontologyAlertDocument = true;
        this.ontologyassignedDocument = false;
      }
    }, err => {
      console.error(err);
    });

    $("a.collapsed").click(function () {
      $(this).find(".btn:contains('answer')").toggleClass("collapsed");
    });
  }

//Documents Detail Page function
  ontologyDocuments(id: any, categeory: any, productName: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'document_id': id,
        'category_Name': categeory,
        'Product_Name': productName
      }
    };
    this.router.navigate(['ontology/ontology-documents'], navigationExtras);
  }

//Unassigned Documents routing
  unassigned() {
    this.router.navigate(['ontology/unassigned-documents'])
  }

  //Expand and collapse function
  expand() {
    $('.collapse').collapse('show');
  }
  collapse() {
    $('.collapse').collapse('hide');
  }
}
