import { Component, Input, OnInit } from '@angular/core';
import { BusService } from 'src/app/bus/bus.service';
import { instructionLogBarrel } from 'src/app/bus/instructions-log-barrel';
import { stringifyInstruction } from 'src/app/bus/stringify-instruc';
import { ManageLastInstrucService } from './manage-last-instruc.service';

@Component({
  selector: 'app-processor-instruc',
  templateUrl: './processor-instruc.component.html',
  styleUrls: ['./processor-instruc.component.css']
})
export class ProcessorInstrucComponent implements OnInit {
  instrucFetched?: any;
  @Input() cpuNum!: number;
  constructor(private manageLastInstruc: ManageLastInstrucService) { }

  ngOnInit(): void {
    this.manageLastInstruc.lastInstrucSubjet.subscribe((instrucList) => {
      if(instrucList[this.cpuNum-1]){
        this.instrucFetched = stringifyInstruction(instrucList[this.cpuNum-1])
      }
    })
  }

}
