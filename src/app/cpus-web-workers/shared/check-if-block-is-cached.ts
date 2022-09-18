import { Instruction } from "src/app/instruction-building/instruction-interface"

export function checkIfBlockIsCached(cacheMem: Map<number, Instruction>, dir: string){
    for(const [blockNum, block] of cacheMem) {
        if(block.dir === dir){
            return {isCached: true, blockNum: blockNum}
        }
    }
    return {isCached: false}
}