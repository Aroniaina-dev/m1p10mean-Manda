import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/AuthentificationService/authentification.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  minify = false;
  constructor(private authentificationService: AuthentificationService) { }

  ngOnInit(): void {
  }

}
