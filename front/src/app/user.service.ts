import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface User {
  name: string;
  lastName: string;
  cnic: string;
  phone: string;
  email: string;
  subjects: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getUsers(endpoint: string): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl+endpoint);
  }
  
  getUserById(id: string, endpoint: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl+endpoint}/${id}`);
  }

  createUser(user: User, endpoint: string): Observable<User> {
    return this.http.post<User>(this.baseUrl+endpoint, user);
  }

  updateUser(id: string, user: User, endpoint: string): Observable<User> {
    return this.http.put<User>(`${this.baseUrl+endpoint}/${id}`, user);
  }

  deleteUser(id: string, endpoint: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl+endpoint}/${id}`);
  }
}
