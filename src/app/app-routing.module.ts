import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WidgetsComponent } from './components/widgets/widgets.component';
import { CreateDashboardComponent } from './create-dashboard/create-dashboard.component';
import { CreateWidgetsComponent } from './create-widgets/create-widgets.component';
import { DataModelComponent } from './data-model/data-model.component';
import { EditDashboardComponent } from './edit-dashboard/edit-dashboard.component';
import { EditWidgetComponent } from './edit-widget/edit-widget.component';
import { Widgets } from './Interfaces/Widgets';

import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [

  {path:'home',component:NavbarComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},

  {path:'dashboard', component:DashboardComponent},
  {path:'create-dashboard',component:CreateDashboardComponent},
  {path:'dashboard/:id',component:EditDashboardComponent},
  {path:'dashboards/:id', component:WidgetsComponent},
  
  {path:'create-widgets',component:CreateWidgetsComponent},
  {path:'widget/:id',component:EditWidgetComponent},


  {path:'data',component:DataModelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
