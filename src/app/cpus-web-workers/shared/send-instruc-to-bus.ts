import { Instruction } from "src/app/instruction-building/instruction-interface"

export function sendInstructionToBus(instruc: Instruction){
    postMessage(instruc)
}