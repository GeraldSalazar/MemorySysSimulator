import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Instruction } from '../instruction-building/instruction-interface';
import { BusActions } from './bus-actions-enum';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  
  cpu1: Worker = new Worker(new URL('../cpus-web-workers/cpu1.worker', import.meta.url));
  cpu2: Worker = new Worker(new URL('../cpus-web-workers/cpu2.worker', import.meta.url));
  cpu3!: Worker;
  cpu4!: Worker;
  cpus: Worker[] = [this.cpu1, this.cpu2];

  instructionQueue: Instruction[] = [];

  $testSubject = new Subject<any>();

  constructor() {
    setTimeout(()=>{
      console.log(this.instructionQueue)
    }, 15000)
  };

  // todo: DEFINE DATA OBJECT INTERFACE
  // cpuNum from the instruc ranges from 1 to 4, 
  // so just substracts 1 to find the correct cpu to send the data
  sendInfoToSpecificCPU(cpuNum: number, data: any){
    this.cpus[cpuNum - 1].postMessage(data);
  }

  getDataFromCPUs(){
    this.cpus.forEach((cpu) => {
      cpu.onmessage = ({ data } ) => {
        console.log('On the bus: ', data)
        this.instructionQueue.push(data)
      }
    })
  }



}
