import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { NavbarComponent } from './navbar/navbar.component';
import {MatMenuModule} from '@angular/material/menu';
import "@angular/compiler";
import { DashboardComponent } from './components/dashboard/dashboard.component'
import { WidgetsComponent } from './components/widgets/widgets.component'
import { HttpClientModule } from '@angular/common/http';
import { CreateDashboardComponent } from './create-dashboard/create-dashboard.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { EditDashboardComponent } from './edit-dashboard/edit-dashboard.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import { CreateWidgetsComponent } from './create-widgets/create-widgets.component';
import {MatSelectModule} from '@angular/material/select';
import { GridsterModule } from 'angular-gridster2';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { EditWidgetComponent } from './edit-widget/edit-widget.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { WebSocketServiceService } from './web-socket-service.service';
import { DataModelComponent } from './data-model/data-model.component';
import { ChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    WidgetsComponent,
    CreateDashboardComponent,
    EditDashboardComponent,
    CreateWidgetsComponent,
    EditWidgetComponent,
    DataModelComponent,
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule,
    HttpClientModule,MatTooltipModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatGridListModule,
    MatSelectModule,
    GridsterModule,
    DragDropModule,
    NgxPaginationModule,
    ChartsModule,
    ToastrModule.forRoot(),
    MatSnackBarModule
 

  
   
 
    
    
   
   
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    WebSocketServiceService
    
   
],
  bootstrap: [AppComponent],
  entryComponents:[CreateDashboardComponent],
  exports:[
    MatPaginatorModule
  ]
 
})
export class AppModule { }
