import { NgModule } from '@angular/core';
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




@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    OntologyRoutingModule,
    AutocompleteLibModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgDatepickerModule,
    TableModule,
    SharedModule,
    ButtonModule,
    Ng2FilterPipeModule,
    EditorModule,
    DropdownModule,
    MultiSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule
  ],
  providers: [],
  bootstrap: []
})
export class OntologyModule { }
