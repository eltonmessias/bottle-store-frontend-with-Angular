import { CommonModule } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { CategorieService } from '../../services/categorie.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      categoryId: [null, Validators.required],
      buyPrice: ['', [Validators.required, Validators.min(1)]],  // Separado corretamente
      sellPrice: ['', [Validators.required, Validators.min(1)]], // Separado corretamente
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
}
