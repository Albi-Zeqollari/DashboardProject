import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';

import { Dashboard } from '../Interfaces/Dashboard';
import { Widgets } from '../Interfaces/Widgets';


@Component({
  selector: 'app-create-dashboard',
  templateUrl: './create-dashboard.component.html',
  styleUrls: ['./create-dashboard.component.scss']
})
export class CreateDashboardComponent implements OnInit {



  dashboard:Dashboard = new Dashboard(); 
  constructor(private dashboardService:DashboardService,private router:Router,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
  }


  saveDashboard(){

    this.dashboardService.createDashboard(this.dashboard).subscribe(data=>{

        this.goToDashboard();

    },error=>{

      this.openSnackbar()
    
    })
  
  }

  goToDashboard(){

    this.router.navigate(['/dashboard'])

  }

  onSubmit(){
    
    console.log(this.dashboard);
    
      this.saveDashboard();
      this.openSnackbar1()
  
    }


    openSnackbar(){

      this.snackBar.open("This name already exist || Please fill the form correctly","Dismmis",)
      
      }
      

      openSnackbar1(){

        this.snackBar.open("Dashboard added ","Dismmis")
        
        }
      
    


}
