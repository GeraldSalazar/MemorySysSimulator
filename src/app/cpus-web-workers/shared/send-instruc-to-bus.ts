import { Instruction } from "src/app/instruction-building/instruction-interface"

export function sendInstructionToBus(instruc: Instruction, cpuNum: number){
    if(instruc.dir){  // Is a read or write instruction
      postMessage(instruc)
    }else{
      console.log('CALC Operation made on CPU '+cpuNum)
    }
  }