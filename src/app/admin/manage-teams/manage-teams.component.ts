import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UserService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-teams',
  templateUrl: './manage-teams.component.html',
  styleUrls: ['./manage-teams.component.scss'],
})
export class ManageTeamsComponent implements OnInit {
  @ViewChild('updateStatusConfirmation', { static: true })
  updateStatusConfirmation: ModalDirective;
  teamData: any = [];
  cachedTeamData: any = [];
  previousStatusValue: string;
  updatedTeamData: any = {};
  columns = [
    { name: 'firstName' },
    { name: 'LastName' },
    { name: 'Email' },
    { name: 'Team Name' },
    { name: 'Role' },
    { name: 'Status' },
    { name: 'Created At' },
    { name: 'Actions' },
  ];
  editing = {};
  alertClass: string = '';
  alertMessage: string = '';

  @ViewChild(DatatableComponent, { static: true }) table: DatatableComponent;
  scrollBarHorizontal = window.innerWidth < 960;
  columnModeSetting = window.innerWidth < 960 ? 'standard' : 'force';

  constructor(private router: Router, private UserService: UserService) {}

  ngOnInit() {
    this.getAllTeams();
  }

  getAllTeams() {
    this.UserService.getAllTeams().subscribe(
      (data: any) => {
        this.teamData = data.data;
        this.cachedTeamData = data.data;
      },
      (error) => {
        this.showAlert(
          'alert alert-danger',
          "Couldn't fetch data, please reload again..!",
          4000
        );
      }
    );
  }

  updateFilter(event) {
    if (this.cachedTeamData.length > 0) {
      const searchValue = event.target.value.toLowerCase();
      if (!searchValue) return (this.teamData = this.cachedTeamData);

      const keys = Object.keys(this.cachedTeamData[0]);
      this.teamData = this.cachedTeamData.filter((column) => {
        return keys.some((key) =>
          `${column[key]}`.toLowerCase().includes(searchValue)
        );
      });
      this.table.offset = 0;
    }
  }

  showConfirmationModal(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.previousStatusValue = this.teamData[rowIndex][cell];
    this.teamData[rowIndex][cell] = event.target.value;
    this.teamData = [...this.teamData];
    this.updatedTeamData = {
      teamData: this.teamData[rowIndex],
      rowIndex: rowIndex,
    };
    this.updateStatusConfirmation.show();
  }

  confirmModal() {
    this.updateTeamStatus(this.updatedTeamData.teamData);
    this.previousStatusValue = '';
    this.updatedTeamData = {};
    this.updateStatusConfirmation.hide();
  }

  cancelModal() {
    this.teamData[this.updatedTeamData.rowIndex][
      'status'
    ] = this.previousStatusValue;
    this.teamData = [...this.teamData];
    this.previousStatusValue = '';
    this.updatedTeamData = {};
    this.updateStatusConfirmation.hide();
  }

  /**
   * Update team status
   * @param teamData
   */
  updateTeamStatus(teamData) {
    this.UserService.updateTeamStatus(teamData).subscribe(
      (data: any) => {
        console.log(data);
        this.showAlert(
          'alert alert-success',
          'Team status updated successfully!',
          4000
        );
      },
      (error) => {
        console.log(error);
        this.cancelModal();
        this.showAlert(
          'alert alert-danger',
          'Unexpected error occured, please try again..!',
          4000
        );
      }
    );
  }

  /**
   * Show Alert
   * @param alertClass
   * @param alertMessage
   * @param alertTimeout
   */
  showAlert(alertClass, alertMessage, alertTimeout) {
    this.alertClass = alertClass;
    this.alertMessage = alertMessage;
    setTimeout(() => {
      this.alertClass = '';
      this.alertMessage = '';
    }, alertTimeout);
  }
}
