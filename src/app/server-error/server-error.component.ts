import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const body = document.getElementsByTagName('body')[0];
    body.classList.add('four-zero-four');

  }

  ngOnDestroy(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('four-zero-four');
    body.classList.add('theme-orange');
  }
}
