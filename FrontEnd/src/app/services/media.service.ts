import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { CONSTANST } from '../utils/constanst';
import { Media } from '../models/Media';
import { catchError, map, finalize, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { Tokens } from '../models/tokens';

import { MatSnackBar } from '@angular/material';

@Injectable()
export class MediaService {
    loading: boolean = true;

    constructor(
        private router: Router,
        public http: HttpClient,
        public snack: MatSnackBar,
    ) { }

    headers = new HttpHeaders({
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    getList(sortActive: string, order: string, pageSize: number, page: number, search: string) {
        let params = new HttpParams();
        params = params.append('active', sortActive);
        params = params.append('order', order);
        params = params.append('search', search);
        params = params.append('pageSize', pageSize.toString());
        params = params.append('page', page.toString());
        return this.http.get<MediaApi>
            (CONSTANST.routes.media.list, { headers: this.headers, params: params })
            .pipe(
                catchError((err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        this.snack.open(err.message, 'Close',
                            {
                                duration: 3500, verticalPosition: 'top', panelClass: 'snack-error'
                            });
                    }
                    return of(err.error.message);
                }));

    }

    getsharedList(sortActive: string, order: string, pageSize: number, page: number, search: string) {
        let params = new HttpParams();
        params = params.append('active', sortActive);
        params = params.append('order', order);
        params = params.append('search', search);
        params = params.append('pageSize', pageSize.toString());
        params = params.append('page', page.toString());
        console.log(params)
        return this.http.get<MediaApi>
            (CONSTANST.routes.media.sharedlist, { headers: this.headers, params: params })
            .pipe(
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

    SaveMedia(data, { }, Type): Observable<any> {
        var headerssss = new HttpHeaders({
            'Authorization': localStorage.getItem('token'),
            //'Content-Type': "multipart/form-data"
        });
        var Url;
        if (Type == "Image") {
            Url = CONSTANST.routes.media.photo
        } else if (Type == "Video") {
            Url = CONSTANST.routes.media.video
        } else {
            Url = CONSTANST.routes.media.photoandvideo
        }
        return this.http.post(Url, data, { headers: headerssss })
            .pipe(
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

    share(data) {

        var shareheaders = new HttpHeaders({
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        });

        let params = new HttpParams();
        params = params.append('photoids', data.photoids.toString());

        return this.http.post(CONSTANST.routes.media.share, data, { headers: shareheaders, params: params })
            .pipe(
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

    notificationcount() {
        console.log(CONSTANST.routes.media.notificationcount, this.headers)
        return this.http.post(CONSTANST.routes.media.notificationcount, { headers: this.headers }).pipe(
            catchError((err: any) => {
                console.log(err)
                if (err instanceof HttpErrorResponse) {
                    this.snack.open(err.error.message, 'Close',
                        {
                            duration: 3500, verticalPosition: 'top', panelClass: 'snack-error'
                        });
                }
                return of(err.error.message);
            }));
    }


    notificationupdate(data) {
        var headerssss = new HttpHeaders({
            'Authorization': localStorage.getItem('token'),
            //'Content-Type': "multipart/form-data"
        });
        return this.http.post(CONSTANST.routes.media.notificationupdate, data, { headers: headerssss }).pipe(
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


    contactus(data) {

        var shareheaders = new HttpHeaders({
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json'
        });

        console.log(data)
        return this.http.post(CONSTANST.routes.generic.contactus, data, { headers: shareheaders })
            .pipe(
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

    refreshToken() {
        return this.http.post(CONSTANST.routes.generic.accesstoken, { 'refreshToken': localStorage.getItem('refreshToken') })
            .pipe(tap((tokens: Tokens) => {
                localStorage.setItem('token', tokens.jwt);
            }));
    }
}

export interface MediaApi {
    success: boolean,
    data: Media[],
    total: number,
    pageSize: number,
    page: number
}