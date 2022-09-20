import { Injectable } from '@angular/core';
import { MainMemory } from './main-mem-data-struct';
@Injectable({
  providedIn: 'root'
})
export class MainMemService {

  constructor() { }

  //read a specific memory block with the provided dir
  readMemoryBlock(dir: string){
    for(const [blockNum, memBlock] of MainMemory){
      if(memBlock.dir === dir){
        return memBlock.data
      }
    }
    throw new Error('dir not contained in Main Memory')
  }

  // returns true if data was update successfully
  writeBack(dir: string, dataToWrite: string): boolean{
    for(const [blockNum, memBlock] of MainMemory){
      if(memBlock.dir === dir){
        memBlock.data = dataToWrite
        return true
      }
    }
    return false
  }


}
