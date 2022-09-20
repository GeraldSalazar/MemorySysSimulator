/// <reference lib="webworker" />

import { Operations } from "../../instruction-building/instruc-operations-enum"
import { buildInstruction } from "../../instruction-building/instruction-builder"
import { Instruction } from "../../instruction-building/instruction-interface"
import { BusActions } from "../../bus/bus-actions-enum"
import { CacheBlock } from "../shared/cache-block-interface"
import { CacheState } from "../shared/cache-states-enum"
import { checkIfBlockIsCached } from "../shared/check-if-block-is-cached"
import { sendInstructionToBus } from "../shared/send-instruc-to-bus"
import { cacheCPU1 } from "./cpu1-cache"
import { NodeData } from "../shared/node-data-message-type"

// Global cpu identifier
const cpuNum = 1

// Handler to receive messages from main thread (Bus)
addEventListener('message', ({ data }) => {
  const response = `cpu1 got message:`;

  console.log(response, data)
});

function instructionGeneration(rate: number){
  setTimeout(() => {
    //const newInstruc = buildInstruction(cpuNum)
    const newInstruc = {cpuNum: cpuNum, op: Operations.readOp, dir: '001'}
    actionsFromInstruction(newInstruc)
  }, rate*1000 )
}

instructionGeneration(2)
console.log(cacheCPU1)
function actionsFromInstruction(instruc: Instruction){
  if(instruc.op === Operations.readOp){   // if instruction is a READ
    const blockNumIfCached = checkIfBlockIsCached(cacheCPU1, instruc.dir!)
    if(blockNumIfCached.isCached){
      const memBlock = cacheCPU1.get(blockNumIfCached.blockNum!)
      if(memBlock?.state.state === CacheState.invalid){
        checkBlockExclusivity(instruc)
      }else{  //just fetch the data from the block (Read Hit)
        console.log('Data fetched from Cache: ', memBlock?.data)
      }
    }
  }
}

function checkBlockExclusivity(instruc: Instruction){
  const nodeAction: NodeData = {instruction: instruc ,nodeAction: {checkExclusive: true}}
  console.log('1. just before posting to bus: ', nodeAction)
  postMessage(nodeAction)
}
