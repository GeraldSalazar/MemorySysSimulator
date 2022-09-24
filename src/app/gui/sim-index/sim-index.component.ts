import { Component, OnInit } from '@angular/core';
import { BusService } from 'src/app/bus/bus.service';
@Component({
  selector: 'app-sim-index',
  templateUrl: './sim-index.component.html',
  styleUrls: ['./sim-index.component.css']
})
export class SimIndexComponent implements OnInit {

  constructor(private bus: BusService) { }

  ngOnInit(): void {
    this.bus.getDataFromCPUs()
    //this.bus.$testSubject.subscribe((value) => console.log(value))
  }

}
