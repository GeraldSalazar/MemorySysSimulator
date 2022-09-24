import { MESI } from "../mesi-fsm/mesi-fsm"
import { CacheBlock } from "../shared/cache-block-interface"
import { CacheState } from "../shared/cache-states-enum"

// Local cache CPU1
export const cacheCPU1 = new Map<number, CacheBlock>()
cacheCPU1.set(0, {state: Object.assign({},MESI), dir: 'xxx', data: '0x0000'})
cacheCPU1.set(1, {state: Object.assign({},MESI), dir: 'xxx', data: '0x0000'})
cacheCPU1.set(2, {state: Object.assign({},MESI), dir: 'xxx', data: '0x0000'})
cacheCPU1.set(3, {state: Object.assign({},MESI), dir: 'xxx', data: '0x0000'})

