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
  userName:any;
  LogginUsername:any
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

    
    
    this.momentiveService.getAzureUserDetails().subscribe(data =>{
      console.log(data);
      this.userName =  data[0].user_claims.find(e=>e.typ=="name");
      console.log("*********")
      console.log(this.userName);
      console.log(this.userName.val);
      this.LogginUsername = localStorage.setItem('userName',this.userName.val);

      // this.momentiveService.setUserName('vinithkumar');

      //       for (var key in data[0]["user_claims"]) {
      //     var obj = data[0]["user_claims"][key];
      //     console.log("*********")
      //   console.log(obj["typ"]);   //claim type in user_claims
      //    console.log(obj["val"])    //claim value in user_claims     
      // }
    })
  }
}
