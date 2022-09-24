import { Component, OnInit } from '@angular/core';
import { BusService } from 'src/app/bus/bus.service';

@Component({
  selector: 'app-sim-controls',
  templateUrl: './sim-controls.component.html',
  styleUrls: ['./sim-controls.component.css']
})
export class SimControlsComponent implements OnInit {

  constructor(private busService: BusService) { }

  ngOnInit(): void {
  }

  startInterval(rate: number){
    this.busService.sendDataToCPUs({startInterval: true, rate: rate})
  }

  stopInterval(){
    this.busService.sendDataToCPUs({stopInterval: true})
  }
}
