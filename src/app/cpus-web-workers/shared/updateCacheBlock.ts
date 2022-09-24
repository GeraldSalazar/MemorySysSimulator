import { Instruction } from "src/app/instruction-building/instruction-interface";
import { cacheCPU1 } from "../cpu1/cpu1-cache";
import { cacheCPU2 } from "../cpu2/cpu2-cache";
import { cacheCPU3 } from "../cpu3/cpu3-cache";
import { cacheCPU4 } from "../cpu4/cpu4-cache";
import { CacheBlock } from "./cache-block-interface";
import { CacheState } from "./cache-states-enum";

const cacheList: Map<number, CacheBlock>[] = [cacheCPU1, cacheCPU2, cacheCPU3, cacheCPU4]


//function to discriminate a cache block, replace it
export function updateDataBlock(cacheNum: number, dir: string, data: string){

    const cache = cacheList[cacheNum-1];
    for(const [blockNum, cacheBlock] of cache){
        if(cacheBlock.dir === dir){
            cacheBlock.data = data
            return true
        }
    }
    return false

}

//Replace first line encoutered with invalid state
export function replaceMemoryBlock(instruc: Instruction, stateTransition: string, data?: string){
    const cache = cacheList[instruc.cpuNum-1];
    //check if any line is invalid
    if(checkIfACacheHasState(cache, CacheState.invalid)){   //Change first invalid cache line
        replaceFirstStateLineOcurrence(cache, CacheState.invalid, instruc, stateTransition, data)
    }else if(checkIfACacheHasState(cache, CacheState.exclusive)){ //Or change first shared cache line
        replaceFirstStateLineOcurrence(cache, CacheState.exclusive, instruc, stateTransition)
    }else if(checkIfACacheHasState(cache, CacheState.shared)){ //Or change first shared cache line
        replaceFirstStateLineOcurrence(cache, CacheState.shared, instruc, stateTransition)
    }else{
        replaceFirstStateLineOcurrence(cache, CacheState.modified, instruc, stateTransition)
    }
    //if not, check if any line is shared
    //otherwise change any modified and do
    //console.log('replace cache line: ',cache)
}
function replaceFirstStateLineOcurrence(cache: Map<number, CacheBlock>, state: CacheState, instruc: Instruction, stateTransition: string, dataFromMem?: string){
    const coldCache = 'xxx'
    for(const [blockNum, cacheBlock] of cache){
        if(cacheBlock.state.state === state || cacheBlock.dir === coldCache){
            cacheBlock.state.state = cacheBlock.state.dispatch(stateTransition)
            cacheBlock.dir = instruc.dir!
            if(dataFromMem) cacheBlock.data = dataFromMem
            return
        }
    }
}

function checkIfACacheHasState(cache: Map<number, CacheBlock>, state: CacheState){
    for(const [blockNum, cacheBlock] of cache){
        if(cacheBlock.state.state === state){
            return true
        }
    }
    return false
}