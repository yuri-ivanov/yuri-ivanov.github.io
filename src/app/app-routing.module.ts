import { ContactComponent } from './contact/contact.component';
import { IndexComponent } from './index/index.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './portfolio/companies/companies.component';

const routes: Routes = [
  { path: 'portfolio', component: PortfolioComponent},
  { path: 'portfolio/companies', component: CompaniesComponent},
  { path: 'contact', component: ContactComponent},
  { path: '', component: IndexComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
