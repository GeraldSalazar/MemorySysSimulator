import { MMBlock } from "./main-memory-block-interface"

export const MainMemory = new Map<number, MMBlock>()
MainMemory.set(0, {blockNum: 0, dir: '000', data: '0x0007'})
MainMemory.set(1, {blockNum: 1, dir: '001', data: '0x0070'})
MainMemory.set(2, {blockNum: 2, dir: '010', data: '0x0700'})
MainMemory.set(3, {blockNum: 3, dir: '011', data: '0x00A0'})
MainMemory.set(4, {blockNum: 4, dir: '100', data: '0x0B00'})
MainMemory.set(5, {blockNum: 5, dir: '101', data: '0xABCD'})
MainMemory.set(6, {blockNum: 6, dir: '110', data: '0xFFFF'})
MainMemory.set(7, {blockNum: 7, dir: '111', data: '0x40AC'})
