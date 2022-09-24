import { cacheCPU1 } from "../cpus-web-workers/cpu1/cpu1-cache";
import { cacheCPU2 } from "../cpus-web-workers/cpu2/cpu2-cache";
import { cacheCPU3 } from "../cpus-web-workers/cpu3/cpu3-cache";
import { cacheCPU4 } from "../cpus-web-workers/cpu4/cpu4-cache";
import { CacheInfo } from "./bus.service";

export const caches: CacheInfo[] = [
  {cpuNum: 1, cache: cacheCPU1}, 
  {cpuNum: 2, cache: cacheCPU2},
  {cpuNum: 3, cache: cacheCPU3},
  {cpuNum: 4, cache: cacheCPU4}
];