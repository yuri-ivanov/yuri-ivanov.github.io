import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  projects: Project[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Array<Project>>('assets/data/projects.json').subscribe(
      data => {
        this.projects = data;
        console.log('projects', data);
    });
  }

}

class Project {
  projectName: string;
  description: string;
  industry: string;
  company: string;
  employmentCompany: string;
  startDate: Date;
  endDate: Date;
  skills: string[];
  tools: string[];
}
