import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-records-table',
  templateUrl: './records-table.component.html',
  styleUrls: ['./records-table.component.sass']
})
export class RecordsTableComponent implements OnInit {

  constructor(private router: ActivatedRoute,
              private data: DataService) { }

  public list: any[] = [];
  ngOnInit() {
    this.data.getRecordsList().subscribe( res => {
      this.list = res;
      this.list.sort((a, b) => b.defeated.length - a.defeated.length);
    });
  }

}
