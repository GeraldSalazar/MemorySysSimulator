/// <reference lib="webworker" />

import { Operations } from "src/app/instruction-building/instruc-operations-enum";
import { buildInstruction } from "../../instruction-building/instruction-builder";
import { CacheBlock } from "../shared/cache-block-interface"
import { sendInstructionToBus } from "../shared/send-instruc-to-bus";

// Local cache CPU2
// const localCache = new Map<number, CacheBlock>()
// localCache.set(0, {state: 'I', dir: 'xxx', data: '0x0000'})
// localCache.set(1, {state: 'I', dir: 'xxx', data: '0x0000'})
// localCache.set(2, {state: 'I', dir: 'xxx', data: '0x0000'})
// localCache.set(3, {state: 'I', dir: 'xxx', data: '0x0000'})

// Global cpu identifier
const cpuNum = 2
let intervalInstrucGen: number;

// Handler to receive messages from main thread (Bus)
addEventListener('message', ({ data }) => {
  const response = `cpu2 got message:`;
  if(data.startInterval){
    console.log(`%cStarting Instruction Generation on CPU2. rate: ${data.rate}s`, 'background: #000000; color: aqua')
    instructionGenerationWithRate(data.rate)
  }
  if(data.stopInterval){
    stopInstrucGeneration()
    console.log('%cPausing Instruction Generation on CPU2', 'background: #000000; color: red')
  }
});

//function to generate instructions according to a specific time rate
function instructionGenerationWithRate(rate: number = 10){
  const firstInstruc = buildInstruction(cpuNum)
  console.log('generated on CPU2: ', firstInstruc)
  sendInstructionToBus(firstInstruc)
  intervalInstrucGen = self.setInterval(() => {
    const newInstruc = buildInstruction(cpuNum)
    console.log('generated on CPU2: ', newInstruc)
    sendInstructionToBus(newInstruc)
  }, rate*1010 )
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

