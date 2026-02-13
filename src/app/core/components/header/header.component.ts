import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';

import { NgOptimizedImage } from '@angular/common';

import { MenuItem, MessageService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { NavSmallScreenComponent } from '../nav-small-screen/nav-small-screen.component';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [MessageService],
    imports: [
    NgOptimizedImage,
    MenuModule,
    DialogModule,
    RouterLink,
    RouterLinkActive,
    NavSmallScreenComponent
]
})

export class HeaderComponent implements OnInit{

  @ViewChild('header') header !: ElementRef<HTMLElement>;

  items !: MenuItem[];

  isNotYetImplemented !: Boolean;

  visibleSidebar!: boolean;
  displayMenu: boolean = false;
  backgroundedHeader !: boolean;
  onLive  = true;

  constructor(
    private _renderer: Renderer2,
    private router : Router
  ) { }
  
  ngOnInit(): void {
    this.onRoutingEvent();
  }

  //On routing event we, if we are on small screen, we toggle the menu to disapear from the screen after we click on a link
  onRoutingEvent() : void{
    this.router.events.subscribe({
      next : (event) => {
        if(event instanceof ActivationEnd){
          if(event.snapshot.component){
            this.backgroundedHeader = event.snapshot.data['backgrounded']

            if(this.backgroundedHeader){
              this._renderer.addClass(this.header.nativeElement, 'navbar-background-on-scroll');
            }else{
              this._renderer.removeClass(this.header.nativeElement, 'navbar-background-on-scroll');
            }
          }
        }
      }
    })
  }

  @HostListener('window:scroll')
  onWindowScroll(){

    if(this.backgroundedHeader){
      this._renderer.addClass(this.header.nativeElement, 'navbar-background-on-scroll');
    }
    else{
      if (window.pageYOffset > this.header.nativeElement?.clientHeight) {
        this._renderer.addClass(this.header.nativeElement, 'navbar-background-on-scroll');
      }
      else {
        this._renderer.removeClass(this.header.nativeElement, 'navbar-background-on-scroll');
      }
    }
  }

  //Handling click on burger menu
  onBurgerMenu(){

    if(this.displayMenu === false){
      if (window.pageYOffset <= this.header.nativeElement.clientHeight) {
        this._renderer.addClass(this.header.nativeElement, 'navbar-background-on-scroll');
      }
    }
    else{
      if(!this.backgroundedHeader){
        if(window.pageYOffset <= this.header.nativeElement.clientHeight) {
          this._renderer.removeClass(this.header.nativeElement, 'navbar-background-on-scroll');
        }
      }
    }

    this.displayMenu = !this.displayMenu;
  }

  menuForSmallScreenHandler(value: boolean) {
    this.displayMenu = value;
  }

}