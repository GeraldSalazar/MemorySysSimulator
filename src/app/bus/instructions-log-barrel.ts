import { Instruction } from "../instruction-building/instruction-interface";

const cpu1Log: Instruction[] = [];
const cpu2Log: Instruction[] = [];
const cpu3Log: Instruction[] = [];
const cpu4Log: Instruction[] = [];

export const instructionLogBarrel: Instruction[][] = [cpu1Log, cpu2Log, cpu3Log, cpu4Log]