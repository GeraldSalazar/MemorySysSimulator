
import { Operations } from './instruc-operations-enum';
import { Instruction } from './instruction-interface'
import { generateRandomDataToWrite } from './instruction-units/random-data-gen';
import { generateRandomDir } from './instruction-units/random-dir-gen';
import { generateRandomOperation } from './instruction-units/random-operation-gen';


export function buildInstruction(cpuNum: number){
    //Instruction Format: {cpuNum: number, op: string, dir: string, data: string}
    //Example Instruction: {cpuNum: number = 1, op: string = 'WRITE', dir: string = '001', data: string = '0xABCD'}
    const operation = generateRandomOperation();
    let instruction: Instruction = {cpuNum, op: operation}
    
    const dir = generateRandomDir();
    const data = generateRandomDataToWrite();
    if(operation !== Operations.calcOp){
        instruction.dir = dir;
    }
    if(operation === Operations.writeOp){
        instruction.data = data
    }
    return instruction
}