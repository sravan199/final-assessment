import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApibackendService {

  constructor(private http:HttpClient) { }

  fetchQuestionsData(ApiUrl:string){
    return this.http.get(ApiUrl);
   };


   postAnswer(ApiUrl:string,data){
  return this.http.put(ApiUrl,data);
 };

}
