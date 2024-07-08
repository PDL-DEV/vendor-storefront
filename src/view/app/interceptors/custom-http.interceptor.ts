import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MatDialogState } from '@angular/material/dialog';
import { ProgressQueryBarService } from '../services/progress-query-bar.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

    constructor(
        private readonly progressQueryBarService: ProgressQueryBarService,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.get("skip")) {
            this.progressQueryBarService.show();
        }
        
        return next.handle(req)
            .pipe(tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    this.progressQueryBarService.hide();
                }
            }, (error) => {
                this.progressQueryBarService.hide();
            }));
    }

}