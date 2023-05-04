import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  setActive() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu?.classList.toggle('active');
  }
}
