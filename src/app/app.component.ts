import { Component } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private router: Router
  ) {}

  deveExibirNavBar() {
    return this.router.url !== '/login';
  }
}
