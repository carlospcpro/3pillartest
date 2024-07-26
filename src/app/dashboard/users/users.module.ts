import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserState } from 'src/app/states/user.state';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [],
  imports: [CommonModule, UsersRoutingModule, NgxsModule.forRoot([UserState])],
})
export class UsersModule {}
