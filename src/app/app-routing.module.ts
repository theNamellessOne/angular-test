import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SenderListComponent } from './sender-list/sender-list.component';

const routes: Routes = [{ path: '', component: SenderListComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
