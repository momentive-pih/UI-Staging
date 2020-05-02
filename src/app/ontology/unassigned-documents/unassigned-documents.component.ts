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
  selector: 'app-unassigned-documents',
  templateUrl: './unassigned-documents.component.html',
  styleUrls: ['./unassigned-documents.component.css']
})
export class UnassignedDocumentsComponent implements OnInit {
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

    //Unassignment Document List API
    this.ontologyServiceDetails = [];
    this.ontologyServiceDetails.push({
      'Category_details': { Category: "ontology", Subcategory: "unassigned" }
    });
    console.log(this.ontologyServiceDetails)
    this.ontologyassignedDocument = true;
    this.momentiveService.getOntologyDocumentss(this.ontologyServiceDetails).subscribe(data => {
      console.log(data);
      this.ontologyFileDocuments = data;
      if (this.ontologyFileDocuments.length > 0) {
        this.ontologyassignedDocument = false;
      }
      console.log(this.ontologyFileDocuments);
    }, err => {
      console.error(err);
    });
    $("a.collapsed").click(function () {
      $(this).find(".btn:contains('answer')").toggleClass("collapsed");
    });
  }

// Detail Page Routing
  ontologyUnassignedDocuments(id: any, categeory: any, productName: any) {
    console.log(id);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'document_id': id,
        'category_Name': categeory,
        'Product_Name': productName
      }
    };
    this.router.navigate(['ontology/unassigned-details-documents'], navigationExtras);
  }

//Unassignment Expand and Collapse Function
  expand() {
    $('.collapse').collapse('show');
  }
  collapse() {
    $('.collapse').collapse('hide');
  }
}
