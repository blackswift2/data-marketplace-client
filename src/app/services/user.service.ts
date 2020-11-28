import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "../models";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private http: HttpClient) {}

  getAllTeams() {
    return this.http.get<User[]>(`http://localhost:3000/api/getAllTeams`);
  }

  register(user: User) {
    return this.http.post(`http://localhost:3000/api/auth/register`, user);
  }

  updateTeamStatus(updateData) {
    return this.http.put(`http://localhost:3000/api/updateStatus`, updateData);
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }
}
