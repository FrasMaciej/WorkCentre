import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
    selector: 'registration-confirmation-page',
    template: `
        <div class="flex justify-center justify-items-center m-20">
            <div class="flex flex-col gap-y-5 items-center text-center">
                <div class="text-5xl font-bold cursor-pointer">
                    Email Confirmation
                </div>
                <div class="w-2/5 line pb-10">
                    We have sent email to <b>{{email}}</b> to confirm the validity of your email address. 
                    After receiving the email follow the link provided to complete you registration.
                </div>
                <div class="flex flex-col">
                    <span><b class="cursor-pointer" (click)="navigateHome()">back to homepage.</b> </span>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .line {
            border-bottom: 1px solid gray;
        }

        .custom-card {
            border-radius: 5%;
            background-color: gray;
            width: 400px
        }
    `]
})

export class RegistrationConfirmationPageComponent implements OnInit {
    email = 'exampleemail@gmail.com';

    constructor(private router: Router, private route: ActivatedRoute) {
        this.route.queryParams.subscribe((params) => {
            console.log(params);
            this.email = this.route.snapshot.params['e-mail'];
        })
    }

    ngOnInit() {

    }

    navigateHome() {
        this.router.navigate(['/']);
    }
}