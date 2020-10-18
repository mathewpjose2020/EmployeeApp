import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department.model';
import { Employee } from '../models/employee.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { EmployeeService } from './employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-employee',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent implements OnInit {
  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  previewPhoto = false;
  panelTitle: string = "Login";
  datePickerConfig: Partial<BsDatepickerConfig>;
  employee: Employee;

  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' },
    { id: 5, name: 'Admin' }
  ];
  constructor(private _employeeService: EmployeeService,
    private _router: Router,
    private _route: ActivatedRoute) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        dateInputFormat: 'DD/MM/YYYY'
      });
  }

  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  ngOnInit() {
    this.employee = {
      id: null,
      name: null,
      gender: null,
      contactPreference: null,
      phoneNumber: null,
      email: '',
      dateOfBirth: null,
      department: 'select',
      isActive: null,
      photoPath: null,
      password:null
    };
  }

  private getEmployee(id: number) {
    if (id === 0) {
      this.employee = {
        id: null,
        name: null,
        gender: null,
        contactPreference: null,
        phoneNumber: null,
        email: '',
        dateOfBirth: null,
        department: 'select',
        isActive: null,
        photoPath: null,
        password:null
      };
      this.panelTitle = 'Login';
      this.createEmployeeForm.reset();
    } else {
      this.panelTitle = 'Login';
      this._employeeService.getEmployee(id).subscribe(
        (employee) => this.employee = employee,
        (err: any) => console.log(err)
      );
    }
  }

  loginEmployee(): void {
    this._employeeService.loginEmployee(this.employee).subscribe(
        () => { 
          // this.createEmployeeForm.reset();
          this._router.navigate(['list']);
          console.log('Login Successfully');
        },
        (error: any) => alert('Login Failed')
      );
    
  }

  saveEmployee(): void {
    if (this.employee.id == null) {
      this._employeeService.addEmployee(this.employee).subscribe(
        (data: Employee) => {
          console.log(data);
          this.createEmployeeForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => console.log(error)
      );
    } else {
      this._employeeService.updateEmployee(this.employee).subscribe(
        () => {
          this.createEmployeeForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => console.log(error)
      );
    }
  }
}
