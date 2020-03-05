import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Attribute } from '@angular/compiler';
import {MatTableDataSource} from '@angular/material';
import {TableModule} from 'primeng/table';
import * as frLocale from 'date-fns/locale/fr';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {HomeService} from '../service/home-service.service';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgSelectModule, NgOption} from '@ng-select/ng-select';
import { MomentiveService} from '../service/momentive.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
// import * as jsPDF from 'jspdf';
// var jsPDF = require('jspdf');
// require('jspdf-autotable');
declare let jsPDF;
import html2canvas from 'html2canvas';
declare var $: any;



@Component({
  selector: 'app-view-report',
  templateUrl: './view-report.component.html',
  styleUrls: ['./view-report.component.css']
})
export class ViewReportComponent implements OnInit {

  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

  SelectAllcheckValue = false;
  userFilter: any = { Name: '' };
  name = '';
  selectednav: 'active';
  product_Name: any = [];
  product_type: any = [];
  sidebarCategoriesData: any = [];
  viewReportPage = false;
  noReportPage = false;
  viewIntialPage = true;
  sidenavDetails: any;
  parentObject: any;
  pdfIcon = false;
  searchRelatedMessage = false;
  // New Data;
  productdata: any = [];
  productApplication:any =[];
  thirdLevelData: any =[];
  thirdlevelCheckvalue: any = [];

  // Report Code

  firstcCategories = false;
  secondCategories = false;
  thirdCategories = false;

  viewReportId: any;
  UserSelectedProducts: any =[];
  objectKeys = Object.keys;
  constructor(private fb: FormBuilder, private route: ActivatedRoute,
              private router: Router, private homeService: HomeService,
              private momentiveService: MomentiveService) {


  }

  ngOnInit() {
    this.viewReportId = localStorage.getItem('SearchBarData');

    this.UserSelectedProducts =JSON.parse(localStorage.getItem('SearchBarData'));

    if (this.UserSelectedProducts.length > 0) {
      this.noReportPage = true;
      this.viewReportPage = false;
      this.viewIntialPage = false;
    }

    // sidebarCategoriesDat

    this.momentiveService.getSearchData().subscribe(data => {
      this.productdata = data;
      this.sidebarCategoriesData = this.productdata.sidebarCategoriesData;
      console.log(this.sidebarCategoriesData);
    }, err => {
      console.error(err);
    });

    this.productApplication = [
      { app_id: 1, app_text: 'Dental / surgical devices' },
      { app_id: 2, app_text: 'Diagnostics / imaging' },
      { app_id: 3, app_text: 'Fluid and drug delivery devices' },
      { app_id: 4, app_text: 'Orthopedics / prosthetics' },
      { app_id: 5, app_text: 'Advanced Wound Care & Scar Management' },
      { app_id: 6, app_text: 'Septa / stoppers / laboratory accessories' },
      { app_id: 7, app_text: 'Wound drains and bulbs' },
      { app_id: 8, app_text: 'Sterilization mats' },
      { app_id: 9, app_text: 'Pharmaceutical closures' },
      { app_id: 10, app_text: 'Positioning devicess' },
      { app_id: 11, app_text: 'Catheters' },
      { app_id: 12, app_text: 'Seals / dialysis o-rings / valves' },
      { app_id: 13, app_text: 'Respiratory / anesthesia' },
      { app_id: 14, app_text: 'Medical equipment keypads' },
    ];
    

  }









  selectEvent(item) {
    // do something with selected item
    console.log(item);
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

intialSort() {
  return 0;
}


public downloadAsPDF() {

  const data = document.getElementById('pdfTable');
  data.setAttribute('style','right:0; top:0; bottom:0;padding:20px;');
html2canvas(data).then(canvas => {
  var options = {
    beforePageContent: header,
    pagesplit: true,
  };
      var contentWidth = canvas.width;
      var contentHeight = canvas.height;

    

      //The height of the canvas which one pdf page can show;
      var pageHeight = contentWidth / 592.28 * 841.89;
      console.log(pageHeight);
      //the height of canvas that haven't render to pdf
      var leftHeight = contentHeight;
      console.log(leftHeight);

      //addImage y-axial offset
      var position = 0;
      //a4 format [595.28,841.89]	      
      var imgWidth = 595.28;
      var imgHeight = 592.28/contentWidth * contentHeight;

      var pageData = canvas.toDataURL('image/jpeg', 1.0);

      var pdf = new jsPDF('p', 'pt', 'a4');
      // pdf.page = 1;

      
     var tbl_res = pdf.autoTableHtmlToJson(document.getElementById('mytable'));        
     pdf.autoTable(tbl_res.columns, tbl_res.data, options);
       pdf.internal.scaleFactor = 2.25;


     // let columns = ["ID", "Name", "Age", "City"];
      // var data = [
      //     [1, "Jonatan", 25, "Gothenburg"],
         
      // ];

   
      var riskoptions = {
        tableWidth: 'auto',
        addPageContent: header,
        margin: {  top: 5, horizontal: 7 },
        // startY: pdf.autoTableEndPosY() + 40,
        columnStyles: {0: {columnWidth: 'wrap'}}
       
    };
      var header = function(data) {
        pdf.setFontSize(18);
        pdf.setTextColor(40);
        pdf.setFontStyle('normal');
        //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
        // pdf.text("Testing Report", pdf.settings.margin.left, 50);
      };
    
    //   function footer() { 
    //     pdf.text(150,285, 'page ' + pdf.page); //print number bottom right
    //     pdf.page ++;
    // };

      // pdf.internal.getVerticalCoordinateString(y),"","Td"

     if (leftHeight < pageHeight) {
          pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
      } else {
          while(leftHeight > 0) {
              pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
              leftHeight -= pageHeight;
              position -= 841.89;
              //avoid blank page
              if(leftHeight > 0) {
                pdf.addPage();  
                   
              }
          }
      }
  
      pdf.save('Momentive-' + new Date() + '.pdf'); 
 
  })
    }


SelectAllCategories(checkStatus) {
  console.log(checkStatus);
  console.log(this.sidebarCategoriesData);
  if(checkStatus) {
    this.sidebarCategoriesData.forEach(element => {element.checkValue = true;
if(element.tab_content.length > 0) {
  element.tab_content.forEach(element => {element.checkValue = true;
    if (element.sub.length > 0) {
 element.sub.forEach(childelement => {childelement.checkValue = true;
});
}
this.viewReportPage = true; 
this.noReportPage = false;
});
}
    });
  } else {
    this.sidebarCategoriesData.forEach(element => {element.checkValue = false;
      if(element.tab_content.length > 0) {
        element.tab_content.forEach(element => {element.checkValue = false;
          if (element.sub.length > 0) {
       element.sub.forEach(childelement => {childelement.checkValue = false;
      });
      }
      });

      this.viewReportPage = false; 
       this.noReportPage = true;  
      }
          });
} 
}

topCheckBox(checkStatus, data) {
  console.log(checkStatus)
 if (checkStatus === true) {
    data.tab_content.forEach(element => {element.checkValue = true;
         if (element.sub.length > 0) {
      element.sub.forEach(childelement => {childelement.checkValue = true;
    });
  }
    });
  } else {
    this.SelectAllcheckValue = false;
    data.tab_content.forEach(element => {element.checkValue = false;
          if (element.sub.length > 0) {
              element.sub.forEach(childelement => {childelement.checkValue = false;
      });
    }
  });
}
}
subCheckBox(checkStatus,data,id,top_id) {
  console.log(top_id);
  console.log(id);
  console.log(checkStatus);
  console.log(data);
  console.log(this.sidebarCategoriesData);
  // this.parentObject = this.sidebarCategoriesData[top_id].tab_content[id];
  // console.log(this.parentObject);
  // if(checkStatus === false){
  //   alert('1');
  //   this.SelectAllcheckValue = false;
  //   this.sidebarCategoriesData.forEach(element => { element.checkValue = false;
  //     this.sidebarCategoriesData[top_id]
  //     console.log(this.sidebarCategoriesData[top_id]);
  //   });
  // }
  // if (checkStatus) {
  //     this.pdfIcon = true;
  //     data.checkValue = true;
  //     let i = 0;
  //     this.parentObject.tab_content.forEach(element => {
  //    if (element.checkValue) {
  //      element.sub.forEach(childelement => { childelement.checkValue = true;
  //      });
  //      i++;
  //    }
  //    console.log(i, this.parentObject.tab_content.length);
  //    if (i === this.parentObject.tab_content.length) {
  //     this.parentObject.checkValue = true;
  //   }
  //  });
  //  } else {
  //   data.checkValue = false;
  //   this.parentObject.checkValue = false;
  //   data.sub.forEach(element => { element.checkValue = false;
  //   });
  //  }



  this.parentObject = this.sidebarCategoriesData[id];
  console.log(this.parentObject);
  if (checkStatus) {
      this.pdfIcon = true;
      data.checkValue = true;
      let top_id ;
      this.parentObject.tab_content.forEach(element => {
     if (element.checkValue) {
       element.sub.forEach(childelement => { childelement.checkValue = true;
       });
       top_id++;
     }
     console.log(top_id, this.parentObject.tab_content.length);
     if (top_id === this.parentObject.tab_content.length) {
      this.parentObject.checkValue = true;
    }
     console.log(this.parentObject);
   });
   } else {
    this.SelectAllcheckValue = true;
    data.checkValue = false;
    this.parentObject.checkValue = false;
    data.sub.forEach(element => { element.checkValue = false;
    });
   }
}


nextsubCheckBox(checkStatus, data, id) {
  console.log(checkStatus);
console.log(id);
  this.parentObject = this.sidebarCategoriesData[id];
  console.log(this.parentObject);
  if (checkStatus) {
    this.pdfIcon = true;
    this.parentObject.tab_content[id].checkValue = true;
  } else if (this.parentObject.tab_content[id].name) {
      console.log(this.parentObject.tab_content[id].name);
      this.SelectAllcheckValue = false;
      this.parentObject.checkValue = false;
      this.parentObject.tab_content[id].checkValue = false;
  } else {
    this.SelectAllcheckValue = true;
    this.parentObject.checkValue = true;
    this.parentObject.tab_content[id].checkValue = true; 
  }
  }

}
