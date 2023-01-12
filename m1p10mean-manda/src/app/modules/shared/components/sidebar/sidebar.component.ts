import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/loginService/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  minify = false;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

}
