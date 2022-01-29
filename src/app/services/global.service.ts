import { Injectable } from '@angular/core';
@Injectable()
export class GlobalService {
    apiUrl: string;
    constructor() {
        this.apiUrl = 'http://localhost:4200/';
    }
}
