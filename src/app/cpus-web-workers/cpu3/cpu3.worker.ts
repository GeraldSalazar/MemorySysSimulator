/// <reference lib="webworker" />

import { buildInstruction } from "../../instruction-building/instruction-builder";
import { CacheBlock } from "../shared/cache-block-interface"
import { sendInstructionToBus } from "../shared/send-instruc-to-bus";

// Global cpu identifier
const cpuNum = 3
let intervalInstrucGen: number;

// Handler to receive messages from main thread (Bus)
addEventListener('message', ({ data }) => {
  const response = `cpu3 got message:`;
  if(data.startInterval){
    console.log(`%cStarting Instruction Generation on CPU3. rate: ${data.rate}s`, 'background: #000000; color: aqua')
    instructionGenerationWithRate(data.rate)
  }
  if(data.stopInterval){
    stopInstrucGeneration()
    console.log('%cPausing Instruction Generation on CPU3', 'background: #000000; color: red')
  }
});

//function to generate instructions according to a specific time rate
function instructionGenerationWithRate(rate: number = 10){
  const firstInstruc = buildInstruction(cpuNum)
  console.log('generated on CPU3: ', firstInstruc)
  sendInstructionToBus(firstInstruc)
  intervalInstrucGen = self.setInterval(() => {
    const newInstruc = buildInstruction(cpuNum)
    console.log('generated on CPU3: ', newInstruc)
    sendInstructionToBus(newInstruc)
  }, rate*1020 )
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

