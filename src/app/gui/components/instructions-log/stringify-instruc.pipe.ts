import { Pipe, PipeTransform } from '@angular/core';
import { stringifyInstruction } from 'src/app/bus/stringify-instruc';
import { Instruction } from 'src/app/instruction-building/instruction-interface';

@Pipe({
  name: 'stringifyInstruc'
})
export class StringifyInstrucPipe implements PipeTransform {

  transform(instruc: Instruction): string {
    return stringifyInstruction(instruc);
  }

}
