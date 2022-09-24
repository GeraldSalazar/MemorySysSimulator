import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Instruction } from 'src/app/instruction-building/instruction-interface';

@Injectable({
  providedIn: 'root'
})
export class ManageLastInstrucService {

  lastInstrucForEachCPU: Instruction[] = [];
  lastInstrucSubjet: Subject<Instruction[]> = new Subject<Instruction[]>();

  constructor() { 
  }

  updateLastInstruc(instruc: Instruction){
    this.lastInstrucForEachCPU[instruc.cpuNum-1] = instruc
    this.lastInstrucSubjet.next(this.lastInstrucForEachCPU)
    //console.log(this.lastInstrucForEachCPU)
  }
}
