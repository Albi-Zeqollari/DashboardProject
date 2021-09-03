import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CompactType, DisplayGrid, Draggable, GridsterConfig, GridsterItem, GridType, PushDirections, Resizable } from 'angular-gridster2';


import { CreateWidgetsComponent } from 'src/app/create-widgets/create-widgets.component';
import { DashboardService } from 'src/app/dashboard.service';
import { EditWidgetComponent } from 'src/app/edit-widget/edit-widget.component';
import { Dashboard } from 'src/app/Interfaces/Dashboard';
import { Widgets } from 'src/app/Interfaces/Widgets';
import { WidgetsService } from 'src/app/widgets.service';
import { ChartsModule, Color, Label } from 'ng2-charts';
import {  ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { data, map } from 'jquery';
import {Chart} from 'chart.js'
import { WebSocketServiceService } from 'src/app/web-socket-service.service';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Safe extends GridsterConfig {
  draggable: Draggable;
  resizable: Resizable;
  pushDirections: PushDirections;
}


@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements OnInit {


  widgets:any=[]
  widget:any
  id!:String
 
  dash:any=[]
  options!: Safe;
  dataSource:any[]=[];

  hotDays!:any
  newChart: any;
  selectedColor: any;
  gasPrice: any;

  constructor(private route:ActivatedRoute, private dashServ:DashboardService ,private widgetService:WidgetsService,private dialog:MatDialog,
    private router:Router,private webSocketService: WebSocketServiceService,private toastr: ToastrService,private snackBar:MatSnackBar) {

      let stompClient = this.webSocketService.connect();

      stompClient.connect({}, () => {

    // Subscribe to notification topic
          stompClient.subscribe('/topic/notification', (dataModel: { body: string; }) => {
            
           

      // Update notifications attribute with the recent messsage sent from the server
        
            this.updateChartData();

            this.barChartLabels = Object.keys(JSON.parse(dataModel.body));

            // this.rainydays = JSON.parse(dataModel.body).rainyDays
            
            this.gasPrice = JSON.parse(dataModel.body).averageGasPrice
            this.hotDays = JSON.parse(dataModel.body).averageHotDays
            // this.numberOfEmployees = JSON.parse(dataModel.body).numberOfEmployees
            // this.numberOfCars = JSON.parse(dataModel.body).numberOfCars
            // this.hotDays = JSON.parse(dataModel.body).hotDays
          
          })

      });

    
   

    }

    barChartOptions: ChartOptions = {

      
      responsive: true,
      // We use these empty structures as placeholders for dynamic theming.
      scales: { xAxes: [{}], yAxes: [{}] },
      plugins: {
      datalabels: {
      anchor: 'end',
      align: 'end',
      }
      }
      };
      barChartLabels: Label[] = [];
      barChartType: ChartType = "pie"
      barChartLegend = true;
      // public barChartPlugins = [pluginDataLabels];
      
      barChartData: ChartDataSets[] = [
      // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
      ];
  

      
  ngOnInit(): void {



    this.id = this.route.snapshot.params['id'];

    this.dash = new Dashboard();

    this.dashServ.getDashboardByID(this.id).subscribe(data=>{
  
      this.dash = data


    })

      


    this.options = {
      gridType: GridType.Fixed ,
      compactType: CompactType.None,
      margin: 10,
      outerMargin: true,
      outerMarginTop: null,
      outerMarginRight: null,
      outerMarginBottom: null,
      outerMarginLeft: null,
      useTransformPositioning: true,
      mobileBreakpoint: 640,
      minCols: 1,
      maxCols: 100,
      minRows: 1,
      maxRows: 100,
      maxItemCols: 100,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      maxItemArea: 2500,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      fixedColWidth: 105,
      fixedRowHeight: 105,
      keepFixedHeightInMobile: false,
      keepFixedWidthInMobile: false,
      scrollSensitivity: 10,
      scrollSpeed: 20,
      enableEmptyCellClick: false,
      enableEmptyCellContextMenu: false,
      enableEmptyCellDrop: false,
      enableEmptyCellDrag: false,
      enableOccupiedCellDrop: false,
      emptyCellDragMaxCols: 50,
      emptyCellDragMaxRows: 50,
      ignoreMarginInRow: false,
      draggable: {
        enabled: true,
        stop: (event, $element, widget) => {
         
          console.log($element.item);

        }
      },
      
      resizable: {
        enabled: true,
       
      },
      swap:true,
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: {north: true, east: true, south: true, west: true},
      pushResizeItems: false,
      displayGrid: DisplayGrid.None,
      disableWindowResize: false,
      disableWarnings: false,
      scrollToNewItems: false
    };

    this.dataSource= [

        {cols: 4, rows: 4, x:-1 , y: 1},
     
    ];
    
      //  this.getWidgets();

      this.getWidgetsByDashboardId(this.id);
  
  }

  savePosition(){

  
  
  }

//   private getWidgets(){

//     this.widgetService.getWidgets().subscribe(data=>{

//     // this.widgets = data;

//     })

//  }


 private getWidgetsByDashboardId(id?:String){

  this.widgetService.getWidgetBydashboardID(this.id).subscribe(data=>{

    this.widgets =data;

    
    console.log(data);
    
    
  })
 }
 updateChartData() {
   
  let newData =  [{ data: [this.gasPrice,this.hotDays],label:"Graph"}]
  
  this.barChartData = newData
  
  }



 editWidget(id:String){

   this.router.navigate(['/widget',id])

 }


 deleteWidget(id:String){

  if(confirm("Are you sure?")){
  this.widgetService.deleteWidget(id).subscribe(data=>{

    this.getWidgetsByDashboardId();
    this.openSnackbar()
  })
 }
 }


  openDialog(){
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.id

    let dialogRef=this.dialog.open(CreateWidgetsComponent,dialogConfig)
    dialogRef.afterClosed().subscribe(result => {

      this.getWidgetsByDashboardId()
    
    });
  }


  openDialog1(id:String){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = id

    let dialogRef=this.dialog.open(EditWidgetComponent,dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
    

      this.getWidgetsByDashboardId();
    });
  }



  


  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }
 
  

  downloadCanvas(event:any) {

    var anchor = event.target;
    // get the canvas
    anchor.href = document.getElementsByTagName('canvas')[0].toDataURL();
    anchor.download = "test.png";

  }

  openSnackbar(){

    this.snackBar.open("Deleted","Dismmis")
    
    }



}
