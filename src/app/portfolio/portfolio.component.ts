import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  projects: Project[];
  filteredProjects: Project[];
  findSkills: string[] = [];
  findTools: string[] = [];
  filterText: FormControl;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.filterText = new FormControl("");
    this.filterText.valueChanges.subscribe(
      text => {
        if(this.projects){
          this.filteredProjects = this.projects.filter( 
            p => p.containsSkillsToolsText(text.toLowerCase()) );
        }
      }
    );

    this.http.get<Array<Project>>('assets/data/projects.json')
    .pipe(map(projectsData => projectsData.map( p=> new Project(p) ) ))
    .subscribe(
      data => {
        this.projects = data;
        this.filterProjects();
        console.log('projects', data);
    });
  }

  

  filterProjects():void{
    this.filteredProjects = this.projects.filter(p => p.hasAllSkills(this.findSkills));
  }

  public removeSkill(skill:string): void {
    let idx = this.findSkills.findIndex(s => s === skill);
    if(idx>-1){
      this.findSkills.splice(idx, 1);
      this.filterProjects();
    }
  }

  public addSearchSkill(skill:string): void {
    if(skill && skill.trim().length>0 && (this.findSkills.findIndex( s => s === skill) < 0)){
      this.findSkills.push(skill.trim());
      this.filterProjects();
    }
  }

  public addsearchTool(tool:string): void {
    if(tool && tool.trim().length>0 && (this.findSkills.findIndex( s => s === tool) < 0)){
      this.findSkills.push(tool.trim());
      console.log(this.findSkills);
    }
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
