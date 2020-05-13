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


@Injectable()

//let url = environment.apiUrl;

export class MomentiveService {
  invokeEvent: Subject<any> = new Subject();
  invokeCheckEvent : Subject<any> = new Subject ();
  homeEvent: Subject<any> = new Subject();
  CategoryEvent: Subject<any> = new Subject();
  itemsNew: any = [];
  searchkey: any = [];

  selectedProduct: any;
  categorySelectedSPECList: any = [];
  ProductCategoryData: any;
  basicMaterialList: any = [];
  basicCASList: any = [];
  basicLevelList: any = [];
  selectedSpecList: any = [];
  productLevelAPIData: any = [];
  materialLevelData: any = [];
  casLevelData: any = [];
  intialAllSpecList:any =[];



  notifyObservable$ = this.invokeEvent.asObservable();
  notifyCheckObservable$ = this.invokeCheckEvent.asObservable()



  constructor(private http: HttpClient) {

  }

  //sideBar category and Subcategory Method call
  callMethodOfSecondComponent(data) {
    console.log(data);
    this.invokeEvent.next(data);
  }
  callMethodOfRadioComponent(data) {
    console.log(data);
    this.invokeCheckEvent.next(data);
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
    return this.http.post<any[]>(Constants.SERVICES_DOMAIN + "postSelectedSpecList", data);
  }

  //Homepage Data
  getHomePageData(data): Observable<any[]> {
    console.log(data);
    return this.http.post<any[]>(Constants.SERVICES_DOMAIN + "postHomePageData", data);
  }


  //Categories Details
  getSelectedCategories(data) {
    console.log(data);
    return this.http.post(Constants.SERVICES_DOMAIN + "selectedCategories", data);
  }

  //Basic Properties Details
  getBasicProperties(data) {
    return this.http.post(Constants.SERVICES_DOMAIN + "PostBasicProperties", data);
  }

  //Seven Categories Details

  //ProductAttributes
  getProductAttributes(data) {
    return this.http.post(Constants.SERVICES_DOMAIN + "postProductAttributes", data);
  }

  //ProductCompliance
  getProductCompliance(data) {
    return this.http.post(Constants.SERVICES_DOMAIN + "postProductCompliance", data);
  }

  //CustomerCommunication
  getCustomerCommunication(data) {
    return this.http.post(Constants.SERVICES_DOMAIN + "postCustomerCommunication", data);
  }

  //Toxicology
  getToxicology(data) {
    return this.http.post(Constants.SERVICES_DOMAIN + "postToxicology", data);
  }

  //Restricted Substance
  getRestrictedSubstance(data) {
    return this.http.post(Constants.SERVICES_DOMAIN + "postRestrictedSubstance", data);
  }

  //Sales Information
  getSalesInformation(data) {
    return this.http.post(Constants.SERVICES_DOMAIN + "postSalesInformation", data);
  }

  //Release Documents
  getReportDocuments(data) {
    return this.http.post(Constants.SERVICES_DOMAIN + "postReportData", data);
  }

  getOntologyDocumentss(data) {
    return this.http.post(Constants.SERVICES_DOMAIN + "postOntologyDocument", data);
  }
  getOntologyManagement() {
    return this.http.get(Constants.SERVICES_DOMAIN + "getOntologyManagement");
  }

  addSynonymsEvent(data) {
    return this.http.post(Constants.SERVICES_DOMAIN + "postUpdateOntologyManagement", data);
  }

  addAdditionalDeatils(data) {
    return this.http.post(Constants.SERVICES_DOMAIN + "postOtherDetails", data);
  }
  
  //self Service Report
  getSelfServiceReport(data) {
    return this.http.post(Constants.SERVICES_DOMAIN + "postSelfServiceReport", data);
  }


  setSelectedProductData(value) {
    this.selectedProduct = value;
    console.log(this.selectedProduct);
  }

  getSelectedProductData() {
    return this.selectedProduct;

  }

  //Category Click Data
  setCategoryData(value) {
    this.ProductCategoryData = value;
    console.log(this.ProductCategoryData);
  }

  getCategoryData() {
    return this.ProductCategoryData;
  }

  //Category SpecList Data

  setCategorySpecList(value) {
    this.categorySelectedSPECList = value;
    console.log(this.categorySelectedSPECList);
  }

  getCategorySpecList() {
    console.log(this.categorySelectedSPECList);
    return this.categorySelectedSPECList;
  }

  //Intial All Spec List
  setAllSpecList(value) {
    this.intialAllSpecList = value;
    console.log(this.intialAllSpecList)
  }

  getAllSpecList() {
    return this.intialAllSpecList;
  }
  
  setBasicLevelDetails(value) {
    this.basicLevelList = value;
    console.log(this.basicLevelList);
  }
  getbasicLevelDetails() {
    return this.basicLevelList
  }

  setProductLevelDetails(value) {
    this.productLevelAPIData = value;
    console.log(this.productLevelAPIData)
  }

  getProductLevelDetails() {
    return this.productLevelAPIData;
  }

  setMaterialLevelDetails(value) {
    this.materialLevelData = value;
    console.log(this.materialLevelData);
  }
  getMaterialLevelDetails() {
    return this.materialLevelData;
  }

  setCasLevelDetails(value) {
    this.casLevelData = value;
    console.log(this.casLevelData);
  }
  getCasLevelDetails() {
    return this.casLevelData
  }

  getSearchData() {
    return this.http.get('../../assets/momentive.json');
  }


  getOntologyDocuments() {
    return this.http.get('../../assets/ontology.json');
  }

}
