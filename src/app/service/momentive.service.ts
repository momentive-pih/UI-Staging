import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpClientJsonpModule, HttpClient, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Constants } from './../constants/constants';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

let token = ""
let headers = new HttpHeaders().set('Content-Type', 'application/json');
headers = headers.set('authorization', 'Bearer ' + token);
headers.set('Access-Control-Allow-Origin', '*')


@Injectable({
  providedIn: 'root'
})

//let url = environment.apiUrl;

export class MomentiveService {
  invokeEvent: Subject<any> = new Subject();
  homeEvent: Subject<any> = new Subject();
  itemsNew: any = [];
  searchkey: any = [];
  notifyObservable$ = this.invokeEvent.asObservable();



  constructor(private http: HttpClient) {

  }

 //sideBar category and Subcategory Method call
 callMethodOfSecondComponent(data) {
    this.invokeEvent.next(data);
  }

//Intial Search List
  getAllEvents(data) {
    return this.http.post<any[]>(Constants.SERVICES_DOMAIN + "postAllProducts", data);
  }

//Selcted Search List
  getSelectedProducts(data) {
    return this.http.post(Constants.SERVICES_DOMAIN + "postselectedProducts", data);
  }

//Spec List 
  getSpecList(data): Observable<any[]> {
    console.log(data);
    return this.http.post<any[]>(Constants.SERVICES_DOMAIN + "postSelectedSpecList",data);
  }

  //Homepage Data
  getHomePageData(): Observable<any[]> {
    return this.http.get<any[]>(Constants.SERVICES_DOMAIN + "product/homePageData");
  }

  //Selected Spec List
  getSelctedSpecList(data) {
    return this.http.get(Constants.SERVICES_DOMAIN + "product/selectedspeclist", data);
  }

  //Categories Details
  getSelectedCategories(data) {
    console.log(data);
    return this.http.post(Constants.SERVICES_DOMAIN + "all/selectedCategories", data);
  }

  //Basic Properties Details
  getBasicProperties(data) {
    return this.http.get(Constants.SERVICES_DOMAIN + "product/PostbasicProperties",data);
  }

  //Seven Categories Details

 //ProductAttributes
  getProductAttributes(data) {
    return this.http.get(Constants.SERVICES_DOMAIN + "productAttributes/postProductAttributes",data);
  }

  //ProductCompliance
  getProductCompliance(data) {
    return this.http.get(Constants.SERVICES_DOMAIN + "productAttributes/postProductCompliance",data);
  }

  //CustomerCommunication
  getCustomerCommunication(data) {
    return this.http.get(Constants.SERVICES_DOMAIN + "productAttributes/postCustomerCommunication",data);
  }

  //Toxicology
  getToxicology(data) {
    return this.http.get(Constants.SERVICES_DOMAIN + "productAttributes/postToxicology",data);
  }

  //Restricted Substance
  getRestrictedSubstance(data) {
    return this.http.get(Constants.SERVICES_DOMAIN + "productAttributes/postRestrictedSubstance",data);
  }

  //Sales Information
  getSalesInformation(data) {
    return this.http.get(Constants.SERVICES_DOMAIN + "productAttributes/postSalesInformation",data);
  }

  //Release Documents
  getReleaseDocuments(data) {
    return this.http.get(Constants.SERVICES_DOMAIN + "productAttributes/postReleaseDocuments",data);
  }

  //self Service Report
  getSelfServiceReport(data) {
    return this.http.get(Constants.SERVICES_DOMAIN + "productAttributes/postSelfServiceReport",data);
  }


  getSearchData() {
    return this.http.get('../../assets/momentive.json');
  }


  getOntologyDocuments() {
    return this.http.get('../../assets/ontology.json');
  }

}
