import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChild('stickyMenu', { static: false }) menuElement: ElementRef;
  elementHeight: any;
  smallmenu: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.elementHeight = this.menuElement.nativeElement.offsetHeight;
  }  

  @HostListener('window:scroll', ['$event'])
  handleScroll(){
      const windowScroll = window.pageYOffset;
      console.log('handlescroll', windowScroll, this.elementHeight);
      if(windowScroll >= this.elementHeight*2){
          this.smallmenu = true;
      } else {
          this.smallmenu = false;
      }
  }  
}
