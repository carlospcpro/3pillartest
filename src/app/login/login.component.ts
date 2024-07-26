import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

// import { firebaseConfig } from '../../app/enviroment';
// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { provideAuth, getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  error: string | null = null;
  username = 'luiscarlos@3pillartest.com';
  password = 'supermario';

  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  async login() {
    try {
      await this.fireauth.signInWithEmailAndPassword(
        this.username,
        this.password
      );
      this.router.navigate(['/app']);
    } catch (error: any) {
      this.error = error.message;
    }
  }
}
