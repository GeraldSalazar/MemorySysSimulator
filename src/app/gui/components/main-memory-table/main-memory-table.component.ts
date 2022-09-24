import { Component, OnInit } from '@angular/core';
import { MainMemory } from 'src/app/main-memory/main-mem-data-struct';
import { MainMemService } from 'src/app/main-memory/main-mem.service';
import { MMBlock } from 'src/app/main-memory/main-memory-block-interface';
@Component({
  selector: 'app-main-memory-table',
  templateUrl: './main-memory-table.component.html',
  styleUrls: ['./main-memory-table.component.css']
})
export class MainMemoryTableComponent implements OnInit {

  mainMem: Map<number, MMBlock> = MainMemory;
  lastReadRow?: number;
 
  constructor(private mainMemService: MainMemService) { }

  ngOnInit(): void {
    //this.lastReadRow = this.mainMemService.lastMemoryRead;
  }

}
