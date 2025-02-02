import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MockDataService } from './services/mock-data.service';
import { BrowserModule } from '@angular/platform-browser';

export interface Task1 {
  time: string;
  score: number;
  info: string;
}
export interface Task2 {
  Deadline: string;
  Score: number;
  
}


export interface Results {
  score: number;
  tasks: { [key: string]: Task1 }; // Index signature for dynamic keys
}

export interface Zad {
  [key: string]:Task2 // Index signature for dynamic keys
}



@Component({
  selector: 'app-root',
  imports: [FormsModule,HttpClientModule, NgFor,NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  results: Results | null = null;
  zad: Zad | null = null;

  constructor(private mockDataService: MockDataService) {}
  title = 'TI';
  getKeys(obj: object): string[] {
    return Object.keys(obj);
  }
  czyPrzedDeadline(key: string): boolean{
    if(this.zad === null){
      return false;
    }
    let str1:string | undefined = this.results?.tasks[key].time;
    let str2:string | null = this.zad[key].Deadline;
    
    if(str1 != undefined && str2 != null) {
      console.log('hello');
     return  str1  <= str2;
    }
    else return false;
   }
  
  ngOnInit() {
    this.mockDataService.getMockData1().subscribe(
      (data) => {
        this.results = data;
        console.log(data);
      });
      this.mockDataService.getMockData2().subscribe(
        (data2) => {
          this.zad = data2;
          console.log(data2);
        });
  }
}
