import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { DesignComponent } from './page/design/design.component';
import { CollectionComponent } from './page/collection/collection.component';

const routes: Routes = [
  {path: '/home', component: HomeComponent },
  {path: '/collection', component: CollectionComponent },
  {path: '/designing', component: DesignComponent },
  {path: '/about-us', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
