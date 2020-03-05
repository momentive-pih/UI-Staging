import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Constants } from './../constants/constants';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface Spec_Id {
  id: any;
  name: string;
}
//let url = environment.apiUrl;


/** list of Spec_Ids */
export const Spec_IdS: Spec_Id[] = [

  {name:'M00000004251 - LSR2050',id:'1'},
  {name:"M00000004252 - LSR2650", id:'2'},
  {name:"M00000004253 - LSR2680FC-W A", id:'3'},
  {name:"M00000004254 - LSR2680FC-A-BLK" ,id:'4' },
  {name:"M00000004255 - LSR 2680FC A-C3", id:'5'},
  {name:"M00000004256 - LSR 2680FC B-C3", id:'6'},
  {name:"M00000004257 - LSR 2680-BC C2" , id:'7'},
  {name:"M00000004258 - LSR 2680FC B " , id:'8'},
  {name:"M00000004259 - LSR 2680FC A", id:'9' },
  {name:"M00000004260 - Silsoft* ETS" , id:'10'},
  {name:"M00000004261 - Silsoft* 034 organosilicone" , id:'11'},
  {name:"M00000004262 - Silsoft* A-843 conditioning agent" , id:'12'}

];


@Injectable({
  providedIn: 'root'
})
export class MomentiveService {
  invokeEvent: Subject<any> = new Subject(); 
  itemsNew: any = [];
  searchkey:any =[];

 
  /**
   * Observable string streams
   */
  notifyObservable$ = this.invokeEvent.asObservable();


  constructor(private http: HttpClient) {
 
  }
  callMethodOfSecondComponent(data) {
    this.invokeEvent.next(data);
  }
 

  getAllEvents(data) {
    console.log(data);
    return this.http.post<any[]>(Constants.SERVICES_DOMAIN + "all/products",data);
  }


  getSelectedProducts(data) {
    console.log(data);
    return this.http.post(Constants.SERVICES_DOMAIN + "all/selectedProducts", data);
  }

  getSelectedCategories(data) {
    console.log(data);
    return this.http.post(Constants.SERVICES_DOMAIN + "all/selectedCategories", data);
  }

  getBasicDetails() {
    return this.http.get(Constants.SERVICES_DOMAIN + "product/basicDetails");
  }

getSearchData() {
    return this.http.get('../../assets/momentive.json');
}


getOntologyDocuments() {
  return this.http.get('../../assets/ontology.json');
}
  


}
