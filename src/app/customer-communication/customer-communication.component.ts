import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Attribute } from '@angular/compiler';
import { MatTableDataSource} from '@angular/material';
import {TableModule} from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatDatepickerInputEvent} from '@angular/material/datepicker';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption} from '@ng-select/ng-select';
import { MomentiveService} from '../service/momentive.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-customer-communication',
  templateUrl: './customer-communication.component.html',
  styleUrls: ['./customer-communication.component.css']
})
export class CustomerCommunicationComponent implements OnInit {
    selecteditem:any;
    dateForm: FormGroup;
    name = '';
    selectednav: 'active';
    product_Name: any = [];
    product_type: any = [];
    copyproduct_type: any = [];
    products_Empty  = false;
    value: string;
    type: string;
    items: string[];
    selectedIndex: number;
    selectedId: any;
    selectedboxId: any;
    customerCommunicationChecks: any = [];
    customerCommunicationTab = 'US FDA Letter';
    usFDA = true;
    EuFoodContact = false;
    heavyMetals = false;
    communicationHistory = false;
    communicationPart: any = [];
    communicationBU: any = [];
    topicCommunication: any = [];
    productCommunication: any = [];
    productTitle: any;
    cols: any[];
    ccHeavyMetals_Data: any[];
    ccHeavyMetals_Header: any[];
  // Communication History
    CommunicationHistoryData: any[];
    CommunicationHistoryHead: any[];
    commuicationDataCheck: any;
    CopycommunicationHistoryData: any[];
    events: any;
    showDatefield = false;
    ExcelCommunicationHistoryData = [];
    product_NameData: any[];
    Searchname: any;
    productCAS_Number: any;
    radiovalue: any;
    selectedBUValue: any;
    selectedProductValue: any;
    selectedCustomerValue: any;
    parentObject: any;
    productdata: any = [];
    objectKeys = Object.keys;
    constructor(private fb: FormBuilder, private route: ActivatedRoute,
                private router: Router,
                private momentiveService: MomentiveService,
                ) {

      this.dateForm = fb.group({
        start_Date: new FormControl(new Date()),
        end_Date: new FormControl(new Date()),
      });
    }
    ngOnInit() {


      this.momentiveService.notifyObservable$.subscribe(value => {
        this.selecteditem = value;
        console.log(this.selecteditem);
        if (this.selecteditem) {
          setTimeout(() => {
            this.onChangeCommunication(this.selecteditem);
         }, 0);
       }
      });


 

      this.CopycommunicationHistoryData = [
        {
          case_number: '68083-19-2',
          first_level: 'Product/Material Information',
          second_level: 'Customer Product Quality Questionnaires',
          manufacturing_plant: '-',
          material_description: '-',
          material_number: '-',
          tier_owner: '-',
          customer_name: 'OU EUROBIO LAB',
          bu: 'Specialty Fluids.',
          product_name: 'LSR2050A - US Made',
          topic: 'Customer Product Quality Questionnaires',
          email_Content: [
            {
              contact_email: 'dmitri.zagorski@eurobiolab.ee',
              case_subject: 'RE: [External]Vegan, Silsoft AX [ ref:_00Di0JCXZ._5000Z1FPZxB:ref ]',
             iupac_name: 'Slica8',
             attached_docs: 'LSR2560 - FDA compliance letter to DARMSTÄDTER GmbH',
             // tslint:disable-next-line: max-line-length
             text_body: 'Dear Sender, In addition to the CIDP for Silsoft AX, please also find the requested Vegan Declaration completed attached. I understand that this form is related to the manufacturing of the product and raw materials.',
            },
          {
            contact_email: 'dmitri.zagorski@eurobiolab.ee',
            case_subject: 'RE: [External]Vegan, Silsoft AX [ ref:_00Di0JCXZ._5000Z1FPZxB:ref ]',
            attached_docs: '05-2358-G6_INTRACUTANEOUS INJECTON TEST_LSR 885',
            // tslint:disable-next-line: max-line-length
            text_body: 'Dear Dmitri, In addition to the CIDP for Silsoft AX, please also find the requested Vegan Declaration completed attached. I understand that this form is related to the manufacturing of the product and raw materials.',
        },
        {
        contact_email: 'dmitri.zagorski@eurobiolab.ee',
        case_subject: 'RE: [External]Vegan, Silsoft AX [ ref:_00Di0JCXZ._5000Z1FPZxB:ref ]',
        attached_docs: '05-2358-G6_INTRACUTANEOUS INJECTON TEST_LSR 885',
       // tslint:disable-next-line: max-line-length
        text_body: 'Momentive routinely screens incoming and outgoing mail messages for viruses, addressees should scan this e-mail and any attachments for viruses themselves.',
         }],
        },
        {
          case_number: '140641',
          first_level: 'Product/Material Information',
          second_level: 'Customer Product Quality Questionnaires',
          manufacturing_plant: '-',
          material_description: '-',
          material_number: '-',
          tier_owner: '-',
          customer_name: 'Bang & Bonsomer LLC Moscow',
          bu: 'Elastomers',
          product_name: 'LSR2003A',
          topic: 'Regulatory Information - National or Regional Inventories',
          email_Content: [{
            contact_email: 'dmitri.zagorski@eurobiolab.ee',
            attached_docs: '05-2358-G6_INTRACUTANEOUS INJECTON TEST_LSR 885',
            case_subject: 'RE: [External]Vegan, Silsoft AX [ ref:_00Di0JCXZ._5000Z1FPZxB:ref ]',
            // tslint:disable-next-line: max-line-length
            text_body: 'Dear Dmitri, In addition to the CIDP for Silsoft AX, please also find the requested Vegan Declaration completed attached. I understand that this form is related to the manufacturing of the product and raw materials.',
          }]
        },
        {
          case_number: '140643',
          first_level: 'Product/Material Information',
          second_level: 'Customer Product Quality Questionnaires',
          manufacturing_plant: '-',
          material_description: '-',
          material_number: '-',
          tier_owner: '-',
          customer_name: 'ART COSMETICS SRL VIA E.',
          bu: 'Electronic Materials.',
          product_name: 'LSR2003B',
          topic: 'Regulatory Information - Sustainability',
          email_Content: [{
            contact_email: 'dmitri.zagorski@eurobiolab.ee',
            attached_docs: 'Silsoft 840 Manufacturing flow diagram',
            case_subject: 'RE: [External]Vegan, Silsoft AX [ ref:_00Di0JCXZ._5000Z1FPZxB:ref ]',
            // tslint:disable-next-line: max-line-length
            text_body: 'This is perfect newtexts. Please fill Vegan declaration that was attached in previous email Lugupidamisega / Best regards / С уважением, Dmitri Zagorski Head of Purchasing Department Tel: +3726120121 Mob:+372 58 181807 Skype ost.eurobiolab',
          }]
        },
        {
          case_number: '140644',
          first_level: 'Product/Material Information',
          second_level: 'Customer Product Quality Questionnaires',
          manufacturing_plant: '-',
          material_description: '-',
          material_number: '-',
          tier_owner: '-',
          customer_name: 'Azelis Australia Pty LTd.',
          bu: 'Basics.',
          product_name: 'LSR2050B - US Made',
          topic: 'Regulatory Information - Sustainability',
          email_Content: [{
            contact_email: 'dmitri.zagorski@eurobiolab.ee',
            attached_docs: 'LSR2560 - FDA compliance letter to DARMSTÄDTER GmbH',
            case_subject: 'RE: [External]Vegan, Silsoft AX [ ref:_00Di0JCXZ._5000Z1FPZxB:ref ]',
            // tslint:disable-next-line: max-line-length
            text_body: 'striving to improve service to its customers. In order to do this, we would like to ask you to always contact the Commercial Services Center first in case of a request/inquiry.',
          }]
        },
        {
          case_number: '140645',
          first_level: 'Product/Material Information',
          second_level: 'Customer Product Quality Questionnaires',
          manufacturing_plant: '-',
          material_description: '-',
          material_number: '-',
          tier_owner: '-',
          customer_name: 'AZELIS CANADA INC.',
          bu: 'Urethane Additives.',
          product_name: 'LSR2060A - US Made',
          topic: 'Regulatory Information - National or Regional Inventories',
          email_Content: [{
            contact_email: 'dmitri.zagorski@eurobiolab.ee',
            case_subject: 'RE: [External]Vegan, Silsoft AX [ ref:_00Di0JCXZ._5000Z1FPZxB:ref ]',
            attached_docs: '05-2358-G6_INTRACUTANEOUS INJECTON TEST_LSR 885',
           // tslint:disable-next-line: max-line-length
            text_body: 'Momentive routinely screens incoming and outgoing mail messages for viruses, addressees should scan this e-mail and any attachments for viruses themselves.',
          }]
        },
        {
          case_number: '00116026',
          first_level: '	Regulatory Information - Animal Testing',
          second_level: 'Customer Product Quality Questionnaires',
          manufacturing_plant: '-',
          material_description: '-',
          material_number: '-',
          tier_owner: '-',
          customer_name: 'Bang & Bonsomer PJC.',
          bu: 'Sealants.',
          product_name: 'Silsoft* ETS',
          topic: 'Regulatory Information - National or Regional Inventories',
          email_Content: [{
            contact_email: 'dmitri.zagorski@eurobiolab.ee',
            case_subject: 'RE: [External]Vegan, Silsoft AX [ ref:_00Di0JCXZ._5000Z1FPZxB:ref ]',
            // tslint:disable-next-line: max-line-length
            text_body: 'Hi Sunny, Please kindly find the attached documents, Our customer would like to know why the INCI name of Silsoft 860 are different in Composition breakdown and PDS. Also, Polyalkyleneoxide cannot be found on China INCI list (2015 version),.',
            attached_docs: 'TIR Silwet 408 lot 17ESVX180',
          }]
        },
        {
          case_number: '00116027',
          first_level: '	Regulatory Information - Animal Testing',
          second_level: 'Customer Product Quality Questionnaires',
          manufacturing_plant: '-',
          material_description: '-',
          material_number: '-',
          tier_owner: '-',
          customer_name: 'Bang & Bonsomer PJC.',
          bu: 'Sealants.',
          product_name: 'Silsoft* A-843 conditioning agent',
          topic: 'Regulatory Information - National or Regional Inventories',
          email_Content: [{
            contact_email: 'dmitri.zagorski@eurobiolab.ee',
            attached_docs: 'TIR Silwet 408 lot 17ESVX180',
            case_subject: 'RE: [External]Vegan, Silsoft AX [ ref:_00Di0JCXZ._5000Z1FPZxB:ref ]',
            // tslint:disable-next-line: max-line-length
            text_body: 'Hi Sunny, Please kindly find the attached documents, Our customer would like to know why the INCI name of Silsoft 860 are different in Composition breakdown and PDS. Also, Polyalkyleneoxide cannot be found on China INCI list (2015 version),.',
          }]
        },
      ];
      // communicationPart
      this.momentiveService.getSearchData().subscribe(data => {
        this.productdata = data;
        this.communicationPart = this.productdata.communicationPart;
        console.log(this.communicationPart);
      }, err => {
        console.error(err);
      });
      // communicationBU
      this.momentiveService.getSearchData().subscribe(data => {
        this.productdata = data;
        this.communicationBU = this.productdata.communicationBU;
        console.log(this.communicationBU);
      }, err => {
        console.error(err);
      });
      // productCommunication
      this.momentiveService.getSearchData().subscribe(data => {
        this.productdata = data;
        this.productCommunication = this.productdata.productCommunication;
        console.log(this.productCommunication);
      }, err => {
        console.error(err);
      });
     // topicCommunication
      this.momentiveService.getSearchData().subscribe(data => {
        this.productdata = data;
        this.topicCommunication = this.productdata.topicCommunication;
        console.log(this.topicCommunication);
      }, err => {
        console.error(err);
      });
     // customerCommunicationChecks
      this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.customerCommunicationChecks = this.productdata.customerCommunicationChecks;
      console.log(this.customerCommunicationChecks);
    }, err => {
      console.error(err);
    });

  // cols
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.cols = this.productdata.cols;
    console.log(this.cols);
  }, err => {
    console.error(err);
  });

  // ccHeavyMetals_Data
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.ccHeavyMetals_Data = this.productdata.ccHeavyMetals_Data;
    console.log(this.ccHeavyMetals_Data);
  }, err => {
    console.error(err);
  });
  // CommunicationHistoryHead
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.CommunicationHistoryHead = this.productdata.CommunicationHistoryHead;
    console.log(this.CommunicationHistoryHead);
  }, err => {
    console.error(err);
  });
  // CommunicationHistoryData
      this.momentiveService.getSearchData().subscribe(data => {
    this.productdata = data;
    this.CommunicationHistoryData = this.productdata.CommunicationHistoryData;
    console.log(this.CommunicationHistoryData);
    this.CommunicationHistoryData.forEach(obj => {
    this.ExcelCommunicationHistoryData.push({
    'Case Number': obj.case_number,
    '1st Level Case Classification': obj.first_level,
    '2nd Level Case Classification': obj.second_level,
    'Contact Email': obj.contact_email,
    'Case Subject': obj.case_subject,
    'Text Body': obj.text_body,
    'Manufacturing Plantr': obj.manufacturing_plant,
    'Material Description': obj.material_description,
    'Material Number': obj.material_number,
    'Tier 2 Owner': obj.tier_owner,
    'Attached Documents': obj.attached_docs,
  });
  });
  }, err => {
    console.error(err);
  });

}

 
    onChangeCommunication(item) {
      this.customerCommunicationTab = item;
      if (this.customerCommunicationTab === 'US FDA Letter') {
        this.usFDA = true;
        this.EuFoodContact = false;
        this.heavyMetals = false;
        this.communicationHistory = false;
      } else if (this.customerCommunicationTab === 'EU Food Contact') {
        this.usFDA = false;
        this.EuFoodContact = true;
        this.heavyMetals = false;
        this.communicationHistory = false;
      } else if ( this.customerCommunicationTab === 'Heavy Metals Composition') {
        this.heavyMetals = true;
        this.communicationHistory = false;
        this.usFDA = false;
        this.EuFoodContact = false;
      } else if (this.customerCommunicationTab === 'Communication History') {
        this.heavyMetals = false;
        this.communicationHistory = true;
        this.usFDA = false;
        this.EuFoodContact = false;
      }
    }
 

     communicationProcess(data) {
      this.commuicationDataCheck = data;
      console.log(this.commuicationDataCheck);
      // tslint:disable-next-line: max-line-length
      this.CommunicationHistoryData = this.CopycommunicationHistoryData.filter((communication) => ( communication.customer_name  === this.commuicationDataCheck 
      || communication.product_name === this.commuicationDataCheck
      || communication.bu === this.commuicationDataCheck
      || communication.topic === this.commuicationDataCheck));
      console.log(this.CommunicationHistoryData);
      }
    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
      this.events = event.value;
      console.log(this.events);
    }
    chooseDate() {
      this.showDatefield = true;
    }
    createOwner(value) {
  console.log(value);
    }
    onCancel() {
      this.showDatefield = false;
    }

  onItemSelect(item: any) {
      console.log(item);
  }
  OnItemDeSelect(item: any) {
      console.log(item);
  }
  onSelectAll(items: any) {
      console.log(items);
  }
  onDeSelectAll(items: any) {
      console.log(items);
  }

  customerNameFilter() {
    const CustomerNameData = 'OU EUROBIO LAB';
    this.CommunicationHistoryData = this.CopycommunicationHistoryData.filter((customer) => (customer.customer_name == CustomerNameData ));
    console.log(this.CommunicationHistoryData);
  }
  customSort(event) {
    event.data.sort((data1, data2) => {
        const value1 = data1[event.field];
        const value2 = data2[event.field];
        const result = null;

        if (value1 == null && value2 != null) {
            const result = -1;
        } else if (value1 != null && value2 == null) {
          const result = 1;
        } else if (value1 == null && value2 == null) {
          const result = 0;
        } else if (typeof value1 === 'string' && typeof value2 === 'string') {
          const  result = value1.localeCompare(value2);
         } else {
          const result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
 }
        return (event.order * result);
    });
}


unselect(): void {
  this.selectedBUValue = undefined;
  this.selectedProductValue = undefined;
  this.selectedCustomerValue = undefined;
}

  }