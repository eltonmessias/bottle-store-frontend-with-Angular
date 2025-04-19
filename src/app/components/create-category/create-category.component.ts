import { CommonModule } from '@angular/common';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { CategorieService } from '../../services/category/categorie.service';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [MatInputModule, CommonModule, ReactiveFormsModule, MatDialogModule,MatProgressSpinnerModule],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CreateCategoryComponent {

  categoryForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategorieService,
    public dialogRef: MatDialogRef<CreateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
    
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  save(): void{
    if (this.categoryForm.valid) {
      this.loading = true;
      this.categoryService.createCategory(this.categoryForm.value).subscribe({
        next: (response) => {
          console.log("Category Created: ", response)
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
