import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { PortfolioService, Project } from '../portfolio.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  companies: Company[];
  projects: Project[];

  constructor(private http: HttpClient, private portfolioService: PortfolioService) { }

  ngOnInit() {
    this.http.get<Array<Company>>('assets/data/companies.json')
    .pipe(map(projectsData => projectsData.map( p=> new Company(p) ) ))
    .subscribe(
      data => {
        this.companies = data;
        console.log('companies', data);
    });
    this.portfolioService.getProjects().subscribe(
      data => {
        this.projects = data;
        console.log('projects', this.projects);
      }
    )
  }

  clickOnCompany(company:Company){
    company.expand = !company.expand;
    company.projects = this.projects.filter(p => p.company === company.id);
  }

}

class Company {
  id: string;
  company: string;
  description: string; 
  logo: string;
  url: string;
  expand: boolean = false;
  projects: Project[];

  constructor(obj: any){
    this.id = obj.id;
    this.company = obj.company;
    this.description = obj.description;
    this.logo = obj.logo;
    this.url = obj.url;
  }
  
}
