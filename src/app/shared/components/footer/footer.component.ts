import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  footerClass: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.router.url.includes('historico')) {
      this.footerClass = 'footer-dark';
    }
  }
}
