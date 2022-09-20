import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Instruction } from '../instruction-building/instruction-interface';
import { BusActions } from './bus-actions-enum';
import { cacheCPU1 } from '../cpus-web-workers/cpu1/cpu1-cache';
import { CacheBlock } from '../cpus-web-workers/shared/cache-block-interface';
import { checkIfBlockIsCached } from '../cpus-web-workers/shared/check-if-block-is-cached';
import { cacheCPU2 } from '../cpus-web-workers/cpu2/cpu2-cache';
import { NodeData } from '../cpus-web-workers/shared/node-data-message-type';

@Injectable({
  providedIn: 'root'
})


export class BusService {

  
  cpu1: Worker = new Worker(new URL('../cpus-web-workers/cpu1/cpu1.worker', import.meta.url));
  cpu2: Worker = new Worker(new URL('../cpus-web-workers/cpu2/cpu2.worker', import.meta.url));
  cpu3!: Worker;
  cpu4!: Worker;
  cpus: Worker[] = [this.cpu1, this.cpu2];

  caches: CacheInfo[] = [
    {cpuNum: 1, cache: cacheCPU1}, 
    {cpuNum: 2, cache: cacheCPU2}
  ];

  instructionQueue: Instruction[] = [];

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


  // Function to receive messages from all CPUs
  getDataFromCPUs(){
    this.cpus.forEach((cpu) => {
      cpu.onmessage = ({ data }: { data: NodeData }) => {
        console.log('2. On the bus: ', data)

        this.instructionQueue.push(data.instruction)
        this.determineBusActionFromCPUdata(data)
      }
    })
  }

  //Function to retrieve action from the message got from CPUs
  determineBusActionFromCPUdata(data: NodeData){
    if(data.nodeAction.checkExclusive){
      const blockStatus = this.checkBlockInAllCaches(data.instruction) //Check other caches if exclusive block
      console.log('3. b status: ', blockStatus)
      // Get data from MM
      // Send back the info to update cache block
      //const dataFromMainMem = getDataFromMMemory(dir)
    }
  }

  //Check is a memory block is contained in other caches
  checkBlockInAllCaches(instruc: Instruction){
    let isBlockExclusive: boolean = true;
    this.caches.forEach(({cpuNum, cache}) => {
      if(instruc.cpuNum === cpuNum) return  //no need to check the requesting node
      if(checkIfBlockIsCached(cache, instruc.dir!).isCached){
        isBlockExclusive = false;
      }
    })
    return isBlockExclusive
  }

}
type CacheInfo = {
  cpuNum: number,
  cache: Map<number, CacheBlock>
}


type BusResponse = {
  isBlockExclusive?: boolean,
  dataFromMem?: string
}
type BusData = {
  instruction: Instruction,
  busData: BusResponse 
}


