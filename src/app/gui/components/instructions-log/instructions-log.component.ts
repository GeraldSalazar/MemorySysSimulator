import { Component, Input, OnInit } from '@angular/core';
import { instructionLogBarrel } from 'src/app/bus/instructions-log-barrel';
import { Instruction } from 'src/app/instruction-building/instruction-interface';
import { ManageLogService } from './manage-log.service';
import { stringifyInstruction } from 'src/app/bus/stringify-instruc';

@Component({
  selector: 'app-instructions-log',
  templateUrl: './instructions-log.component.html',
  styleUrls: ['./instructions-log.component.css']
})
export class InstructionsLogComponent implements OnInit {

  CPUNum?: number = this.manageLog.cpuNumToDisplayLog;

  instructionList?: Instruction[];

  constructor(private manageLog: ManageLogService) { }

  ngOnInit(): void {
    this.manageLog.cpuNumChangeSub.subscribe((cpuNum) => {
      this.CPUNum = cpuNum
      this.instructionList = instructionLogBarrel[cpuNum-1];
      //this.instructionList = cpusInstructionLogsBarrel[cpuNum-1]
    })
  }

}
