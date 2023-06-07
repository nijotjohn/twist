import { 
  Directive,
  DoCheck,
  ElementRef,
  HostListener,
  Renderer2 
} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements DoCheck {

  isShown = false;
  shownClass = 'show';

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('click') toggleDropDown(){
    this.isShown = !this.isShown;
  };

  ngDoCheck(){
    this.dropDownToggle();
  }

  dropDownToggle(){
    let btn = this.el.nativeElement.querySelector('.dropdown-toggle');
    let dropdown = this.el.nativeElement.querySelector('.dropdown-menu');
    if(this.isShown){
      this.renderer.addClass(btn, this.shownClass);
      this.renderer.addClass(dropdown, this.shownClass);
    }else{
      this.renderer.removeClass(btn, this.shownClass);
      this.renderer.removeClass(dropdown, this.shownClass);
    }
  }

}
