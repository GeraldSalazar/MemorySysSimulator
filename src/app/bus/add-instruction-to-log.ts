import { ManageLastInstrucService } from "../gui/components/processor/processor-instruc/manage-last-instruc.service";
import { Instruction } from "../instruction-building/instruction-interface";
import { instructionLogBarrel } from "./instructions-log-barrel";



export function addInstructionToCPUsLog(instruc: Instruction){
    instructionLogBarrel[instruc.cpuNum-1].push(instruc)
    
}