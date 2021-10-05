import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-topclient',
  templateUrl: './topclient.component.html',
  styleUrls: ['./topclient.component.css']
})
export class TopclientComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() number:number = 0
  @Input() fullname:string = ''
  @Input() email:string = ''

}
