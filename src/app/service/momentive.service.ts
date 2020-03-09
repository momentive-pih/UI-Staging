import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { HttpEvent, HttpInterceptor,HttpClientJsonpModule, HttpClient, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Constants } from './../constants/constants';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

let token = ""
let headers = new HttpHeaders().set('Content-Type', 'application/json');
    headers = headers.set('authorization', 'Bearer ' + token); 
    headers.set('Access-Control-Allow-Origin','*') 


@Injectable({
  providedIn: 'root'
})



export class MomentiveService {
  invokeEvent: Subject<any> = new Subject(); 
  homeEvent: Subject<any> = new Subject();
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
    return this.http.post<any[]>('https://cld-it-dev-apimgmt-pih.azure-api.net/clditdevfuncapppih/postAllProducts', data);
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
  // getSpecList() {
  //   return this.http.get(Constants.SERVICES_DOMAIN + "product/specList");
  // }

  getSpecList(): Observable<any[]> {
    return this.http.get<any[]>(Constants.SERVICES_DOMAIN + "product/specList");
   }   
  getSelctedSpecList(data) {
    return this.http.get(Constants.SERVICES_DOMAIN + "product/selectedspeclist", data);
  }
  getCategoryDetails(data) {
    return this.http.get(Constants.SERVICES_DOMAIN + "product/categorydetails",data);
  }


  getHomePageData (): Observable<any[]> {
    // alert('123')
   return this.http.get<any[]>(Constants.SERVICES_DOMAIN + "product/homePageData");
  }
  
getSearchData() {
    return this.http.get('../../assets/momentive.json');
}


getOntologyDocuments() {
  return this.http.get('../../assets/ontology.json');
}
  


}
