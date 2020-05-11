import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ViewReportComponent } from './view-report/view-report.component';
import { PageindexComponent } from './pageindex/pageindex.component';
import { ProductAttributesComponent } from './product-attributes/product-attributes.component';
import { ProductComplianceComponent } from './product-compliance/product-compliance.component';
import { CustomerCommunicationComponent } from './customer-communication/customer-communication.component'
import { ToxicologyComponent } from './toxicology/toxicology.component';
import { RestrictedSubstanceComponent } from './restricted-substance/restricted-substance.component';
import { SalesVolumeComponent } from './sales-volume/sales-volume.component';
import { ReportDataComponent } from './report-data/report-data.component';
import { OtherTablesComponent } from './other-tables/other-tables.component';

const routes: Routes = [
  { path: '', component: PageindexComponent },
  { path: 'app-pageindex', component: PageindexComponent },
  { path: 'app-home', component: HomeComponent },
  { path: 'app-header', component: HeaderComponent },
  { path: 'app-footer', component: FooterComponent },
  { path: 'app-view-report', component: ViewReportComponent },
  { path: 'app-product-attributes', component: ProductAttributesComponent },
  { path: 'app-product-compliance', component: ProductComplianceComponent },
  { path: 'app-customer-communication', component: CustomerCommunicationComponent },
  { path: 'app-toxicology', component: ToxicologyComponent },
  { path: 'app-restricted-substance', component: RestrictedSubstanceComponent },
  { path: 'app-sales-volume', component: SalesVolumeComponent },
  { path: 'app-report-data', component: ReportDataComponent },
  { path: 'app-other-tables', component: OtherTablesComponent },

  {
    path: 'ontology',
    loadChildren: 'src/app/ontology/ontology.module#OntologyModule'
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
