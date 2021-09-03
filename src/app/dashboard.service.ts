import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboard } from './Interfaces/Dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  private api = "http://localhost:8080/dashboard"


  private baseUrl = 'http://localhost:8080/tutorials';
  
  constructor(private http:HttpClient) { }



  getAll(params: any): Observable<Dashboard> {
    return this.http.get(this.baseUrl, { params });
  }


  getDashboardList():Observable<Dashboard[]>{

    return this.http.get<Dashboard[]>(`${this.api}`)
  }

  createDashboard(dashboard:Dashboard):Observable<Object>{

    return this.http.post(`${this.api}`,dashboard)
  }

  getDashboardByID(id:String):Observable<Dashboard>{
    return this.http.get<Dashboard>(`${this.api}/${id}`)
  }


  updateDashboard(id:String, dashboard:Dashboard):Observable<Object>{
    return this.http.put(`${this.api}/${id}`,dashboard)
  }
  
  deleteDashboard(id:String):Observable<Object>{

    return this.http.delete(`${this.api}/${id}`)
  }

}
