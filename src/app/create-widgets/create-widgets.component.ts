import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../dashboard.service';
import { Dashboard } from '../Interfaces/Dashboard';
import { Widgets } from '../Interfaces/Widgets';
import { WidgetsService } from '../widgets.service';

@Component({
  selector: 'app-create-widgets',
  templateUrl: './create-widgets.component.html',
  styleUrls: ['./create-widgets.component.scss']
})
export class CreateWidgetsComponent implements OnInit {


  dashboardId!:any

  widget:Widgets = new Widgets(); 

  constructor(private widgetService:WidgetsService,private router:Router,private dashServ:DashboardService,private route:ActivatedRoute,
    private dialogRef: MatDialogRef<CreateWidgetsComponent>,
        @Inject(MAT_DIALOG_DATA) data:any,private toastr: ToastrService,private snackBar:MatSnackBar) {

          console.log(data);
          
          this.dashboardId = data
         }

  ngOnInit(): void {

    console.log(this.dashboardId);
    

    }

  saveWidgets(){

    this.widget.dashboardId = this.dashboardId

    this.widgetService.createWidgets(this.widget,this.dashboardId).subscribe(data=>{

      console.log(data);  

    },error=>{

      this.openSnackbar()
    })
  }

  onSubmit(){
    console.log(this.widget);
    this.saveWidgets();

   
  }


  openSnackbar(){

    this.snackBar.open("This name already exist || Please fill the form correctly(Empty from not allowed)","Dismmis",)
    
    }
 
}
