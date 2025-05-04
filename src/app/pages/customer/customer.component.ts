import { Component, OnInit } from '@angular/core';
import { Customer } from '../../models/Customer';
import { CustomerService } from '../../services/customer/customer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormComponent } from '../../components/customer-form/customer-form.component';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit{

  customers: Customer[]= []

  constructor(private customerService:CustomerService, private dialog:MatDialog){}

  ngOnInit(): void {
      this.getAllCustomers()
    }

      openCreateCustomertDialog() {
        const dialogRef = this.dialog.open(CustomerFormComponent, {
          width: '679px',
          height: '331px',
          panelClass: 'product-form-container',
          disableClose: true
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log('Produto criado:', result);
            this.getAllCustomers();
          }
        })
      }
 



  getAllCustomers():void{
    this.customerService.getAllCustomers().subscribe({
      next: (data) => {
        this.customers = data
        console.log("users: ", data)
      }, 
      error: (err) => {
        console.error("No Customers found!")
      }
    })
  }

}
