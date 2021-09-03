import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateDashboardComponent } from 'src/app/create-dashboard/create-dashboard.component';
import { DashboardService } from 'src/app/dashboard.service';
import { Dashboard } from 'src/app/Interfaces/Dashboard';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EditDashboardComponent } from 'src/app/edit-dashboard/edit-dashboard.component';
import { Observable } from 'rxjs/internal/Observable';
import { ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {



  dashboards!:Dashboard[];

  constructor(private dashboardService:DashboardService,public dialog:MatDialog,private router:Router,private changeDetectorRef: ChangeDetectorRef,
     private snackBar:MatSnackBar) { }


  ngOnInit(): void {

    this.getDashboards();

  }


  private getDashboards(){
    this.dashboardService.getDashboardList().subscribe(data=>{

      this.dashboards =data

    })
  }

  openDialog(){

    let dialogRef=this.dialog.open(CreateDashboardComponent,{
      
    })
    dialogRef.afterClosed().subscribe(result => {  

      this.getDashboards();
    });
  }

  openDialog1(id?:String){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = id

    let dialogRef=this.dialog.open(EditDashboardComponent,dialogConfig)
    dialogRef.afterClosed().subscribe(result => {

      this.getDashboards();
    
    });
  }



   editDashboard(id?:String){

     this.router.navigate(['/dashboard',id])

  }

  viewDashboard(id?:String){
    
    this.router.navigate(['/dashboards',id])
  }
  

  deleteDashboard(id?:String){

    if(confirm("Are you sure?")){
      this.dashboardService.deleteDashboard(id!).subscribe(data=>{

        this.getDashboards();
  
        this.openSnackbar()

      },error=>{

       
      })
    }
    
  } 

  openSnackbar(){

    this.snackBar.open("You cant delete a dashboard who has widgets. If it is deleted then that dashboard has no widgets","Dismmis",)
    
    }


}
