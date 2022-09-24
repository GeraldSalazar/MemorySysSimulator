import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Instruction } from '../instruction-building/instruction-interface';
import { cacheCPU1 } from '../cpus-web-workers/cpu1/cpu1-cache';
import { CacheBlock } from '../cpus-web-workers/shared/cache-block-interface';
import { checkIfBlockIsCached } from '../cpus-web-workers/shared/check-if-block-is-cached';
import { cacheCPU2 } from '../cpus-web-workers/cpu2/cpu2-cache';
import { NodeData } from '../cpus-web-workers/shared/node-data-message-type';
import { MainMemService } from '../main-memory/main-mem.service';
import { BusData } from './bus-data-message-type';
import { replaceMemoryBlock, updateDataBlock } from '../cpus-web-workers/shared/updateCacheBlock';
import { addInstructionToCPUsLog } from './add-instruction-to-log';
import { ManageLastInstrucService } from '../gui/components/processor/processor-instruc/manage-last-instruc.service';
import { Operations } from '../instruction-building/instruc-operations-enum';
import { CacheState } from '../cpus-web-workers/shared/cache-states-enum';
import { MESI } from '../cpus-web-workers/mesi-fsm/mesi-fsm';
import { NgIfContext } from '@angular/common';
import { caches } from './all-caches';
import { invalidateCacheBlockFromAllCaches } from './cache-invalidation';
@Injectable({
  providedIn: 'root'
})


export class BusService {

  
  cpu1: Worker = new Worker(new URL('../cpus-web-workers/cpu1/cpu1.worker', import.meta.url));
  cpu2: Worker = new Worker(new URL('../cpus-web-workers/cpu2/cpu2.worker', import.meta.url));
  cpu3: Worker = new Worker(new URL('../cpus-web-workers/cpu3/cpu3.worker', import.meta.url));
  cpu4: Worker = new Worker(new URL('../cpus-web-workers/cpu4/cpu4.worker', import.meta.url));
  cpus: Worker[] = [this.cpu1, this.cpu2, this.cpu3, this.cpu4];
  

  instructionQueue: Instruction[] = [];
  instructionQueueSubj: Subject<Instruction> = new Subject<Instruction>;

  constructor(private mainMemService: MainMemService, private manageLastService: ManageLastInstrucService) {
    const memoryDelay = 2; //in secs
    this.instructionQueueSubj.subscribe((newInstruct) => {
      if(newInstruct.op !== Operations.calcOp) {
        setTimeout(()=>{
          this.determineBusActionFromCPUdata(newInstruct)
        }, memoryDelay*1000)
      }else{
        this.determineBusActionFromCPUdata(newInstruct)
      }

    })
  };

  sendDataToCPUs(data: BusData){
    this.cpus.forEach((cpu) => {
      cpu.postMessage(data)
    })
  }

  // Function to receive messages from all CPUs
  getDataFromCPUs(){
    this.cpus.forEach((cpu) => {
      cpu.onmessage = ({ data }: { data: Instruction }) => {
        //console.log('Event on the bus: ', data)
        
        addInstructionToCPUsLog(data)       //add new instruction from core to each cpu instructions list
        this.manageLastService.updateLastInstruc(data)    //service to update last instruct for each cpu
        //add instruc to queue
        this.instructionQueueSubj.next(data)
        //this.instructionQueue.push(data.instruction)
        //this.determineBusActionFromCPUdata(data)
      }
    })
  }

  determineBusActionFromCPUdata(instruc: Instruction){
    if(instruc.op === Operations.readOp){   //In case the instruction is a READ
      const cacheOFRequestingNode = caches[instruc.cpuNum-1].cache
      const blockNumIfCached = checkIfBlockIsCached(cacheOFRequestingNode, instruc.dir!)
      if(blockNumIfCached.isCached){    //Block is present in local cache
        const cacheBlock = cacheOFRequestingNode.get(blockNumIfCached.blockNum!)  //get that cache block
        if(cacheBlock?.state.state === CacheState.invalid){   //check if block is invalid (Read miss)
            this.checkExclusiveBlock(instruc)
        }else{  //fetch the data from the block (Read Hit) (Case state= E, M or S)
          console.log(`%cData fetched from Cache, CPU num: ${instruc.cpuNum} -> ${cacheBlock?.data}`, 'background: #000000; color: #00cc00')
        }
      }else{    //Not present in local cache, so could be an exclusive block
        this.checkExclusiveBlock(instruc)
      }
    }
    if(instruc.op === Operations.writeOp){
      //invalidar las otras caches
      const cacheOFRequestingNode = caches[instruc.cpuNum-1].cache
      const blockNumIfCached = checkIfBlockIsCached(cacheOFRequestingNode, instruc.dir!)
      if(blockNumIfCached.isCached){
        const cacheBlock = cacheOFRequestingNode.get(blockNumIfCached.blockNum!)  //get that cache block
        this.mainMemService.lastCacheData = cacheBlock!.data
        if(cacheBlock?.state.state === CacheState.modified){   //check if block is modified (need to write back)
          this.mainMemService.writeBack(instruc.dir!, cacheBlock.data!, instruc) //write back
          invalidateCacheBlockFromAllCaches(instruc.dir!, instruc.cpuNum)   //if state is shared, invalidate all cache lines
        }else{ // block with invalid, shared and exclusive state
          if(cacheBlock?.state.state !== CacheState.exclusive){
            invalidateCacheBlockFromAllCaches(instruc.dir!, instruc.cpuNum)   //if state is shared, invalidate all cache lines
          }
          cacheBlock!.state.state = cacheBlock!.state.dispatch('writeBlock')  //set state to modified
        }
        updateDataBlock(instruc.cpuNum, instruc.dir!, instruc.data!)
      }else{    //Need to replace a block
        //set state to Modify
        replaceMemoryBlock(instruc, 'writeBlock', instruc.data)
      }
    }

  }

  checkExclusiveBlock(instruc: Instruction){
    const isBlockExclusive = this.checkBlockInAllCaches(instruc)
    if(isBlockExclusive){ //the block IS NOT present in other cache
      // update cache and set state to Exclusive
      const dataFromMM = this.mainMemService.readMemoryBlock(instruc)
      
      replaceMemoryBlock(instruc, 'readExclusive', dataFromMM)
    }else{  //the block IS present in other cache
      // update cache and set state to Shared
      const blockFromOtherCache = this.getBlockFromOtherCache(instruc.dir!, instruc.cpuNum)
      console.log('remote cache line: ',blockFromOtherCache)
      if(blockFromOtherCache.block.state.state === CacheState.shared){    //cache is shared more than 1 time
        console.log('shared')
        const dataFromMM = this.mainMemService.readMemoryBlock(instruc)  //get data from main mem
        replaceMemoryBlock(instruc, 'readShared', dataFromMM)   //change cache block state, replacing the line
      }else if(blockFromOtherCache.block.state.state === CacheState.exclusive){
        console.log('exclusive')
        this.updateRemoteCacheBlock(blockFromOtherCache, 'readShared')  //update remote node
        replaceMemoryBlock(instruc, 'readShared', blockFromOtherCache.block.data)
      }else{    //cache block is in modified stated, so need to write back and change state to shared
        console.log('modified')
        
        this.mainMemService.writeBack(blockFromOtherCache.block.dir, blockFromOtherCache.block.data, instruc)  //update main mem
        //const remoteCache = this.caches[blockFromOtherCache.cpuNum-1]
        this.updateRemoteCacheBlock(blockFromOtherCache, 'readShared')  //update remote node
        replaceMemoryBlock(instruc, 'readShared', blockFromOtherCache.block.data)   //change cache block state, replacing the line
      }
      //check if block was modified 
      // write back is so
      // change that block state too to Shared
    }
  }

  updateRemoteCacheBlock(remoteBlock: {block: CacheBlock, cpuNum: number}, transition: string, data?: string){
    remoteBlock.block.state.state = remoteBlock.block.state.dispatch(transition);
    if(data){
      remoteBlock.block.data = data
    }
  }

  getBlockFromOtherCache(dir: string, requestingCPUnum: number){
    let resBlock: {block: CacheBlock, cpuNum: number} = {
      block: {state: Object.assign({},MESI), dir: 'xxx', data: '0x0000'},
      cpuNum: 0
    };
    caches.forEach((cache) => {
      if(cache.cpuNum === requestingCPUnum) return
      for (const [blockNum, block] of cache.cache) {
        if(block.dir === dir){
          resBlock.block = block
          resBlock.cpuNum = cache.cpuNum
        }
      }
    })
    return resBlock
  }

  //Check is a memory block is contained in other caches
  checkBlockInAllCaches(instruc: Instruction){
    let isBlockExclusive: boolean = true;
    caches.forEach(({cpuNum, cache}) => {
      if(instruc.cpuNum === cpuNum) return  //no need to check the requesting node
      if(checkIfBlockIsCached(cache, instruc.dir!).isCached){
        isBlockExclusive = false;
      }
    })
    return isBlockExclusive
  }





}
export type CacheInfo = {
  cpuNum: number,
  cache: Map<number, CacheBlock>
}
