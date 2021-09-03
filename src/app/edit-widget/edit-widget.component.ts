import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { Dashboard } from '../Interfaces/Dashboard';
import { Widgets } from '../Interfaces/Widgets';
import { WidgetsService } from '../widgets.service';

@Component({
  selector: 'app-edit-widget',
  templateUrl: './edit-widget.component.html',
  styleUrls: ['./edit-widget.component.scss']
})
export class EditWidgetComponent implements OnInit {


  id!:String
  widget:Widgets = new Widgets();

  constructor(private widgetsServ:WidgetsService,private route:ActivatedRoute,private router:Router,private dialog:MatDialog,
    private snackBar:MatSnackBar,private dialogRef: MatDialogRef<EditWidgetComponent>,
    @Inject(MAT_DIALOG_DATA) data:any) { 

      this.id = data;
   
      
    }

  ngOnInit(): void {  

  
    
    // this.id = this.route.snapshot.params['id'];

    this.widgetsServ.getWidgetByID(this.id).subscribe(data=>{

      this.widget =data;
    })
    }

    onSubmit(){


      this.widgetsServ.updateWidget(this.id,this.widget).subscribe(data=>{

        this.goTOdash();

      })
    }

    goTOdash(){

      this.router.navigate(["/dashboards/" + this.widget.dashboardId])
    }

  
    
    openSnackbar(message:any){

      this.snackBar.open(message,"Dismmis")
      
      }
  
}
