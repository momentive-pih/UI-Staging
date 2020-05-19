import { NgModule, ModuleWithProviders} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentiveService} from './../service/momentive.service';
import { AppMaterialModule } from './../app-material/app-material.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppMaterialModule
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ MomentiveService ]
    };
  }
 }
