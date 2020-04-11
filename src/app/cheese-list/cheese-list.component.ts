import { Component, OnInit } from '@angular/core';
import { HttpClient } from  "@angular/common/http";
import {Observable} from "rxjs";
import {DataService} from "../data.service";
import {CheeseModel} from "./cheese.model";


@Component({
  selector: 'app-cheese-list',
  templateUrl: './cheese-list.component.html',
  styleUrls: ['./cheese-list.component.css']
})
export class CheeseListComponent implements OnInit {

  constructor(private cheeseService: DataService) { }

  numberOfPages = 1;
  firstPage;
  lastPage;
  currentPage = 1;
  cheeses = [];

  ngOnInit() {
    this.getPage(this.currentPage);
  };

  getPage = function (pageNumber) {

    // DEBUG:
    // this.cheeseService.getData(pageNumber).subscribe(data => console.log(data));

    this.cheeseService.getData(pageNumber).subscribe(data => this.cheeses = data['hydra:member']);
  };

  getNextPage = function () {
    if (this.lastPage === this.currentPage) {
      return;
    }

    this.getPage(this.currentPage+1);
    this.currentPage++;
  };

  getPreviousPage = function () {
    if (1 === this.currentPage) {
      return;
    }

    this.getPage(this.currentPage-1);
    this.currentPage--;
  };

  getFirstPage = function () {
    this.cheeseService.getData().subscribe(data => this.getFirstPageNumber(data));
  };

  getFirstPageNumber = function (data) {
    return this.firstPage = data['hydra:view']['hydra:first'].split("page=")[1];
  }

  getLastPage = function () {
    this.cheeseService.getData().subscribe(data => this.getLastPageNumber(data));
  };

  getLastPageNumber = function (data) {
    return this.lastPage = data['hydra:view']['hydra:last'].split("page=")[1];
  }

  // TODO : Creer service qui s'occuper de recuperer les données de pagniations ;)
}
