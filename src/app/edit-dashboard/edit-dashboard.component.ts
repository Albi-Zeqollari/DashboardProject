import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../dashboard.service';
import { Dashboard } from '../Interfaces/Dashboard';

@Component({
  selector: 'app-edit-dashboard',
  templateUrl: './edit-dashboard.component.html',
  styleUrls: ['./edit-dashboard.component.scss']
})
export class EditDashboardComponent implements OnInit {

  id!:String
  dashboard:Dashboard = new Dashboard();
  constructor(private dashService:DashboardService, private route:ActivatedRoute,private router:Router,private toastr: ToastrService,
    private snackBar:MatSnackBar,private dialogRef: MatDialogRef<EditDashboardComponent>,
    @Inject(MAT_DIALOG_DATA) data:any) {


      this.id= data;
     }

  ngOnInit(): void {

    // this.id = this.route.snapshot.params['id'];

    this.dashService.getDashboardByID(this.id).subscribe(data=>{

      this.dashboard = data;
    },error => console.log(error));
  }

  
  onSubmit(){

    this.dashService.updateDashboard(this.id,this.dashboard).subscribe(data=>{
      
    this.goToDashboard();

    
    })
  }

  goToDashboard(){

    this.router.navigate(['/dashboard'])
  }

  
openSnackbar(message:any){

this.snackBar.open(message,"Dismmis")

}

}
