import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public usuario: User;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        // return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
        // http://rcid.cl/api/sn5/usuarioinfo/Authorized?data={%22username%22:%22demo%22,%22password%22:%22demo%22}
        var parametros = {'username': username, 'password': password };
        /*
        return this.http.get<any>("http://rcid.cl/api/sn5/usuarioinfo/Authorized?data=%7B%22username%22:%22" + username + "%22,%22password%22:%22" + password +  "%22%7D" )
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
        */
        console.log("parametros");
        console.log(parametros);
        return this.http.get<any>("Authorized?data=%7B%22username%22:%22" + username + "%22,%22password%22:%22" + password +  "%22%7D" )
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}