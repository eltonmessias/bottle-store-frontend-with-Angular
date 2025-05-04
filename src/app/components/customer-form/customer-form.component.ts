import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer } from '../../models/Customer';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Category } from '../../models/category';
import { CategorieService } from '../../services/category/categorie.service';
import { ProductService } from '../../services/product/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, MatDialogModule,MatProgressSpinnerModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CustomerFormComponent {

  customerForm: FormGroup;
  loading = false;
  customers: Customer [] = [];
  errorMessage: string = '';

  ngOnInit(): void {

  }

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategorieService,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {
    this.customerForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: ['', [Validators.required]],  // Separado corretamente
      email: ['', [Validators.email]], // Separado corretamente
      phone: ['', [Validators.required]]
    });
  }

  
  save(): void {
    
    if (this.customerForm.valid) {
      this.loading = true;
      console.log("salvando....")
      this.productService.createProduct(this.customerForm.value).subscribe({
        next: (response) => {
          console.log("Cliente Criado: ", response)
          this.loading = false;
          
          this.dialogRef.close(true);
        },
        error: (err) => {
          this.loading = false;
        if (err.status === 400) {
          alert('Erro: Verifique os dados informados.');
        } else if (err.status === 403) {
          alert('Erro: Você não tem permissão para criar produtos.');
        } else {
          alert('Erro ao criar produto. Tente novamente.');
        }
        }
      });
      
    }
  }

  close(): void {
    this.dialogRef.close();
  }



}
