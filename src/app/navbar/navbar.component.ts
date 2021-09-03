import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { Dashboard } from '../Interfaces/Dashboard';
import { Widgets } from '../Interfaces/Widgets';
import { WidgetsService } from '../widgets.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  id!:String
  dashboards!:Dashboard[];

  wid:Widgets= new Widgets();


  constructor(private dashboardService:DashboardService,private route:ActivatedRoute,private router:Router,private widServ:WidgetsService) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    this.wid = new Widgets()

    this.widServ.getWidgetBydashboardID(this.id).subscribe(data=>{

      console.log(data);
      
    })


  
    this.getDashboards();

  

    }

  private getDashboards(){
    this.dashboardService.getDashboardList().subscribe(data=>{

      this.dashboards =data;
      console.log(data);
      
      

    })
  }

  go(id?:String){

    this.router.navigate(['/dashboards/',id])
  }
 
}
