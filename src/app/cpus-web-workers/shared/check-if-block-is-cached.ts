import { Instruction } from "src/app/instruction-building/instruction-interface"
import { CacheBlock } from "./cache-block-interface"

export function checkIfBlockIsCached(cacheMem: Map<number, CacheBlock>, dir: string){
    for(const [blockNum, block] of cacheMem) {
        if(block.dir === dir){
            return {isCached: true, blockNum: blockNum}
        }
    }
    return {isCached: false}
}