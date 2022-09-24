import { MESI } from "../mesi-fsm/mesi-fsm"
import { CacheBlock } from "../shared/cache-block-interface"

// Local cache CPU3
export const cacheCPU3 = new Map<number, CacheBlock>()
cacheCPU3.set(0, {state: Object.assign({},MESI), dir: 'xxx', data: '0x0000'})
cacheCPU3.set(1, {state: Object.assign({},MESI), dir: 'xxx', data: '0x0000'})
cacheCPU3.set(2, {state: Object.assign({},MESI), dir: 'xxx', data: '0x0000'})
cacheCPU3.set(3, {state: Object.assign({},MESI), dir: 'xxx', data: '0x0000'})
if (typeof Worker !== 'undefined') {
  // Create a new
  const worker = new Worker(new URL('./cpu3.worker', import.meta.url));
  worker.onmessage = ({ data }) => {
    console.log(`page got message: ${data}`);
  };
  worker.postMessage('hello');
} else {
  // Web Workers are not supported in this environment.
  // You should add a fallback so that your program still executes correctly.
}