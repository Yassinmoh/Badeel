import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit, Renderer2, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/Services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('slideInRight', [
      state('start', style({ transform: 'translateX(-100%)' })),
      state('end', style({ transform: 'translateX(0)' })),
      transition('start => end', [
        animate('0.8s')
      ])
    ]),
    trigger('fadeIn', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', [
        animate('0.8s')
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  rightState = 'start';
  leftState = 'hidden';
  isDesktop = false;
  fb = inject(FormBuilder)
  authService = inject(AuthService)
  loginForm!: FormGroup


  constructor(private renderer: Renderer2) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.loginForm =
      this.fb.group({ email: ['',Validators.required], password: ['',Validators.required] })

    this.checkScreenSize();
    if (this.isDesktop) {
      setTimeout(() => {
        this.rightState = 'end';
        this.leftState = 'visible';
      }, 1000);
    }
  }

  checkScreenSize() {
    this.isDesktop = window.innerWidth > 768;
    if (!this.isDesktop) {
      this.rightState = 'end';
      this.leftState = 'visible';
    }
  }

  login(e: Event) {
    e.preventDefault()
    this.authService.login(this.loginForm.value)
  }
}
