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

  selectedProduct:any;

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
  getHomePageData(data): Observable<any[]> {
    console.log(data);
    return this.http.post<any[]>(Constants.SERVICES_DOMAIN + "postHomePageData",data);
  }


  //Categories Details
  getSelectedCategories(data) {
    console.log(data);
    return this.http.post(Constants.SERVICES_DOMAIN + "selectedCategories", data);
  }

  //Basic Properties Details
  getBasicProperties(data) {
    return this.http.get(Constants.SERVICES_DOMAIN + "PostbasicProperties",data);
  }

  //Seven Categories Details

 //ProductAttributes
  getProductAttributes(data) {
    return this.http.get(Constants.SERVICES_DOMAIN + "productAttributes/postProductAttributes",data);
  }

  //ProductCompliance
  getProductCompliance(data) {
    return this.http.get(Constants.SERVICES_DOMAIN + "postProductCompliance",data);
  }

  //CustomerCommunication
  getCustomerCommunication(data) {
    return this.http.get(Constants.SERVICES_DOMAIN + "postCustomerCommunication",data);
  }

  //Toxicology
  getToxicology(data) {
    return this.http.get(Constants.SERVICES_DOMAIN + "postToxicology",data);
  }

  //Restricted Substance
  getRestrictedSubstance(data) {
    return this.http.get(Constants.SERVICES_DOMAIN + "postRestrictedSubstance",data);
  }

  //Sales Information
  getSalesInformation(data) {
    return this.http.get(Constants.SERVICES_DOMAIN + "postSalesInformation",data);
  }

  //Release Documents
  getReportDocuments(data) {
    return this.http.get(Constants.SERVICES_DOMAIN + "postReportDocuments",data);
  }

  //self Service Report
  getSelfServiceReport(data) {
    return this.http.get(Constants.SERVICES_DOMAIN + "postSelfServiceReport",data);
  }


  setSelectedProductData(value){
    this.selectedProduct = value;
    console.log(this.selectedProduct);
  }

  getSelectedProductData(){
    return this.selectedProduct;
  }


  getSearchData() {
    return this.http.get('../../assets/momentive.json');
  }


  getOntologyDocuments() {
    return this.http.get('../../assets/ontology.json');
  }

}
