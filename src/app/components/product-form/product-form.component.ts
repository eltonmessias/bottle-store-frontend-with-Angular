import { CommonModule } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CategorieService } from '../../services/category/categorie.service';
import { Category } from '../../models/category';
import { ProductService } from '../../services/product/product.service';
import { CreateCategoryComponent } from '../create-category/create-category.component';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule,MatProgressSpinnerModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ProductFormComponent {
  
  productForm: FormGroup;
  loading = false;
  categories: Category [] = [];
  errorMessage: string = '';

  ngOnInit(): void {
    this.loadCategories();
  }

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategorieService,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      categoryId: [null, Validators.required],
      purchasePrice: ['', [Validators.required, Validators.min(1)]],  // Separado corretamente
      sellingPrice: ['', [Validators.required, Validators.min(1)]], // Separado corretamente
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
  }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
        console.log(data);
      },
      error: (err) => {
        console.error('Erro ao buscar categorias:', err);
        this.errorMessage = 'Erro ao carregar categorias';
        this.loading = false;
      }
    })
  }

  
  save(): void {
    
    if (this.productForm.valid) {
      this.loading = true;
      console.log("salvando....")
      this.productService.createProduct(this.productForm.value).subscribe({
        next: (response) => {
          console.log("Produto Criado: ", response)
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


  openCreateCategoryDialog() {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '300px',
      height: '200px',
      panelClass: 'product-form-container',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Produto criado:', result);
        // this.loadProducts();
      }
    })
  }
}
