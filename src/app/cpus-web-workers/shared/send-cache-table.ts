import { CacheBlock } from "./cache-block-interface"

export function sendCacheTable(cache: Map<number, CacheBlock>, cpuNum: number){
    const cacheArrayToDisplay = []
    for(const [blockNum, blockData] of cache){
        const row = {state: blockData.state.state, dir: blockData.dir, data: blockData.data}
        cacheArrayToDisplay.push(row)
    }
    return {cpuNum: cpuNum, cacheTable: cacheArrayToDisplay}
  }