import { Component, Input, OnInit } from '@angular/core';
import { RecordInterface } from '../home.page';

@Component({
  selector: 'app-perform',
  templateUrl: './perform.component.html',
  styleUrls: ['./perform.component.scss'],
})
export class PerformComponent implements OnInit {
  @Input() record: RecordInterface;
  constructor() { }

  ngOnInit() {}

}
