import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../@pages/components/shared.module";

//Thirdparty Dependencies - table and model
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { ModalModule } from "ngx-bootstrap";

import { ManageTeamsComponent } from "./manage-teams/manage-teams.component";

@NgModule({
  declarations: [ManageTeamsComponent],
  imports: [CommonModule, SharedModule, NgxDatatableModule, ModalModule],
  exports: [ManageTeamsComponent],
})
export class AdministratorModule {}
