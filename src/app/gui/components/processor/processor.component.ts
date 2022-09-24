import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ManageLogService } from '../instructions-log/manage-log.service';
declare var bootstrap: any;
@Component({
  selector: 'app-processor',
  templateUrl: './processor.component.html',
  styleUrls: ['./processor.component.css']
})
export class ProcessorComponent implements OnInit {

  @Input() cpuNum!: number;
  
  
  constructor(private manageLog: ManageLogService) { 

  }


  ngOnInit(): void {
  }
  
  setCPUNumToLog(){
    this.manageLog.changeCPUNum(this.cpuNum)
  }

}
