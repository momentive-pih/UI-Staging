import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OntologyComponent } from './ontology.component';
import { OntologyHomeComponent } from '../ontology/ontology-home/ontology-home.component';
import { OntologyDocumentsComponent } from '../ontology/ontology-documents/ontology-documents.component';
import { SynonymsComponent } from '../ontology/synonyms/synonyms.component';
import { UnassignedDocumentsComponent } from './unassigned-documents/unassigned-documents.component';
import { UnassignedDetailsDocumentsComponent } from './unassigned-details-documents/unassigned-details-documents.component';
import { OntologyTestComponent} from './ontology-test/ontology-test.component'
import { OntologyTestDetailsComponent} from './ontology-test-details/ontology-test-details.component'


 export const Ontologyroutes: Routes = [
      { path: '', component: OntologyHomeComponent},
      { path: 'ontology-documents', component: OntologyDocumentsComponent },
      { path: 'synonyms', component: SynonymsComponent },
      { path: 'ontology-test', component: OntologyTestComponent },
      { path: 'unassigned-documents', component: UnassignedDocumentsComponent },
      { path: 'unassigned-details-documents', component: UnassignedDetailsDocumentsComponent },
      { path: 'test-details-documents', component: OntologyTestDetailsComponent },

];


export class OntologyRoutingModule { }
