import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-defective',
  imports: [],
  templateUrl: './defective.html',
  styleUrl: './defective.scss',
})
export class Defective implements OnInit {
  ngOnInit() {
    throw new Error('Crash component');
  }
}
