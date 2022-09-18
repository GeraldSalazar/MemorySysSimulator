/// <reference lib="webworker" />

import { CacheBlock } from "./shared/cache-block-interface"

// Local cache CPU1
const localCache = new Map<number, CacheBlock>()
localCache.set(0, {state: 'I', dir: 'xxx', data: '0x0000'})
localCache.set(1, {state: 'I', dir: 'xxx', data: '0x0000'})
localCache.set(2, {state: 'I', dir: 'xxx', data: '0x0000'})
localCache.set(3, {state: 'I', dir: 'xxx', data: '0x0000'})

// Global cpu identifier
const cpuNum = 1

// Handler to receive messages from main thread (Bus)
addEventListener('message', ({ data }) => {
  const response = `cpu1 got message:`;
  console.log(response, data)
});