import { Component, OnInit } from '@angular/core';
import { MomentiveService} from './../../service/momentive.service';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';

@Component({
  selector: 'app-whole-ontology-management',
  templateUrl: './whole-ontology-management.component.html',
  styleUrls: ['./whole-ontology-management.component.css']
})
export class WholeOntologyManagementComponent implements OnInit {

  wholeontologySynonyms: any = [];
  userFilter: any = { key: '' };
  wholeSynonyms: any = [];

  constructor(private momentiveService: MomentiveService) { }

  ngOnInit() {

    this.momentiveService.getOntologyDocuments().subscribe(data => {
      this.wholeontologySynonyms = data;
      console.log(this.wholeontologySynonyms);
      this.wholeSynonyms = this.wholeontologySynonyms.whole_Synonyms;
      console.log(this.wholeSynonyms);
    }, err => {
    console.error(err);
  });
  }

}
