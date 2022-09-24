import { Component, OnInit } from '@angular/core';
import { Instruction } from 'src/app/instruction-building/instruction-interface';
import { MainMemService } from 'src/app/main-memory/main-mem.service';
import { dataRequestInstructions, writeBackInstructions } from 'src/app/main-memory/read-write-instrucs-list';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.css']
})
export class RequestsListComponent implements OnInit {

  readRequests: Instruction[] = []
  writebackRequests: {instruction: Instruction, oldData: string}[] = []

  constructor(private mainMemService: MainMemService) { }

  ngOnInit(): void {
    this.readRequests = dataRequestInstructions;
    this.writebackRequests = writeBackInstructions;
  }

}
