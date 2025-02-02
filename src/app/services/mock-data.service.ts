import { NgModule } from '@angular/core'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';



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
export interface Zad{
  [key: string]: Task2; // Index signature for dynamic keys
}

interface resultResponse {
  results: Results[]
}

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private jsonUrl1 = 'https://bikol.vm.wmi.amu.edu.pl/tin/results/485942'; 
  private jsonUrl2 = 'https://bikol.vm.wmi.amu.edu.pl/tin/tasks'; 
  constructor(private http: HttpClient) {}
  getMockData1(): Observable<Results> {
    console.log(this.http.get<Results>(this.jsonUrl1));
    return this.http.get<Results>(this.jsonUrl1);

  }
  getMockData2(): Observable<Zad> {
    return this.http.get<Zad>(this.jsonUrl2);
  }
}
