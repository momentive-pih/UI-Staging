import { AfterViewInit, Component, OnDestroy , OnInit, ViewChild, ElementRef,ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Attribute, IfStmt } from '@angular/compiler';
import { MatTableDataSource } from '@angular/material';
import { TableModule } from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { HomeService } from '../service/home-service.service';
import { Observable, Subject ,ReplaySubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption, NgSelectComponent } from '@ng-select/ng-select';
import { MomentiveService } from '../service/momentive.service';
import { Router, ActivatedRoute, NavigationStart, NavigationExtras} from '@angular/router';
import { take, takeUntil } from 'rxjs/operators';
import { MatSelect } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';



declare var $: any;
interface product {
  name: string;
}

interface Bank {
  id: string;
  name: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']

})


export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  sideSearchData: any;
  name = '';
  selectednav: 'active';
  secondaryNavBar = false;
  placeholder: string;
  keyword: string;
  historyHeading: string;
  product_Name: any = [];
  ProductDrop: any = [];
  reactiveForm: FormGroup;
  SpecreactiveForm:FormGroup
  product_type: any = [];
  copyproduct_type: any = [];
  compositionPart: any = [];
  value: string;
  type: string;
  cols: any[];
  SearchProducts: any;
  searchDataLength: any;
  searchProductList: any = [];
  selectedCategoryKey: any;
  sidebarselectedData: any = [];
  // Composition Data
  legalCompositionData: any[];
  legalCompositionHead: any[];
  selectedlegalCompositionProducts: any[];
  hunderedCompositionHead: any[];
  hunderedCompositionData: any[];
  copyhunderedCompositionData: any[];
  selectedhunderedCompositionProducts: any[];
  standardCompositionHead: any[];
  standardCompositionData: any[];
  copystandardCompositionData: any[];
  copylegalCompositionData: any[];
  selectedStandardCompositionProducts: any[];
  ExcelStandardData = [];
  ExcelStandardSubData = [];
  newStandardData = [];
  // Communication History
  CommunicationHistoryData: any[];
  CommunicationHistoryHead: any[];
  commuicationDataCheck: any;
  CopycommunicationHistoryData: any[];
  events: any;
  showDatefield = false;
  ExcelCommunicationHistoryData = [];
  product_NameData: any[];
  sidebarData: any;
  copysidebarData: any = [];
  productLsr_Name: any = [];
  productSilsoft_Name: any = [];
  Searchname: any;
  productCAS_Number: any;
  basicDetails = true;
  submitDetails = false;
  intialData_Details: any = [];
  productLevel: any = [];
  MaterialLevel: any = [];
  casLevel: any = [];
  LsrproductLevel: any = [];
  LsrMaterialLevel: any = [];
  LsrcomponentLevel: any = [];
  HomeDataDetails: any = [];
  basicBoxDetails = false;
  sidenavDetails: any;
  searchRelatedMessage = false;
  // New Data;
  productdata: any = [];
  categoriesType: any = [];
  url: any;
  currentURL: any;
  sidebarIcon = true;
  Isfirst = true;
  sidebarselectedKey: any;
  searchdropdownlist = false;
  selectedSearchText: any
  selectedSearchNew: any;
  suggestionDrop = false;
  nextLibAvailable = true;
  categoriesTypeCount: any;
  categoriesCount: any = [];
  typecount = {};
  categoryType: any;
  selectedproductType: any;
  selectedProducts = false;
  basicProperties: any = []
  searchAlertMessage: any;
  relatedProducts = true;
  searchLoader = false;
  searchTextTerms:any;
  searchTerm:any;
  objectKeys = Object.keys;
  public items$: Observable<product[]>;
  public input$ = new Subject<string | null>();

  /**SPECID dropdown List */

  SPECdropdownList:any = [];
  selectedSPECItems:any = [];
  dropdownSettings = {};
  firstSpecData = [];
  selectedSpecList:any = [];
  banks:any = [];
  specDataListDetails:any;
  sideSpecList:any;
  userSelectedSPECDetails:any=[];
  basicPropertiesLoader:any;
  public loading;
  notifier:any;


    /** control for the selected bank for multi-selection */
    public bankMultiCtrl: FormControl = new FormControl();
     
    /** control for the MatSelect filter keyword multi-selection */
    public bankMultiFilterCtrl: FormControl = new FormControl();
  
    /** list of banks filtered by search keyword */
    public filteredBanksMulti: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);
  
    @ViewChild('multiSelect',{static:false}) multiSelect: MatSelect;
  
    /** Subject that emits when the component has been destroyed. */
    protected _onDestroy = new Subject<void>();

  @ViewChild('code', {
    static: false
  }) private codeRef?: ElementRef<HTMLElement>;
  @ViewChild('code', {
    static: true
  }) myselect: ElementRef;
  constructor(private fb: FormBuilder,public toastr: ToastrManager, vcr: ViewContainerRef,private route: ActivatedRoute, private router: Router, private homeService: HomeService, private momentiveService: MomentiveService) {

  

    this.momentiveService.homeEvent.subscribe(data =>{
      this.ngOnInit()
    })

    
  
    this.reactiveForm = fb.group({
      selectedSearchNew: ['', Validators.required],
    });
    console.log( this.reactiveForm.value);

    this.SpecreactiveForm = fb.group({
      selectedSPECItems: ['', Validators.required],
    })
    this.input$.subscribe(
      (term) => this.searchProduct(term, this.product_Name, this.Isfirst)); 
  }
  ngOnInit() {
    this.categoryType = 'NAM Product'
    this.url = window.location.href.includes('home');
    console.log(this.url);


    // intialData_Details
    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.intialData_Details = this.productdata.intialData_Details;
    }, err => {
      console.error(err);
    });
    // product_type
    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.product_type = this.productdata.product_type;
    }, err => {
      console.error(err);
    });
    $(document).on('click', function (event) {
      if (!$(event.target).closest('.dropdown-select').length) {
        $('.option-list, .search-box').hide();
      }
    });
    $('.select').click(function (event) {
      //$('.option-list, .search-box').hide();
      $(this).closest('.dropdown-select').find('.option-list, .search-box').toggle();
    });
    //Search

    this.placeholder = 'Enter the Details';
    this.keyword = 'name';
    this.historyHeading = 'Recently selected';

    this.copyproduct_type = [
      {
        product_name: '000000069023 LSR 2680FC B-C3 	Liquid Silicone Rubber - Component B',
        id: 'LSR 2680FC A',
        Name: 'Product Attributes',
        image: 'https://5.imimg.com/data5/CS/BR/MY-3222221/pharmaceuticals-chemicals-500x500.jpg',
        modal_id: 'composition',
        tab_modal: 'compositionModal'
      },
      {
        product_name: '000000069023 LSR 2680FC B-C3 	Liquid Silicone Rubber - Component B',
        id: 'LSR 2680FC A',
        Name: 'Product Complaince',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3WDKemmPJYhXsoGknA6nJwlRZTQzuYBY4xmpWAbInraPIJfAT',
        modal_id: 'product_Compliance',
        tab_modal: 'complianceModal'
      },
      {
        product_name: '000000069023 LSR 2680FC B-C3 	Liquid Silicone Rubber - Component B',
        id: 'LSR 2680FC A',
        Name: 'Customer Communication',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzuuf2CXVDH2fVLuKJRbIqd14LsQSAGaKb7_hgs9HAOtSsQsCL',
        modal_id: 'customerCommunication',
        tab_modal: 'communicationModal'
      },
      {
        product_name: '000000069023 LSR 2680FC B-C3 Liquid Silicone Rubber - Component B',
        id: 'LSR 2680FC A',
        Name: 'Restricted Substance',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnJXf4wky23vgRlLzdkExEFrkakubrov2OWcG9DTmDA1zA2-U-',
        modal_id: 'restrictedSubstance',
        tab_modal: 'restrictedSubstanceModal'
      },
      {
        product_name: '000000069023 LSR 2680FC B-C3 Liquid Silicone Rubber - Component B',
        id: 'LSR 2680FC A',
        Name: 'Toxicology',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnge4Y9lv59WO3hYGJRSerUUSTG1FUWE4MNlFPaLu2CFOc0rsR',
        modal_id: 'toxicology',
        tab_modal: 'toxicologyModal'
      },
      {
        product_name: '000000069023 LSR 2680FC B-C3 	Liquid Silicone Rubber - Component B',
        id: 'LSR 2680FC A',
        Name: 'Sales Information',
        image: 'https://flaptics.io/images/yu.png',
        modal_id: 'sales_Information',
        tab_modal: 'salesModal'
      },
      {
        product_name: '000000069023 LSR 2680FC B-C3 	Liquid Silicone Rubber - Component B',
        id: 'LSR 2680FC A',
        Name: 'Report Data',
        image: 'https://medschool.duke.edu/sites/medschool.duke.edu/files/styles/interior_image/public/field/image/reports.jpg?itok=F7UK-zyt',
        modal_id: 'report_Data',
        tab_modal: 'reportModal'
      },
      {
        product_name: '000000069023 LSR 2680FC B-C3',
        id: 'LSR 2680FC A',
        Name: 'Self Service Report',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSReXGibHOlD7Z5nNqD4d4V52CVMmi-fGUEKMH2HE7srV_SzNn_g',
        modal_id: 'serviceReport',
        tab_modal: 'serviceReportModal'
      }];
    this.copysidebarData = [
      {
        product_name: '000000069023 LSR 2680FC B-C3 	Liquid Silicone Rubber - Component B',
        id: 'LSR 2680FC A',
        Name: 'Product Attributes',
        image: 'https://5.imimg.com/data5/CS/BR/MY-3222221/pharmaceuticals-chemicals-500x500.jpg',
        sales_tab: 'product_attribute',
        modal_id: 'composition',
        tab_modal: 'compositionModal',
        tab_content: [
          {
            name: 'Basic Information',
            id: 1,
          },
          {
            name: 'GHS Labeling',
            id: 2,
          },
          {
            name: 'Structures and Formulas',
            id: 3,
          },
          {
            name: 'Composition',
            id: 4,
          },
          {
            name: 'Flow Diagrams',
            id: 5,
          }],
      },
      {
        product_name: '000000069023 LSR 2680FC B-C3 	Liquid Silicone Rubber - Component B',
        id: 'LSR 2680FC A',
        Name: 'Product Complaince',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3WDKemmPJYhXsoGknA6nJwlRZTQzuYBY4xmpWAbInraPIJfAT',
        sales_tab: 'product_Compliance',
        modal_id: 'product_Compliance',
        tab_modal: 'complianceModal',
        tab_content: [
          {
            name: 'Notification Status',
            id: 1,
          },
          {
            name: 'AG Registration Status',
            id: 2,
          }],
      },
      {
        product_name: '000000069023 LSR 2680FC B-C3 	Liquid Silicone Rubber - Component B',
        id: 'LSR 2680FC A',
        Name: 'Customer Communication',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzuuf2CXVDH2fVLuKJRbIqd14LsQSAGaKb7_hgs9HAOtSsQsCL',
        sales_tab: 'customerCommunication',
        modal_id: 'customerCommunication',
        tab_modal: 'communicationModal',
        customer_name: 'OU EUROBIO LAB',
        tab_content: [
          {
            name: 'US FDA Letter',
            id: 1,
          },
          {
            name: 'EU Food Contact',
            id: 2,
          },
          {
            name: 'Heavy Metals Composition',
            id: 3,
          },
          {
            name: 'Communication History',
            id: 4,
          }],
      },
      {
        product_name: '000000069023 LSR 2680FC B-C3 	Liquid Silicone Rubber - Component B',
        id: 'LSR 2680FC A',
        Name: 'Toxicology',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnge4Y9lv59WO3hYGJRSerUUSTG1FUWE4MNlFPaLu2CFOc0rsR',
        sales_tab: 'toxicology',
        modal_id: 'toxicology',
        tab_modal: 'toxicologyModal',
        tab_content: [
          {
            name: 'Study Title and Date',
            id: 1,
          },
          {
            name: 'Monthly Toxicology Study List',
            id: 2,
          },
          {
            name: 'Toxicology Summary',
            id: 2,
          },
          {
            name: 'Toxicology Registration Tracker',
            id: 2,
          }],
      },
      {
        product_name: '000000069023 LSR 2680FC B-C3 	Liquid Silicone Rubber - Component B',
        id: 'LSR 2680FC A',
        Name: 'Restricted Substance',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnJXf4wky23vgRlLzdkExEFrkakubrov2OWcG9DTmDA1zA2-U-',
        sales_tab: 'restrictedSubstance',
        modal_id: 'restrictedSubstance',
        tab_modal: 'restrictedSubstanceModal',
        tab_content: [
          {
            name: 'GADSL',
            id: 1,
          },
          {
            name: 'California Pro 65',
            id: 2,
          }],
      },
      {
        product_name: '000000069023 LSR 2680FC B-C3 	Liquid Silicone Rubber - Component B',
        id: 'LSR 2680FC A',
        Name: 'Sales Information',
        image: 'https://flaptics.io/images/yu.png',
        sales_tab: 'sales_Information',
        modal_id: 'sales_Information',
        tab_modal: 'salesModal',
        tab_content: [
          {
            name: 'Sales Volume',
            id: 1,
          },
          {
            name: 'Location Details',
            id: 2,
          }],
      },
      {
        product_name: '000000069023 LSR 2680FC B-C3 	Liquid Silicone Rubber - Component B',
        id: 'LSR 2680FC A',
        Name: 'Report Data',
        image: 'https://medschool.duke.edu/sites/medschool.duke.edu/files/styles/interior_image/public/field/image/reports.jpg?itok=F7UK-zyt',
        sales_tab: 'report_Data',
        modal_id: 'report_Data',
        tab_modal: 'reportModal',
        tab_content: [
          {
            name: 'Relesed Documents',
            id: 1,
          }],
      }];
    this.copylegalCompositionData = [
      {
        ComponentType: 'Active ingredient',
        Component_Id: '000000002925',
        CAS_Number: '68083-19-2',
        Component_Name: [
          {
            cas_name: 'Decamethylcyclopentasiloxane',
            iupac_name: 'Cyclopentasiloxane, decamethyl-',
            INCI_Name: ['CYCLOPENTASILOXANE'],
          }],
        Value: '86%'
      },
      {
        ComponentType: 'Active ingredient',
        Component_Id: '000000002670',
        CAS_Number: '556-67-2',
        Component_Name: [
          {
            cas_name: 'Octamethylcyclotetrasiloxane',
            iupac_name: 'Cyclotetrasiloxane, octamethyl-',
            INCI_Name: ['CYCLOTETRASILOXANE', 'CYCLOMETHICONE'],
          }],
        Value: '14%'
      }];
    this.copyhunderedCompositionData = [
      {
        ComponentType: 'Active ingredient',
        Component_Id: '000000002766',
        CAS_Number: '68083-19-2',
        Component_Name: [
          {
            cas_name: 'Slica',
            iupac_name: 'Slica',
            INCI_Name: ['slica', 'SOLUM DIATOMEAE'],
          }],
        Value: '29.85%'
      },
      {
        ComponentType: 'Active ingredient',
        Component_Id: '000000002652',
        CAS_Number: '999-97-3',
        Component_Name: [
          {
            cas_name: 'Hexamethyldisilazane',
            iupac_name: 'Silanamine 1,1,1-trimethyl-N-(trimethylsilyl)-',
          }],
        Value: '6.62%'
      }, {
        ComponentType: 'Active ingredient',
        Component_Id: '000000002932',
        CAS_Number: '7691-02-3',
        Component_Name: [
          {
            cas_name: 'Divinyltetramethyldisilazane',
            iupac_name: '1,3-Divinyltetramethyldisilazane',
          }],
        Value: '1.24%'
      }, {
        ComponentType: 'Active ingredient',
        Component_Id: '000000002670',
        CAS_Number: '556-67-2',
        Component_Name: [
          {
            cas_name: 'Octamethylcyclotetrasiloxane',
            iupac_name: 'Cyclotetrasiloxane, octamethyl-',
            INCI_Name: ['CYCLOTETRASILOXANE', 'CYCLOMETHICONE'],
          }],
        Value: '0.12%'
      }, {
        ComponentType: 'Active ingredient',
        Component_Id: '000000003091',
        CAS_Number: '2627-95-4',
        Component_Name: [
          {
            cas_name: 'Divinyltetramethyldisiloxane',
            iupac_name: 'DISILOXANE, 1,3-DIETHINYL-1,1,3,3-TETRAMETHYL-',
          }],
        Value: '0.12%'
      }, {
        ComponentType: 'Active ingredient',
        Component_Id: '000000002678',
        CAS_Number: '2554-06-5',
        Component_Name: [
          {
            cas_name: 'Cyclotetrasiloxane, 2,4,6,8-tetraethenyl-2,4,6,8-tetramethyl-',
            iupac_name: 'CYCLOTETRASILOXANE, 2,4,6,8-TETRAETHYLENE-2,4,6,8-TETRAMETHYL-',
          }],
        Value: '0.53%'
      }];
    this.copystandardCompositionData = [
      {
        ComponentType: 'Active ingredient',
        Component_Id: '000000002925',
        CAS_Number: '68083-19-2',
        Component_Name: [
          {
            cas_name: 'Decamethylcyclopentasiloxane',
            iupac_name: 'Cyclopentasiloxane decamethyl-',
            INCI_Name: ['CYCLOPENTASILOXANE'],
          }],
        Value: '84.06%'
      },
      {
        ComponentType: 'Impurity',
        Component_Id: '000000002681',
        CAS_Number: '70131-67-8',
        Component_Name: [
          {
            cas_name: 'Siloxanes and Silicones, di-Me hydroxy terminated',
            iupac_name: 'Dimethylpolysiloxane',
          }],
        Value: '15%'
      }, {
        ComponentType: 'Impurity',
        Component_Id: '000000003060',
        CAS_Number: '540-97-6',
        Component_Name: [
          {
            cas_name: 'Dodecamethylcyclohexasiloxane',
            iupac_name: 'Cyclohexasiloxane Dodecamethyl-',
            INCI_Name: ['CYCLOHEXASILOXANE'],
          }],
        Value: '2.1%'
      }, {
        ComponentType: 'Impurity',
        Component_Id: '000000002932',
        CAS_Number: '556-67-2',
        Component_Name: [
          {
            cas_name: 'Octamethylcyclotetrasiloxane',
            iupac_name: 'Cyclotetrasiloxane, octamethyl-',
            INCI_Name: ['CYCLOTETRASILOXANE', 'CYCLOMETHICONE'],
          }],
        Value: '0.704 %'
      }];
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
            text_body: 'Dear Sender, In addition to the CIDP for Silsoft AX, please also find the requested Vegan Declaration completed attached. I understand that this form is related to the manufacturing of the product and raw materials.',
          },
          {
            contact_email: 'dmitri.zagorski@eurobiolab.ee',
            case_subject: 'RE: [External]Vegan, Silsoft AX [ ref:_00Di0JCXZ._5000Z1FPZxB:ref ]',
            attached_docs: '05-2358-G6_INTRACUTANEOUS INJECTON TEST_LSR 885',
            text_body: 'Dear Dmitri, In addition to the CIDP for Silsoft AX, please also find the requested Vegan Declaration completed attached. I understand that this form is related to the manufacturing of the product and raw materials.',
          },
          {
            contact_email: 'dmitri.zagorski@eurobiolab.ee',
            case_subject: 'RE: [External]Vegan, Silsoft AX [ ref:_00Di0JCXZ._5000Z1FPZxB:ref ]',
            attached_docs: '05-2358-G6_INTRACUTANEOUS INJECTON TEST_LSR 885',
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
          text_body: 'Hi Sunny, Please kindly find the attached documents, Our customer would like to know why the INCI name of Silsoft 860 are different in Composition breakdown and PDS. Also, Polyalkyleneoxide cannot be found on China INCI list (2015 version),.',
        }]
      },];


    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 1,
      clearSearchFilter: false,
      allowSearchFilter: true
    };
  }

  groupByFn = (item) => item.product;
  public selectionItemForFilter(e) {
    const colsTempor = e.value;
    colsTempor.sort(function (a, b) {
      return a.index - b.index;
    });
    this.cols = [];
    this.cols = colsTempor;
    if (e.value.length > 10) {
      e.value.pop();
    }
  }
  selectEvent(item) {
    // do something with selected item
    console.log(item);
  }
  onChangeSearch(data) {
    if (data.length > 2) {
      console.log(data);
      this.product_NameData = this.product_Name.filter((ProductName) => (ProductName.includes(data)));
      console.log(this.product_NameData);
    }
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  onFocused(data) {
    this.onChangeSearch(data);
  }
  communicationProcess(data) {
    this.commuicationDataCheck = data;
    console.log(this.commuicationDataCheck);
    this.CommunicationHistoryData = this.CopycommunicationHistoryData.filter((communication) => (communication.customer_name === this.commuicationDataCheck || communication.product_name === this.commuicationDataCheck || communication.bu === this.commuicationDataCheck || communication.topic === this.commuicationDataCheck));
    console.log(this.CommunicationHistoryData);
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
  private searchProduct(term: string | null, arr, Isfirst) {
    this.suggestionDrop = true;
    this.searchTerm = term ? term : '';
    this.SearchProducts = {
      'SearchData': this.searchTerm
    };
    console.log(this.SearchProducts);
    this.searchDataLength = this.SearchProducts.SearchData.length;
    if (this.searchDataLength > 2 && Isfirst) {
      this.loading = true
      this.momentiveService.getAllEvents(this.SearchProducts).subscribe(data => {
        if (data) {
          this.loading = false;
          console.log('inside', data.concat([]));
          this.product_Name = data;
          this.product_Name.forEach(element => {
            if (this.ProductDrop.indexOf(element.type) == -1) {
              this.ProductDrop.push(element.type);
            }
          });
          console.log(this.searchTerm);

           if(this.searchTerm.includes("*")) {
            const searchTermNew = this.searchTerm.split('*');
            this.searchTextTerms = searchTermNew[1];
            console.log(this.searchTextTerms);
           }
        
          this.items$ = this.product_Name.filter((product_Name) => {
            return product_Name.name.toLowerCase().startsWith(this.searchTerm.toLowerCase()) ||
             product_Name.type.toLowerCase().startsWith(this.searchTerm.toLowerCase()) || 
             product_Name.key.toLowerCase().startsWith(this.searchTerm.toLowerCase()) || 
             product_Name.name.toLowerCase().startsWith(this.searchTextTerms.toLowerCase());
          });
        } 
      }, err => {
        console.log(err);
      })
    } else if (Isfirst === false) {
      this.loading = false;
      this.items$ = this.product_Name.filter((product_Name) => {
        return product_Name.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
         product_Name.type.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          product_Name.key.toLowerCase().includes(this.searchTerm.toLowerCase()) 
      });
    } else if (this.searchDataLength <= 0 && Isfirst) {
      this.loading = false;
      this.product_Name = [];
      this.ProductDrop = [];
      this.clearCheck();
      this.items$ = this.product_Name.filter((product_Name) => {
        return product_Name.name.toLowerCase().startsWith(this.searchTerm.toLowerCase()) || 
        product_Name.type.toLowerCase().startsWith(this.searchTerm.toLowerCase()) ||
         product_Name.key.toLowerCase().startsWith(this.searchTerm.toLowerCase());
      });
    }
    else if (this.searchDataLength === 0 && Isfirst) {
      this.loading = false;
      this.product_Name = [];
      this.items$ = this.product_Name.filter((product_Name) => {
        return product_Name.name.toLowerCase().startsWith(this.searchTerm.toLowerCase()) || 
        product_Name.type.toLowerCase().startsWith(this.searchTerm.toLowerCase()) || 
        product_Name.key.toLowerCase().startsWith(this.searchTerm.toLowerCase());
      });
    }
  }
  compareAccounts = (item, selected) => {
    if (selected.name && item.name) {
      return item.name === selected.name;
    }
    if (item.name && selected.name) {
      return item.name === selected.name;
    }
    return false;
  };
  onChangeData(data) {
    this.selectedProducts = true;
    this.selectedSearchText = data;
    this.secondaryNavBar = true;
    this.momentiveService.homeEvent.next();
    this.momentiveService.setSelectedProductData(this.selectedSearchText);
    this.router.navigate(['/app-home']);
    localStorage.setItem('SearchBarData', JSON.stringify(data))
    if (data.length <= 0) {
      this.product_Name = [];
      this.basicDetails = true;
      this.selectedProducts = false;
      this.searchProduct('', this.product_Name, this.Isfirst)
      this.router.navigate(['/app-pageindex']);
      this.secondaryNavBar = false;
    }
    this.product_Name = [];
    if (data.length > 0) {
      this.selectedProducts = true;
      this.product_Name = [];
      this.ProductDrop = [];
      this.momentiveService.getSelectedProducts(data).subscribe((res) => {
        this.Isfirst = false;
        console.log(res);
        this.product_Name = res;
        this.product_Name.forEach(element => {
          if (this.ProductDrop.indexOf(element.type) == -1) {
            this.ProductDrop.push(element.type);
          }
        });
        if (this.product_Name.length > 0) {
          this.searchProduct('', this.product_Name, this.Isfirst);
        } else {
          alert('NO More Related Products Available');
          this.relatedProducts = false;
          this.product_Name = [];
          this.searchProduct('', this.product_Name, this.Isfirst)
        }
      }, err => {
        console.log(err);
      })
      this.getIntialSpecList(this.selectedSearchText);
    }
    //Basic Details API
    // this.momentiveService.getBasicProperties(data).subscribe(data => {
    //   this.basicProperties = data;
    //   console.log(this.basicProperties);
    //   this.productLevel = this.basicProperties[0].productLevel;
    //   console.log(this.productLevel);
    //   this.MaterialLevel = this.basicProperties[1].MaterialLevel;
    //   console.log(this.MaterialLevel);
    //   this.casLevel = this.basicProperties[2].CasLevel;
    //   console.log(this.casLevel);
    // }, err => {
    //   console.error(err);
    // });
  }
  clearCheck() {
    this.product_Name = [];
    this.suggestionDrop = false;
    this.Isfirst = true;
    this.ProductDrop = [];
  }
  // fileter the Standard Composition-CAS Number
  casNumberFileter() {
    // tslint:disable-next-line: variable-name
    const CAS_data = '68083-19-2';
    this.standardCompositionData = this.copystandardCompositionData.filter((casNumber) => (casNumber.CAS_Number === CAS_data));
    console.log(this.standardCompositionData);
    this.hunderedCompositionData = this.copyhunderedCompositionData.filter((casNumber) => (casNumber.CAS_Number === CAS_data));
    console.log(this.hunderedCompositionData);
    this.legalCompositionData = this.copylegalCompositionData.filter((casNumber) => (casNumber.CAS_Number === CAS_data));
    console.log(this.legalCompositionData);
  }
  customerNameFilter() {
    const CustomerNameData = 'OU EUROBIO LAB';
    this.CommunicationHistoryData = this.CopycommunicationHistoryData.filter((customer) => (customer.customer_name == CustomerNameData));
    console.log(this.CommunicationHistoryData);
  }

  fireEvent(event) {
    if (event === 'productDetails') {
      $('#basicDetails').modal('show');
      this.basicPropertiesLoader = [];
      this.userSelectedSPECDetails =this.momentiveService.categorySelectedSPECList;
      this.momentiveService.getBasicProperties(this.userSelectedSPECDetails).subscribe(data => {
      this.basicProperties = data;
      if(this.basicProperties.length > 0) {
        this.basicPropertiesLoader = false;
        this.productLevel = this.basicProperties[0].productLevel;
        this.MaterialLevel = this.basicProperties[0].materialLevel;
        this.casLevel = this.basicProperties[0].CASLevel;
      } else {
          this.basicPropertiesLoader = true;
      } 
   
      }, err => {
        console.error(err);
      });
    }
  }
  Ongtology() {
    this.router.navigate(['/app-ontology-home']);
  }
  changePage(url, data) {
    if (data) {
      this.sidebarIcon = true;
    } else {
      this.sidebarIcon = false;
    }
    this.router.navigate(['/' + url]);
  }
  UnassignedDocuments() {
    this.router.navigate(['ontology/unassigned-documents'])
  }
  OntologyMasterManagement() {
    this.router.navigate(['/ontology/synonyms']);
  }
  home() {
    this.router.navigate(['/app-pageindex']);
  }

  //SpecID Droopdownlist
  getIntialSpecList(data) {
      const SpecListedData = data;
    this.momentiveService.getSpecList(SpecListedData).subscribe(data => {
      console.log(data)
      this.SPECdropdownList = data; 
      this.banks = this.SPECdropdownList;
      if(this.banks.length === 1) {
        this.specDataListDetails = false;
      } else {
        this.specDataListDetails = true;
      }
     // set initial selection
     this.bankMultiCtrl.setValue([this.banks[0]]);
     this.momentiveService.setCategorySpecList([this.banks[0]]);
     // load the initial bank list
     this.filteredBanksMulti.next(this.banks.slice());
     // listen for search field value changes
     this.bankMultiFilterCtrl.valueChanges
       .pipe(takeUntil(this._onDestroy))
       .subscribe(() => {
         this.filterBanksMulti();
       });
      console.log(this.SPECdropdownList);
    }, err => {
      console.log(err);
    })
  }

  
  selectAll(checkAll, select, values) {
    alert('dddd')
    //this.toCheck = !this.toCheck;
    if(checkAll){
      select.update.emit(values); 
    }
    else{
      select.update.emit([]);
    }
  }

  selectedTopSpecList() {
    console.log(this.bankMultiCtrl.value);
    this.sideSpecList = this.bankMultiCtrl.value[0];
    console.log(this.sideSpecList);
    this.momentiveService.homeEvent.next();
     this.momentiveService.setSelectedProductData(this.sideSpecList);
     this.momentiveService.setCategorySpecList(this.bankMultiCtrl.value);
     this.toastr.successToastr('Specification ID Selected.', 'Success!');
  }


  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  toggleSelection(change) :void {
    this.filteredBanksMulti.pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(val => {
        if (change.checked) {
          this.bankMultiCtrl.patchValue(val);
        } else {
          this.bankMultiCtrl.patchValue([]);
        }
      })
      
  }


  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filteredBanksMulti
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // this.multiSelect.compareWith = (a: Bank, b: Bank) => a && b && a.id === b.id;
      });
  }

  protected filterBanksMulti() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.bankMultiFilterCtrl.value;
    console.log(search)
    if (!search) {
      this.filteredBanksMulti.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanksMulti.next(
      this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }
}
