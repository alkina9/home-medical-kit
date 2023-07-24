import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ViewMedicamentPage} from './view-medicament.page';

const routes: Routes = [
  {
    path: '',
    component: ViewMedicamentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewMessagePageRoutingModule {
}
