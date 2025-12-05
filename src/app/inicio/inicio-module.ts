import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing-module';
import { Inicio } from './inicio';

@NgModule({
  declarations: [],
  imports: [CommonModule, InicioRoutingModule, Inicio],
})
export class InicioModule {}
