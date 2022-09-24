import { Component, Input, IterableDiffers, OnInit } from '@angular/core';
import { cacheCPU1 } from 'src/app/cpus-web-workers/cpu1/cpu1-cache';
import { cacheCPU2 } from 'src/app/cpus-web-workers/cpu2/cpu2-cache';
import { cacheCPU3 } from 'src/app/cpus-web-workers/cpu3/cpu3-cache';
import { cacheCPU4 } from 'src/app/cpus-web-workers/cpu4/cpu4-cache';
import { CacheBlock } from 'src/app/cpus-web-workers/shared/cache-block-interface';
@Component({
  selector: 'app-cache-memory-table',
  templateUrl: './cache-memory-table.component.html',
  styleUrls: ['./cache-memory-table.component.css']
})
export class CacheMemoryTableComponent implements OnInit {

  cacheList = [cacheCPU1, cacheCPU2, cacheCPU3, cacheCPU4]

  cacheToDisplay!: Map<number, CacheBlock>;

  @Input() cpuNum!: number;
  constructor() {
  }

  ngOnInit(): void {
    this.cacheToDisplay = this.cacheList[this.cpuNum-1]
  }

}
