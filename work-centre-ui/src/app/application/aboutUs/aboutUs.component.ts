import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-about-us',
    template: `
    <div class="flex flex-col ">
      <div class="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 vh-80">
        <div class="container mx-auto text-center">
          <h2 class="text-4xl font-bold mb-4">About Us</h2>
          <p class="text-lg leading-relaxed">
            Welcome to Star Jobs, where we connect talented individuals with
            exciting career opportunities. Our mission is to bridge the gap
            between employers and job seekers, creating meaningful connections that
            drive success for both.
          </p>
        </div>
      </div>

      <div class="bg-gray-800 text-white py-8 vh-15">
        <div class="container mx-auto text-center">
          <p class="text-lg">
            Connect with us on social media for the latest updates and job
            postings!
          </p>
          <div class="flex justify-center mt-4 space-x-4">
            <a href="#" class="text-white">
              <i class="fab fa-facebook-square fa-2x"></i>
            </a>
            <a href="#" class="text-white">
              <i class="fab fa-twitter-square fa-2x"></i>
            </a>
            <a href="#" class="text-white">
              <i class="fab fa-linkedin fa-2x"></i>
            </a>
          </div>
        </div>
      </div>

      <div class="bg-gray-900 text-white py-4 vh-5">
        <div class="container mx-auto flex justify-between items-center">
          <p>&copy; 2023 Star Jobs. All rights reserved.</p>
          <button class="text-white" (click)="goToHome()" class="home-button">Go to Home</button>
        </div>
      </div>
    </div>
  `,
    styles: [`
        .vh-80 {
            height: 75vh;
        }

        .vh-15{
            height: 15vh;
        }

        .vh-5{
            height: 10vh;
        }

    `],
})
export class AboutUsComponent {
    constructor(private router: Router) { }

    goToHome() {
        this.router.navigate(['/']); // Adjust the route accordingly
    }
}
