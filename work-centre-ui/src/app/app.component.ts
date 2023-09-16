import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from './application/authorization/authGuard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [`
  
  `]
})
export class AppComponent implements OnInit {
  constructor(private authGuard: AuthGuardService, private router: Router) {

  }

  async ngOnInit() {

  }

}


