import { MESI } from "../mesi-fsm/mesi-fsm"
import { CacheBlock } from "../shared/cache-block-interface"

// Local cache CPU1
export const cacheCPU2 = new Map<number, CacheBlock>()
cacheCPU2.set(0, {state: Object.create(MESI), dir: 'xxx', data: '0x0000'})
cacheCPU2.set(1, {state: Object.create(MESI), dir: 'xxx', data: '0x0000'})
cacheCPU2.set(2, {state: Object.create(MESI), dir: 'xxx', data: '0x0000'})
cacheCPU2.set(3, {state: Object.create(MESI), dir: 'xxx', data: '0x0000'})