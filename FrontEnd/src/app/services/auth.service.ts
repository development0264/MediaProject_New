import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEventType } from "@angular/common/http";
import { User } from '../models/user';
import { CONSTANST } from '../utils/constanst';
import { catchError, map, finalize } from 'rxjs/operators';

// ERROR MESSAGE
import { SnackbarComponent } from '../components/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthService {
    public loggedIn = new BehaviorSubject<boolean>(this.hasToken());

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    constructor(
        private router: Router,
        public http: HttpClient,
        public snack: MatSnackBar,
    ) { }

    headers = new HttpHeaders({
        'x-access-token': localStorage.getItem('token')
    });

    login(user: User): Observable<any> {
        if (user.email !== '' && user.password !== '') {
            return this.http.post(CONSTANST.routes.authorization.login, {
                email: user.email,
                password: user.password
            }).pipe(
                catchError((err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        this.snack.open(err.error.message, 'Close',
                            {
                                duration: 3500, verticalPosition: 'top', panelClass: 'snack-error'
                            });
                    }
                    return of(err.error);
                }));
        }
    }

    signup(user: User): Observable<any> {
        if (user.email !== '' && user.password !== '') {
            return this.http.post(CONSTANST.routes.authorization.signup, {
                name: user.name,
                password: user.password,
                email: user.email,
                confirmpassword: user.confirmpassword
            }).pipe(
                catchError((err: any) => {
                    console.log(err)
                    if (err instanceof HttpErrorResponse && err.status === 401) {
                        this.snack.open(err.error.message, 'Close',
                            {
                                duration: 3500, verticalPosition: 'top', panelClass: 'snack-error'
                            });
                        return of(err.error.message);
                    } else if (err.status === 400) {
                        this.snack.open(err.error.message, 'Close',
                            {
                                duration: 3500, verticalPosition: 'top', panelClass: 'snack-error'
                            });
                        return of(err.error.message);
                    }

                }));
        }
    }

    resend(user: User): Observable<any> {
        console.log(user.emailresend)
        if (user.emailresend !== '') {
            return this.http.post(CONSTANST.routes.authorization.resend, {
                email: user.emailresend,
            }).pipe(
                catchError((err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        this.snack.open(err.error.message, 'Close',
                            {
                                duration: 3500, verticalPosition: 'top', panelClass: 'snack-error'
                            });
                    }
                    return of(err.error.message);
                }));
        }
    }

    forgotpassword(user: User): Observable<any> {
        if (user.email !== '') {
            var param = {
                email: user.email
            }
            return this.http.get(CONSTANST.routes.authorization.forgotpassword, { params: param })
                .pipe(
                    catchError((err: any) => {
                        if (err instanceof HttpErrorResponse && err.status === 401) {
                            this.snack.open(err.error.message, 'Close',
                                {
                                    duration: 3500, verticalPosition: 'top', panelClass: 'snack-error'
                                });
                            return of(err.error.message);
                        } else {
                            this.snack.open(err.error.message, 'Close',
                                {
                                    duration: 3500, verticalPosition: 'top', panelClass: 'snack-error'
                                });
                            return of(err.error.message);
                        }
                    }));
        }
    }

    request(token: string): Observable<any> {
        if (token !== '') {
            return this.http.post(CONSTANST.routes.authorization.request, {
                token: token,
            }).pipe(
                catchError((err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        console.log(err.error.message)
                        this.snack.open(err.error.message, 'Close',
                            {
                                duration: 3500, verticalPosition: 'top', panelClass: 'snack-error'
                            });
                    }
                    return of(err.error.message);
                }));
        }
    }

    confirm(user: User): Observable<any> {
        if (user.password !== '') {
            return this.http.post(CONSTANST.routes.authorization.confirm, {
                token: user.token,
                password: user.password,
                confirmpassword: user.confirmpassword
            }).pipe(
                catchError((err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        console.log(err.error.message)
                        this.snack.open(err.error.message, 'Close',
                            {
                                duration: 3500, verticalPosition: 'top', panelClass: 'snack-error'
                            });
                    }
                    return of(err.error.message);
                }));
        }
    }


    hasToken(): boolean {
        return !!localStorage.getItem('token');
    }

    errorMgmt(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(errorMessage);
    }

}
