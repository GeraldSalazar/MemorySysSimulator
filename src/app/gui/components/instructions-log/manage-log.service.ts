import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Instruction } from 'src/app/instruction-building/instruction-interface';

@Injectable({
  providedIn: 'root'
})
export class ManageLogService {

  cpuNumToDisplayLog?: number = 4;
  cpuNumChangeSub: Subject<number> = new Subject<number>();

  constructor() {
    this.cpuNumChangeSub.subscribe((newCPUNum) => {
      this.cpuNumToDisplayLog = newCPUNum
    });
  }

  changeCPUNum(newCPUNum: number){
    this.cpuNumChangeSub.next(newCPUNum)
  }
}
