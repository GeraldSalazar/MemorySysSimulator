/// <reference lib="webworker" />

import { Operations } from "../instruction-building/instruc-operations-enum"
import { buildInstruction } from "../instruction-building/instruction-builder"
import { Instruction } from "../instruction-building/instruction-interface"
import { BusActions } from "../bus/bus-actions-enum"
import { CacheBlock } from "./shared/cache-block-interface"
import { CacheState } from "./shared/cache-states-enum"
import { stringifyInstruction } from "../bus/stringify-instruc"

// Local cache CPU1
const localCache = new Map<number, CacheBlock>()
localCache.set(0, {state: 'I', dir: 'xxx', data: '0x0000'})
localCache.set(1, {state: 'I', dir: 'xxx', data: '0x0000'})
localCache.set(2, {state: 'I', dir: 'xxx', data: '0x0000'})
localCache.set(3, {state: 'I', dir: 'xxx', data: '0x0000'})

// Global cpu identifier
const cpuNum = 1


// Handler to receive messages from main thread (Bus)
addEventListener('message', ({ data }) => {
  const response = `cpu1 got message:`;
  console.log(response, data)
});

setTimeout(() => {
  sendInstructionToDisplay(buildInstruction(cpuNum))

}, 2500 )

setTimeout(() => {
  sendInstructionToDisplay(buildInstruction(cpuNum))

}, 5500 )

function sendInstructionToDisplay(instruc: Instruction){
  postMessage({instruction: instruc, desc: BusActions.instrucToDisplay})
}
function checkIfValidStateToFetch(){
  const validStates = [CacheState.exclusive, CacheState.shared, CacheState.modified]
}


//Local cache is in each worker
//Generate each instruction according to the probability distribution
//Check if instruction operation is READ, if so:
//- Check if block dir is present in local cache, if so:
//    - if block state is S, E, or M:
//        - fetch the data value
//    - if block state is I:
//        - send action to bus
//        - check the other caches, if block dir is present:
//            - change block state to S, get back data from bus (from the E state cache) and update local cache block data
//        - if block dir is not present in other caches:
//            - change block state to E, get back data from main memory and update block data from local cache
//- if block is not present:
//    - send action to bus
//    - check the other caches, if block dir is present:
//        - change block state to S, get back data from bus (from the E state cache) and update local cache block data
//    - if block dir is not present in other caches:
//        - change block state to E, get back data from main memory and update block data from local cache
