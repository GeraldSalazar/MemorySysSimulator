import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimIndexComponent } from './gui/sim-index/sim-index.component';
import { ProcessorComponent } from './gui/components/processor/processor.component';
import { CacheMemoryTableComponent } from './gui/components/processor/cache-memory-table/cache-memory-table.component';
import { BusComponent } from './gui/components/bus/bus.component';
import { MainMemoryTableComponent } from './gui/components/main-memory-table/main-memory-table.component';

@NgModule({
  declarations: [
    AppComponent,
    SimIndexComponent,
    ProcessorComponent,
    CacheMemoryTableComponent,
    BusComponent,
    MainMemoryTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
