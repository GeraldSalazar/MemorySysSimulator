import { CacheBlock } from "../cpus-web-workers/shared/cache-block-interface"
import { CacheState } from "../cpus-web-workers/shared/cache-states-enum"
import { caches } from "./all-caches"
export function invalidateCacheBlockFromAllCaches(dir: string, cpuNumber: number){
    caches.forEach(({cpuNum, cache}) => {
      if(cpuNum === cpuNumber) return  //no need to invalidate block from requesting node
      checkDirFromCacheToInvalidate(cache, dir)
    })
  }

export function checkDirFromCacheToInvalidate(cache: Map<number, CacheBlock>, dir: string){
    for(const [blockNum, block] of cache){
      if(block.dir === dir){
        block.state.state = CacheState.invalid
      }
    }
  }