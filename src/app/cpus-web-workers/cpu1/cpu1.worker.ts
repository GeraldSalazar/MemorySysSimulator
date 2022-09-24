/// <reference lib="webworker" />

import { Operations } from "../../instruction-building/instruc-operations-enum"
import { buildInstruction } from "../../instruction-building/instruction-builder"
import { Instruction } from "../../instruction-building/instruction-interface"
import { CacheBlock } from "../shared/cache-block-interface"
import { CacheState } from "../shared/cache-states-enum"
import { checkIfBlockIsCached } from "../shared/check-if-block-is-cached"
import { sendInstructionToBus } from "../shared/send-instruc-to-bus"
import { cacheCPU1 } from "./cpu1-cache"
import { NodeData } from "../shared/node-data-message-type"
import { BusData } from "src/app/bus/bus-data-message-type"



// Global cpu identifier
const cpuNum = 1
let intervalInstrucGen: number;
// Handler to receive messages from main thread (Bus)
addEventListener('message', ({ data }: {data: BusData}) => {
  const response = `cpu1 got message:`;
  if(data.startInterval){
    console.log(`%cStarting Instruction Generation on CPU1. rate: ${data.rate}s`, 'background: #000000; color: aqua')
    instructionGenerationWithRate(data.rate)
  }
  if(data.stopInterval){
    stopInstrucGeneration()
    console.log('%cPausing Instruction Generation on CPU1', 'background: #000000; color: red')
  }

  
});

//function to generate instructions according to a specific time rate
function instructionGenerationWithRate(rate: number = 10){
  const firstInstruc = buildInstruction(cpuNum)
  console.log('generated on CPU1: ', firstInstruc)
  sendInstructionToBus(firstInstruc)
  intervalInstrucGen = self.setInterval(() => {
    const newInstruc = buildInstruction(cpuNum)
    console.log('generated on CPU1: ', newInstruc)
    sendInstructionToBus(newInstruc)
  }, rate*1000 )
}
function stopInstrucGeneration(){
  clearInterval(intervalInstrucGen)
}
//function to generate a single instruction, the system next cycle
function nextInstruction(){
  const newInstruc = buildInstruction(cpuNum)
  sendInstructionToBus(newInstruc)
}


//instructionGenerationWithRate(15)
// setTimeout(()=>{
//   sendInstructionToBus({cpuNum: cpuNum, op: Operations.writeOp, dir: '001', data:'0xXDXD'})

// }, 1000)
// setTimeout(()=>{
//   sendInstructionToBus({cpuNum: cpuNum, op: Operations.readOp, dir: '011'})

// }, 5000)

// setTimeout(()=>{
//   sendInstructionToBus({cpuNum: cpuNum, op: Operations.writeOp, dir: '011', data: '0x7777'})

// }, 7000)

// setTimeout(()=>{
//   sendInstructionToBus({cpuNum: cpuNum, op: Operations.writeOp, dir: '011', data: '0xYESS'})

// }, 10000)