import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class EmployeeService {
    constructor(private httpClient: HttpClient) { }

    baseUrl = 'http://localhost:4201/api/employee';
    //apiURL: string = this.baseUrl+``;

    loginEmployee(employee: Employee): Observable<void> {
        
        return this.httpClient.get<Employee>(`${this.baseUrl}?name=${employee.name}&password=${employee.password}`)
            .pipe(catchError(this.handleError));
        // return this.httpClient.post<Employee>(this.baseUrl, employee, {
        //     headers: new HttpHeaders({
        //         'Content-Type': 'application/json'
        //     })
        // })
        // .pipe(catchError(this.handleError));
    }

    getEmployees(): Observable<Employee[]> {
        return this.httpClient.get<Employee[]>(this.baseUrl)
            .pipe(catchError(this.handleError));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('Client Side Error: ', errorResponse.error.message);
        } else {
            console.error('Server Side Error: ', errorResponse);
        }

        return new ErrorObservable('There is a problem with the service. We are notified & working on it. Please try again later.');
    }

    getEmployee(id: number): Observable<Employee> {
        return this.httpClient.get<Employee>(`${this.baseUrl}/?id=${id}`)
            .pipe(catchError(this.handleError));
    }

    addEmployee(employee: Employee): Observable<Employee> {
        return this.httpClient.post<Employee>(this.baseUrl, employee, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials' : 'true',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
            })
        })
        .pipe(catchError(this.handleError));
    }

    updateEmployee(employee: Employee): Observable<void> {
        return this.httpClient.put<void>(`${this.baseUrl}/${employee.id}`, employee, {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PUT',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
            })
        })
            .pipe(catchError(this.handleError));
    }

    deleteEmployee(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }
}
