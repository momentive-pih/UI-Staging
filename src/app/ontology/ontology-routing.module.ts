import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule} from 'primeng/table';
import { NgbDatepickerModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { NgDatepickerModule } from 'ng2-datepicker';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { DropdownModule} from 'primeng/primeng';
import { MultiSelectModule} from 'primeng/primeng';
import { EditorModule, SharedModule, ButtonModule} from 'primeng/primeng';
import {InputTextModule, SliderModule} from 'primeng/primeng';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown-angular7';
import { NgSelectModule } from '@ng-select/ng-select';
import { OntologyComponent } from './ontology.component';
import { OntologyHomeComponent } from '../ontology/ontology-home/ontology-home.component';
import { OntologyDocumentsComponent } from '../ontology/ontology-documents/ontology-documents.component';
import { SynonymsComponent } from '../ontology/synonyms/synonyms.component';
import { WholeOntologyManagementComponent } from './whole-ontology-management/whole-ontology-management.component';
import { UnassignedDocumentsComponent } from './unassigned-documents/unassigned-documents.component';
import { UnassignedDetailsDocumentsComponent } from './unassigned-details-documents/unassigned-details-documents.component';


const routes: Routes = [
      { path: '', component: OntologyHomeComponent},
      { path: 'ontology-documents', component: OntologyDocumentsComponent },
      { path: 'synonyms', component: SynonymsComponent },
      { path: 'whole-ontology-management', component: WholeOntologyManagementComponent },
      { path: 'unassigned-documents', component: UnassignedDocumentsComponent },
      { path: 'unassigned-details-documents', component: UnassignedDetailsDocumentsComponent }

];

@NgModule({
  declarations: [OntologyHomeComponent, OntologyComponent, SynonymsComponent, OntologyDocumentsComponent, WholeOntologyManagementComponent,UnassignedDocumentsComponent, UnassignedDetailsDocumentsComponent],
  imports: [FormsModule, ReactiveFormsModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgDatepickerModule,
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
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OntologyRoutingModule { }
