import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }


  retour(){
    this.router.navigateByUrl("/orders")
  }

}
