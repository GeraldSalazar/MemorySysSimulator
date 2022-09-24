import { Operations } from "../instruction-building/instruc-operations-enum";
import { Instruction } from "../instruction-building/instruction-interface";

export function stringifyInstruction(instruc: Instruction){

        let instructionStr = `${instruc.op} `;
        if(instruc.dir){
            instructionStr += instruc.dir;
        }
        if(instruc.data){
            instructionStr += `, ${instruc.data}`;
        }
        return instructionStr
    
}