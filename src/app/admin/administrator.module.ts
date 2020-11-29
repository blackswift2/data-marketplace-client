import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../@pages/components/shared.module';
import { ProgressModule } from '../@pages/components/progress/progress.module';

//Thirdparty Dependencies - table and model
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalModule } from 'ngx-bootstrap';

import { ManageTeamsComponent } from './manage-teams/manage-teams.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ManageUserComponent } from './manage-user/manage-user.component';

@NgModule({
  declarations: [ManageTeamsComponent, AddUserComponent, ManageUserComponent],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    NgxDatatableModule,
    ProgressModule,
    ModalModule,
  ],
  exports: [ManageTeamsComponent, AddUserComponent, ManageUserComponent],
})
export class AdministratorModule {}
