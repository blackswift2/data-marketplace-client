import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getAllTeams() {
    return this.http.get<User[]>(`${environment.apiURL}/api/getAllTeams`);
  }

  register(user: User) {
    return this.http.post(`${environment.apiURL}/api/auth/register`, user);
  }

  updateTeamStatus(updateData) {
    return this.http.put(`${environment.apiURL}/api/updateStatus`, updateData);
  }

  createUser(userData) {
    return this.http.post(`${environment.apiURL}/api/createUser`, userData);
  }

  getTeamUsers() {
    return this.http.get(`${environment.apiURL}/api/getTeamUsers`);
  }

  updateUserStatus(updateData) {
    return this.http.put(
      `${environment.apiURL}/api/updateUserStatus`,
      updateData
    );
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }
}
