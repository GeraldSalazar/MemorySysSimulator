import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-processor-instruc',
  templateUrl: './processor-instruc.component.html',
  styleUrls: ['./processor-instruc.component.css']
})
export class ProcessorInstrucComponent implements OnInit {
  instrucFetched: string = 'READ 111'
  constructor() { }

  ngOnInit(): void {
  }

}
