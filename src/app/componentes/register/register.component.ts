import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/password-match.directives';
import { AuthService } from '../../servicios/auth.service';
import { MessageService } from 'primeng/api';
import { error } from 'console';
import { User } from '../../interfaces/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/)
    ]],
    confirmPassword: ['',Validators.required]
  }, {
    validators: passwordMatchValidator
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private mensaje: MessageService, private router:Router) { }

  enviarRegistro(){
    const data = {...this.registerForm.value};

    delete data.confirmPassword;

    this.authService.registerUser(data as User).subscribe(
      response => {
        console.log(response),
        this.mensaje.add({ severity: 'success', summary: 'Success',
          detail: 'Registro Agregado'});
        this.router.navigate(['login'])
      },
      error=> console.log(error)
    )
  }

  get fullName(){
    return this.registerForm.controls['fullName'];
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword'];
  }
}

