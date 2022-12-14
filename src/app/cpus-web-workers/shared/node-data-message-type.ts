import { Instruction } from "src/app/instruction-building/instruction-interface"

type NodeResponse = {
    checkExclusive?: boolean,
    checkShared?: boolean
  }
export type NodeData = {
    instruction: Instruction,
    nodeAction: NodeResponse 
}