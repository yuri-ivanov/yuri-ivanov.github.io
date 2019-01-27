import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  projects: Project[];

  constructor(private http: HttpClient){
  }

  getProjects():Observable<Array<Project>>{
    return this.http.get<Array<Project>>('assets/data/projects.json')
    .pipe(map(projectsData => projectsData.map( p=> new Project(p) ) ));
  }
}

export class Project {
  projectName: string;
  description: string;
  industry: string;
  company: string;
  employmentCompany: string;
  startDate: Date;
  endDate: Date;
  skills: string[];
  tools: string[];

  constructor(obj){
    for(let prop in obj){
      this[prop]=obj[prop];
    }    
  }

  public hasAllSkills(searchSkills:string[]):boolean {
    for(let i=0; i<searchSkills.length; i++){
      if(this.skills.findIndex(s => s === searchSkills[i])<0){
        return false;
      }
    };
    return true;
  }

  public containsSkillText(text: string):boolean {
    return this.skills.findIndex(s => s.toLowerCase().includes(text))>-1;
  }

  public containsToolsText(text: string): boolean {
    return this.tools.findIndex(t => t.toLowerCase().includes(text))>-1;
  }

  public containsSkillsToolsText(text: string):boolean {
    return this.containsSkillText(text) || this.containsToolsText(text);
  }
  
}
