import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgDatepickerModule } from 'ng2-datepicker';
import { DropdownModule } from 'primeng/primeng';
import { MultiSelectModule } from 'primeng/primeng';
import { CommonModule } from '@angular/common';
import { EditorModule, ButtonModule } from 'primeng/primeng';
import { InputTextModule, SliderModule } from 'primeng/primeng';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown-angular7';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { MomentiveService } from './service/momentive.service';
import { ViewReportComponent } from './view-report/view-report.component';
import { PageindexComponent } from './pageindex/pageindex.component';
import { ProductAttributesComponent } from './product-attributes/product-attributes.component';
import { ProductComplianceComponent } from './product-compliance/product-compliance.component';
import { CustomerCommunicationComponent } from './customer-communication/customer-communication.component';
import { ToxicologyComponent } from './toxicology/toxicology.component';
import { RestrictedSubstanceComponent } from './restricted-substance/restricted-substance.component';
import { SalesVolumeComponent } from './sales-volume/sales-volume.component';
import { ReportDataComponent } from './report-data/report-data.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { MatFormFieldModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MatRadioModule } from '@angular/material';
import { ToastrModule } from 'ng6-toastr-notifications';
import { SharedModule } from '../app/shared/shared.module';
import { ImageViewerModule } from 'ng2-image-viewer';
import { PihFilterPipe } from './pipes/pih-filter.pipe';
import { CasLevelFilterPipe } from './pipes/cas-level-filter.pipe';
import { ProductLevelPipe } from './pipes/product-level.pipe';
import { GhsLabelingPipe } from './pipes/ghs-labeling.pipe';
import { OtherTablesComponent } from './other-tables/other-tables.component';
import { SvtCompositionFilterPipe } from './pipes/svt-composition-filter.pipe';
import { LegalCompositionFilterPipe } from './pipes/legal-composition-filter.pipe';
import { StdCompositionFilterPipe } from './pipes/std-composition-filter.pipe';
import { MsAdalAngular6Module } from 'microsoft-adal-angular6';
import { AuthenticationGuard } from 'microsoft-adal-angular6';
import { polyfill } from 'es6-promise';
import { CategoriesPipe } from './pipes/categories.pipe'; polyfill();





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ViewReportComponent,
    PageindexComponent,
    ProductAttributesComponent,
    ProductComplianceComponent,
    CustomerCommunicationComponent,
    ToxicologyComponent,
    RestrictedSubstanceComponent,
    SalesVolumeComponent,
    ReportDataComponent,
    SidebarComponent,
    PihFilterPipe,
    CasLevelFilterPipe,
    ProductLevelPipe,
    GhsLabelingPipe,
    OtherTablesComponent,
    SvtCompositionFilterPipe,
    LegalCompositionFilterPipe,
    StdCompositionFilterPipe,
    CategoriesPipe,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AutocompleteLibModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgDatepickerModule,
    TableModule,
    CommonModule,
    SharedModule,
    Ng2FilterPipeModule,
    AngularMultiSelectModule,
    ButtonModule,
    EditorModule,
    DropdownModule,
    MultiSelectModule,
    MatRadioModule,
    SliderModule,
    InputTextModule,
    NgSelectModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    ImageViewerModule,
    MatSelectModule, MatSelectFilterModule, MatIconModule, MatToolbarModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastrModule.forRoot(),
    SharedModule.forRoot(),
     
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
