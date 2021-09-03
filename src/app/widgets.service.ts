import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Widgets } from './Interfaces/Widgets';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {


  private api="http://localhost:8080/widgets"
  private api1="http://localhost:8080/widget"

  constructor(private http:HttpClient) { }


  getWidgets():Observable<Widgets[]>{

    return this.http.get<Widgets[]>(`${this.api}`)
  }

  createWidgets(widget:Widgets,dashboardId:string):Observable<Object>{

    return this.http.post(`${this.api}/${dashboardId}`,widget)
  }

  getWidgetByID(id:String):Observable<Widgets>
  {
    return this.http.get<Widgets>(`${this.api}/${id}`)
  }

  getWidgetBydashboardID(dashboardId:String):Observable<Widgets>
  {
    return this.http.get<Widgets>(`${this.api1}/${dashboardId}`)
  }
  
  updateWidget(id:String,widget:Widgets):Observable<Object>{
    return this.http.put(`${this.api}/${id}`,widget)
  }

  deleteWidget(id:String):Observable<Object>{

    return this.http.delete(`${this.api}/${id}`)
  }

   updatePosition(widget:Widgets):Observable<Object>{
     return this.http.put(`${this.api}`,widget)
   }
}
  