import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { TableModule } from 'primeng/table';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgDatepickerModule } from 'ng2-datepicker';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { DropdownModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/primeng';
import { EditorModule, ButtonModule } from 'primeng/primeng';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown-angular7';
import { NgSelectModule } from '@ng-select/ng-select';
import { MomentiveService } from './../service/momentive.service';
import { OntologyRoutingModule } from './ontology-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UnassignedDocumentsComponent } from './unassigned-documents/unassigned-documents.component';
import { UnassignedDetailsDocumentsComponent } from './unassigned-details-documents/unassigned-details-documents.component';
import { OntologyTestComponent } from './ontology-test/ontology-test.component';
import { OntologyTestDetailsComponent } from './ontology-test-details/ontology-test-details.component';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { MatFormFieldModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MatRadioModule } from '@angular/material';
import { OntologyComponent } from './ontology.component';
import { OntologyHomeComponent } from '../ontology/ontology-home/ontology-home.component';
import { OntologyDocumentsComponent } from '../ontology/ontology-documents/ontology-documents.component';
import { SynonymsComponent } from '../ontology/synonyms/synonyms.component';
import { SynonymsFilterPipe } from './pipes/synonyms-filter.pipe';
import { AppMaterialModule } from './../app-material/app-material.module';
import {InputTextModule, SliderModule} from 'primeng/primeng';
import { Ontologyroutes } from './ontology-routing.module'


@NgModule({
  declarations: [OntologyHomeComponent, OntologyComponent, SynonymsComponent, SynonymsFilterPipe,OntologyDocumentsComponent, OntologyTestComponent,UnassignedDocumentsComponent, UnassignedDetailsDocumentsComponent,OntologyTestDetailsComponent],
  imports: [
    FormsModule, ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgDatepickerModule,
    AppMaterialModule,
    TableModule,
    SharedModule,
    ButtonModule,
    EditorModule,
    DropdownModule,
    MultiSelectModule,
    Ng2FilterPipeModule,
    SliderModule,
    InputTextModule,
    NgSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forChild(Ontologyroutes)
  ],
  exports: [RouterModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: []
})
export class OntologyModule { }
