import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Attribute } from '@angular/compiler';
import { MatTableDataSource} from '@angular/material';
import {TableModule} from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption} from '@ng-select/ng-select';
import { MomentiveService} from './../service/momentive.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
// tslint:disable-next-line: class-name
interface product_Name {
  name: string;
}

@Component({
  selector: 'app-ontology',
  templateUrl: './ontology.component.html',
  styleUrls: ['./ontology.component.css']
})
export class OntologyComponent implements OnInit {
  reactiveForm: FormGroup;
  // tslint:disable-next-line: variable-name
  searchproduct_data: any = [];
  // tslint:disable-next-line: variable-name
  product_lsr_name: any  = [];
  product_Name: any = [];
  Searchname: any;
  product_Data: any;

   objectKeys = Object.keys;
  public items$: Observable<product_Name[]>;
  public input$ = new Subject<string | null>();
  @ViewChild('code', {static: false}) private codeRef?: ElementRef<HTMLElement>;

  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private router: Router, private momentiveService: MomentiveService) {
                this.reactiveForm = fb.group({
                  Searchname: ['', Validators.required]
                });
                this.items$ = this.input$.pipe(
                  map((term) => this.searchProduct(term, this.product_Name))
                );

               }

  ngOnInit() {

  // Product Name
  this.momentiveService.getSearchData().subscribe(data => {
    this.product_Data = data;
    this.product_Name = this.product_Data.product_Name;
    console.log(this.product_Name);
  }, err => {
    console.error(err);
  });
  }

  private searchProduct(term: string | null, arr): product_Name[] {
    const searchTerm = term ? term : '';
    if (searchTerm.length > 0) {
    if (searchTerm === 'CUST' || searchTerm === 'MAT' || searchTerm === 'SPEC' || searchTerm === 'CAS') {
    console.log(searchTerm);
    return arr.filter((product_Name) => {
      return product_Name.product.toLowerCase().startsWith(searchTerm.toLowerCase());
    });
    } else {
    console.log(searchTerm);
    return arr.filter((product_Name) => {
      return product_Name.name.toLowerCase().startsWith(searchTerm.toLowerCase());
    });
  }
  }
  }
  synonyms() {
    this.router.navigate(['ontology/synonyms']);
  }

}
