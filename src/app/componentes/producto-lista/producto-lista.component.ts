import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html',
  styleUrl: './producto-lista.component.css'
})
export class ProductoListaComponent {
  constructor(private router: Router){}

  logOut(){
    sessionStorage.clear()
    this.router.navigate(['login'])
  }
}
