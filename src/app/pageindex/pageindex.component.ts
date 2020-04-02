import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MomentiveService} from '../service/momentive.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-pageindex',
  templateUrl: './pageindex.component.html',
  styleUrls: ['./pageindex.component.css']

})
export class PageindexComponent implements OnInit {
  PageIndexData: any;
  productData: any = [];
  constructor(private route: ActivatedRoute,
              private router: Router,
              private momentiveService: MomentiveService) {
  }

  ngOnInit() {

    //Categories index Details API call 
    this.momentiveService.getSearchData().subscribe(data => {
      this.productData = data;
      this.PageIndexData = this.productData.sidebarData;
      console.log(this.PageIndexData);
    }, err => {
      console.error(err);
    });
  }
}
