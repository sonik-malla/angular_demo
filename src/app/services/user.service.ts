import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';

import {GlobalService} from '../services/global.service'

@Injectable({ providedIn: 'root' })
export class UserService {
    apiUrl = this.globalService.apiUrl;
    constructor(private http: HttpClient, private globalService: GlobalService) { }

    getAll() {
        return this.http.get<User[]>(this.apiUrl +'/users');
    }

    register(user: User) {
        return this.http.post(this.apiUrl +'/users/register', user);
    }

    delete(id: number) {
        return this.http.delete(this.apiUrl + '/users/' + id);
    }

    update(user: User) {
        console.log('user', user);
        return this.http.post(this.apiUrl +'/users/update', user);
    }
}