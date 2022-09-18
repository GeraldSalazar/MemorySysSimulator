import { Component, OnInit } from '@angular/core';
import { BusService } from 'src/app/bus/bus.service';

@Component({
  selector: 'app-processor-instruc',
  templateUrl: './processor-instruc.component.html',
  styleUrls: ['./processor-instruc.component.css']
})
export class ProcessorInstrucComponent implements OnInit {
  instrucFetched: string = 'READ 111'
  constructor(private bus: BusService) { }

  ngOnInit(): void {
    // this.bus.$testSubject.subscribe(value => {
    //   this.instrucFetched = value.instruction
    // })
  }

}
