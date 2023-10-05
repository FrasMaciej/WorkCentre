import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'not-found-page',
    template: `
    <div class="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div class="text-center p-8 bg-white rounded-md shadow-md text-gray-800">
        <h1 class="text-5xl font-extrabold mb-4 text-red-500">Oops! Page not found</h1>
        
        <p class="text-lg mb-6">
            The page you are looking for might be in another dimension.
        </p>

        <div (click)="navigateHome()" class="text-blue-500 hover:underline hover:text-blue-700 transition-colors cursor-pointer">
          <i class="fas fa-home mr-2"></i> Back to homepage
        </div>
      </div>
    </div>
  `,
    styles: [
        `
      img {
        max-width: 80%;
        height: auto;
      }
    `,
    ],
})
export class NotFoundPageComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit() { }

    navigateHome() {
        this.router.navigate(['']);
    }
}