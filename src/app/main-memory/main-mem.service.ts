import { Injectable } from '@angular/core';
import { Instruction } from '../instruction-building/instruction-interface';
import { MainMemory } from './main-mem-data-struct';
import { dataRequestInstructions, writeBackInstructions } from './read-write-instrucs-list';
@Injectable({
  providedIn: 'root'
})
export class MainMemService {

  constructor() { }

  lastMemoryRead?: number;
  lastCacheData: string = ''

  //read a specific memory block with the provided dir
  readMemoryBlock(instruc: Instruction){
    dataRequestInstructions.push(instruc)
    for(const [blockNum, memBlock] of MainMemory){
      if(memBlock.dir === instruc.dir){
        this.lastMemoryRead = blockNum
        return memBlock.data
      }
    }
    throw new Error('dir not contained in Main Memory')
  }

  // returns true if data was update successfully
  writeBack(dir: string, dataToWrite: string, instruc: Instruction): boolean{
    for(const [blockNum, memBlock] of MainMemory){
      if(memBlock.dir === dir){
        writeBackInstructions.push({instruction: instruc, oldData: this.lastCacheData})
        memBlock.data = dataToWrite
        return true
      }
    }
    return false
  }


}
