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
import { UnassignedDocumentsComponent } from './unassigned-documents/unassigned-documents.component';
import { UnassignedDetailsDocumentsComponent } from './unassigned-details-documents/unassigned-details-documents.component';
import { OntologyTestComponent} from './ontology-test/ontology-test.component'
import { OntologyTestDetailsComponent} from './ontology-test-details/ontology-test-details.component'
import { SynonymsFilterPipe } from './pipes/synonyms-filter.pipe';
const routes: Routes = [
      { path: '', component: OntologyHomeComponent},
      { path: 'ontology-documents', component: OntologyDocumentsComponent },
      { path: 'synonyms', component: SynonymsComponent },
      { path: 'ontology-test', component: OntologyTestComponent },
      { path: 'unassigned-documents', component: UnassignedDocumentsComponent },
      { path: 'unassigned-details-documents', component: UnassignedDetailsDocumentsComponent },
      { path: 'test-details-documents', component: OntologyTestDetailsComponent },

];

@NgModule({
  declarations: [OntologyHomeComponent, OntologyComponent, SynonymsComponent, SynonymsFilterPipe,OntologyDocumentsComponent, OntologyTestComponent,UnassignedDocumentsComponent, UnassignedDetailsDocumentsComponent,OntologyTestDetailsComponent],
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
